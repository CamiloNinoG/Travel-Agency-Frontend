type User = {
  name: string
  email: string
  status: "Activo" | "Inactivo"
}

type RecentUsersProps = {
  users: User[]
}

export function RecentUsers({ users }: RecentUsersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Usuarios Recientes</h3>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.email} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded ${
                user.status === "Activo"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
