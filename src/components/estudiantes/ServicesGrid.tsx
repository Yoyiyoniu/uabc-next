import IconAward from "@/assets/icons/IconAward"
import IconBook from "@/assets/icons/IconBook"
import IconCalendarWeek from "@/assets/icons/IconCalendarWeek"
import IconChar from "@/assets/icons/IconChar"
import IconClock from "@/assets/icons/IconClock"
import IconFileInfo from "@/assets/icons/IconFileInfo"
import { ServiceCard } from "./ServiceCard"

const SERVICES = [
  {
    title: "Horario de Clases",
    description: "Consulta tus horarios actuales y próximas clases",
    iconSvg: <IconCalendarWeek />,
    iconColor: "text-emerald-600",
    buttonText: "Ver Horario Completo",
    image: "/images/horario.png",
    link: "/estudiantes/horario",
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
    image: "/images/calificaciones.png",
    link: "/estudiantes/calificaciones",
    details: [],
    badges: [
      { label: "Promedio actual:", value: "8.7", colorClass: "bg-blue-100 text-blue-800" },
      { label: "Materias aprobadas:", value: "24/30", colorClass: "bg-green-100 text-green-800" },
    ],
  },
  {
    title: "Historial Académico",
    description: "Accede a tu historial académico",
    iconSvg: <IconBook />,
    iconColor: "text-purple-600",
    buttonText: "Ver Historial Completo",
    image: "/images/historial.png",
    link: "/estudiantes/historial",
    inProgress: true,
    details: [
      { iconSvg: <IconChar />, text: "Semestre actual: 8vo" },
      { iconSvg: <IconAward />, text: "Créditos: 180/240" },
    ],
  },
] as const

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {SERVICES.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  )
}
