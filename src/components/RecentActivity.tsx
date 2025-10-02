type Activity = {
  user: string
  action: string
  section: string
}

type RecentActivityProps = {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
      <ul className="space-y-3">
        {activities.map((activity, i) => (
          <li key={i} className="flex gap-3 items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
              {activity.user.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-xs text-gray-500">
                {activity.user} • {activity.section}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
