const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Aprobada":
      return "bg-green-100 text-green-800 border-green-200"
    case "Reprobada":
      return "bg-red-100 text-red-800 border-red-200"
    case "En Curso":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

interface GradesListProps {
    calificaciones: Array<{
      id: number
      materia: string
      codigo: string
      creditos: number
      profesor: string
      promedio: number
      estado: string
    }>
    getCalificacionColor: (calificacion: number) => string
}
export function GradesList({ calificaciones, getCalificacionColor }: GradesListProps) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {calificaciones.map((materia) => (
          <div
            key={materia.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{materia.materia}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {materia.codigo} • {materia.creditos} créditos • {materia.profesor}
                </p>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getEstadoColor(materia.estado)}`}
                >
                  {materia.estado}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Promedio</p>
                <p className={`text-2xl font-bold ${getCalificacionColor(materia.promedio)}`}>{materia.promedio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }