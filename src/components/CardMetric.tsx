import type { ReactNode } from "react"

type CardMetricProps = {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
}

export function CardMetric({ title, value, subtitle, icon }: CardMetricProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-gray-400">{icon}</div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  )
}
