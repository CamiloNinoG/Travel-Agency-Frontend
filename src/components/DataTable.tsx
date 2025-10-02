import { Pencil, Trash2 } from "lucide-react";
import React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            {columns.map((col, i) => (
              <th key={i} className="py-2 px-3 font-semibold">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="py-2 px-3">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              {columns.map((col, i) => (
                <td key={i} className="py-2 px-3">
                  {col.accessor === "estado" ? (
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        row[col.accessor] === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row[col.accessor]}
                    </span>
                  ) : (
                    row[col.accessor]
                  )}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-2 px-3 flex gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
