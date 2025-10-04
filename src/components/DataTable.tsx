import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // 👈 reemplazo
import Pagination from "../components/tables/Pagination";
import { FiPlus } from "react-icons/fi";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps<T extends Record<string, any>> {
  title: string;
  columns: Column[];
  data: T[];
  onCreate?: () => void;
  createPath?: string;
  actions?: (row: T) => React.ReactNode;
}

export default function DataTable<T extends Record<string, any>>({
  title,
  columns,
  data,
  onCreate,
  createPath,
  actions,
}: DataTableProps<T>) {

  const navigate = useNavigate();   // 👈 aquí
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrado por columnas
  const filteredData = data.filter((row) => {
    if (searchQuery) {
      return columns.some((col) =>
        String(row[col.key] ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return columns.every((col) => {
      const filterValue = filters[col.key]?.toLowerCase() || "";
      const cellValue = String(row[col.key] ?? "").toLowerCase();
      return cellValue.includes(filterValue);
    });
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = () => {
    const path = createPath ?? `/${title.toLowerCase()}/nuevo`;
    if (onCreate) {
      onCreate(); // si pasas una callback personalizada
    } else {
      navigate(path); // 👈 ahora usa React Router
    }
  };
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // resetear a primera página al filtrar
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
  {/* Buscador y botón crear */}
  <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
    <input
      type="text"
      placeholder={`Buscar ${title.toLowerCase()}...`}
      className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      onClick={handleCreate}
      className="flex items-center gap-2 bg-brand-500 text-white px-5 py-2 rounded-lg hover:bg-brand-600 transition shadow-md"
    >
      <FiPlus /> Nuevo {title}
    </button>
  </div>

  {/* Tabla */}
  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              <input
                type="text"
                placeholder={col.label}
                value={filters[col.key] || ""}
                onChange={(e) => handleFilterChange(col.key, e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </th>
          ))}
          {actions && <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Acción</th>}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {paginatedData.length > 0 ? (
          paginatedData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                  {row[col.key]}
                </td>
              ))}
              {actions && <td className="px-4 py-3">{actions(row)}</td>}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-6 text-gray-500 dark:text-gray-400">
              No hay registros
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Paginación */}
  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className="flex items-center gap-2">
      <span className="text-gray-600 dark:text-gray-400">Mostrar:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 focus:outline-none"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <span className="ml-4 text-gray-600 dark:text-gray-400">
        Total: {filteredData.length} registros
      </span>
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
  </div>
</div>
  );
}
