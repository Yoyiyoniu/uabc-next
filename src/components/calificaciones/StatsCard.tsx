interface StatsCardProps {
    title: string
    value: string
    icon: React.ReactNode
}

export const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
        <div className="flex items-center">
        <div className="p-2 bg-emerald-100 rounded-lg">
            {icon}
        </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
  )
}
