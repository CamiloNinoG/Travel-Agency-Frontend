import { useState } from "react"
import { Home, LayoutDashboard, Settings, Users, FileText, Menu, X, ChevronLeft } from "lucide-react"
import LogoutButton from "./LogoutButton" // 👈 importa tu botón

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface SidebarProps {
  className?: string
}

const menuItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Usuarios", href: "/list-user" },
  { icon: FileText, label: "Documentos", href: "/documents" },
  { icon: Settings, label: "Configuración", href: "/settings" },
]

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Botón mobile */}
      <button
        type="button"
        className={cn(
          "fixed top-4 left-4 z-50 lg:hidden",
          "bg-transparent hover:bg-gray-100 rounded-full p-2"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2
              className={cn(
                "font-bold text-xl text-gray-800 transition-opacity duration-300",
                isCollapsed && "lg:opacity-0 lg:hidden",
              )}
            >
              Mi App
            </h2>
            <button
              type="button"
              className="hidden lg:flex p-2 rounded hover:bg-gray-100"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronLeft
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isCollapsed && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700",
                  "hover:bg-gray-100 hover:text-gray-900",
                  "transition-all duration-200 ease-in-out",
                  "group relative overflow-hidden",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span
                  className={cn(
                    "transition-opacity duration-300 whitespace-nowrap",
                    isCollapsed && "lg:opacity-0 lg:hidden",
                  )}
                >
                  {item.label}
                </span>

                {/* Tooltip para colapsado */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden lg:block">
                    {item.label}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-4">
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100",
                "transition-all duration-300",
              )}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                U
              </div>
              <div className={cn("transition-opacity duration-300", isCollapsed && "lg:opacity-0 lg:hidden")}>
                <p className="text-sm font-medium text-gray-800">Usuario</p>
                <p className="text-xs text-gray-500">usuario@email.com</p>
              </div>
            </div>

            {/* 👇 Botón de logout */}
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Espaciador para el contenido */}
      <div className={cn("transition-all duration-300", isCollapsed ? "lg:w-20" : "lg:w-64")} />
    </>
  )
}
