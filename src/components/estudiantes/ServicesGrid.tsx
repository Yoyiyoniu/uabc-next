import { ServiceCard } from "./ServiceCard"
import IconCalendarWeek from "@/assets/icons/IconCalendarWeek"
import IconFileInfo from "@/assets/icons/IconFileInfo"
import IconBook from "@/assets/icons/IconBook"
import IconClock from "@/assets/icons/IconClock"
import IconChar from "@/assets/icons/IconChar"
import IconAward from "@/assets/icons/IconAward"

const SERVICES = [
  {
    title: "Horario de Clases",
    description: "Consulta tus horarios actuales y próximas clases",
    iconSvg: <IconCalendarWeek />,
    iconColor: "text-emerald-600",
    buttonText: "Ver Horario Completo",
    buttonColor:
      "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white",
    imageAlt: "Horario de clases",
    details: [
      { iconSvg: <IconClock />, text: "Próxima clase: Matemáticas - 10:00 AM" },
      { iconSvg: <IconCalendarWeek />, text: "6 materias este semestre" },
    ],
  },
  {
    title: "Calificaciones",
    description: "Revisa tus calificaciones y progreso académico",
    iconSvg: <IconFileInfo />,
    iconColor: "text-blue-600",
    buttonText: "Ver Calificaciones",
    buttonColor: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
    imageAlt: "Calificaciones",
    details: [],
    badges: [
      { label: "Promedio actual:", value: "8.7", colorClass: "bg-blue-100 text-blue-800" },
      { label: "Materias aprobadas:", value: "24/30", colorClass: "bg-green-100 text-green-800" },
    ],
  },
  {
    title: "Historial Académico",
    description: "Accede a tu historial completo y documentos oficiales",
    iconSvg: <IconBook />,
    iconColor: "text-purple-600",
    buttonText: "Ver Historial Completo",
    buttonColor: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white",
    imageAlt: "Historial académico",
    details: [
      { iconSvg: <IconChar />, text: "Semestre actual: 8vo" },
      { iconSvg: <IconAward />, text: "Créditos: 180/240" },
    ],
  },
] as const

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {SERVICES.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  )
}
