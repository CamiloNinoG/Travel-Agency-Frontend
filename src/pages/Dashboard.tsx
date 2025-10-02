"use client"

import { Users, Shield, Key, Activity } from "lucide-react"
import { CardMetric } from "../components/CardMetric"
import { RecentUsers } from "../components/RecentUsers"
import { RecentActivity } from "../components/RecentActivity"
import { Sidebar } from "../components/Sidebar"

export default function Dashboard() {
  const users: { name: string; email: string; status: "Activo" | "Inactivo"; }[] = [
    { name: "Juan Pérez", email: "juan@example.com", status: "Activo" },
    { name: "María García", email: "maria@example.com", status: "Activo" },
    { name: "Carlos López", email: "carlos@example.com", status: "Inactivo" },
    { name: "Ana Martínez", email: "ana@example.com", status: "Activo" },
  ]

  const activities = [
    { user: "Juan Pérez", action: "Crear Usuario", section: "Usuarios" },
    { user: "María García", action: "Editar Rol", section: "Roles" },
    { user: "Juan Pérez", action: "Eliminar Permiso", section: "Permisos" },
    { user: "Carlos López", action: "Ver Historial", section: "Historial" },
    { user: "Ana Martínez", action: "Crear Rol", section: "Roles" },
  ]

  return (
    <div className="flex">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-6 space-y-6 bg-gray-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Resumen general del sistema de administración</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardMetric title="Total Usuarios" value={4} subtitle="3 activos" icon={<Users />} />
          <CardMetric title="Total Roles" value={3} subtitle="Roles configurados" icon={<Shield />} />
          <CardMetric title="Total Permisos" value={11} subtitle="Permisos disponibles" icon={<Key />} />
          <CardMetric title="Accesos Recientes" value={5} subtitle="Últimas 24 horas" icon={<Activity />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentUsers users={users} />
          <RecentActivity activities={activities} />
        </div>
      </main>
    </div>
  )
}
