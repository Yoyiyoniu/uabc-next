import { Link } from "@tanstack/react-router"

interface ServiceCardProps {
  title: string
  description: string
  iconSvg: React.ReactNode
  iconColor: string
  buttonText: string
  image: string
  link: string
  inProgress?: boolean
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
  image,
  link,
  inProgress,
  details,
  badges,
}: ServiceCardProps) {
  return (
    <div className="transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="p-6">
        <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
          <img src={image} alt={""} className="object-cover w-full h-full rounded-lg border-2 border-gray-200" />
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <div className={iconColor}>{iconSvg}</div>
          <h3 title={title} className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-3 mb-6">
          {details.map((detail: { iconSvg: React.ReactNode; text: string }) => (
            <div key={detail.text} className="flex items-center space-x-2 text-sm text-gray-600">
              <div>{detail.iconSvg}</div>
              <span>{detail.text}</span>
            </div>
          ))}
          {badges?.map((badge: { label: string; value: string; colorClass: string }) => (
            <div key={badge.label} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{badge.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.colorClass}`}>{badge.value}</span>
            </div>
          ))}
        </div>
        <Link
          to={link}
          type="button"
          className={`w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ${inProgress ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70 hover:shadow-lg' : ''}`}
          disabled={inProgress}
        >
          {inProgress ? 'Próximamente' : buttonText}
        </Link>
      </div>
    </div>
  )
}
