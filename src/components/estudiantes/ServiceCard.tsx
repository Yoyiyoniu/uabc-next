interface ServiceCardProps {
  title: string
  description: string
  iconSvg: React.ReactNode
  iconColor: string
  buttonText: string
  buttonColor: string
  imageAlt: string
  details: ReadonlyArray<{
    iconSvg: React.ReactNode
    text: string
  }>
  badges?: ReadonlyArray<{
    label: string
    value: string
    colorClass: string
  }>
}

export function ServiceCard({
  title,
  description,
  iconSvg,
  iconColor,
  buttonText,
  buttonColor,
  imageAlt,
  details,
  badges,
}: ServiceCardProps) {
  return (
    <div className="transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="p-6">
        <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
          <img src="/placeholder.svg?height=200&width=300" alt={imageAlt} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <div className={iconColor}>{iconSvg}</div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-3 mb-6">
          {details.map((detail: { iconSvg: React.ReactNode; text: string }, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
              <div>{detail.iconSvg}</div>
              <span>{detail.text}</span>
            </div>
          ))}
          {badges &&
            badges.map((badge: { label: string; value: string; colorClass: string }, index: number) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{badge.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.colorClass}`}>{badge.value}</span>
              </div>
            ))}
        </div>
        <button
          className={`w-full ${buttonColor} font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
