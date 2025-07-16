import { GradesList } from '@/components/calificaciones/GradesList'
import { StatsCard } from '@/components/calificaciones/StatsCard'
import { EstudiantesLayout } from '@/components/layout/EstudiantesLayout'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/estudiantes_/calificaciones')({
  component: RouteComponent,
})

function RouteComponent() {

  const [selectedSemester, setSelectedSemester] = useState("2024-2")

  const calificaciones = {
    "2024-2": [
      {
        id: 1,
        materia: "Programación Orientada a Objetos",
        codigo: "CSC-301",
        creditos: 8,
        profesor: "Dr. García Martínez",
        promedio: 90,
        estado: "Aprobada",
      },
      {
        id: 2,
        materia: "Base de Datos",
        codigo: "CSC-302",
        creditos: 6,
        profesor: "Mtra. López Hernández",
        promedio: 86,
        estado: "Aprobada",
      },
      {
        id: 3,
        materia: "Matemáticas Discretas",
        codigo: "MAT-201",
        creditos: 6,
        profesor: "Dr. Rodríguez Silva",
        promedio: 74,
        estado: "Aprobada",
      },
      {
        id: 4,
        materia: "Ingeniería de Software",
        codigo: "CSC-401",
        creditos: 8,
        profesor: "Ing. Morales Castro",
        promedio: 90,
        estado: "Aprobada",
      },
    ],
  }

  const semestres = ["2024-2", "2024-1", "2023-2", "2023-1"]

  const materias = calificaciones[selectedSemester as keyof typeof calificaciones] || [];

  const getPromedioGeneral = () => {
    if (materias.length === 0) return "0.0"
    const suma = materias.reduce((acc, materia) => acc + materia.promedio, 0)
    return (suma / materias.length).toFixed(1)
  }

  const getCalificacionColor = (calificacion: number) => {
    if (calificacion >= 90) return "text-green-600 font-semibold"
    if (calificacion >= 80) return "text-blue-600 font-semibold"
    if (calificacion >= 70) return "text-yellow-600 font-semibold"
    return "text-red-600 font-semibold"
  }

  return (
    <EstudiantesLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Calificaciones</h2>
          <p className="text-gray-600">Consulta tus calificaciones y desglose por materia</p>
        </div>

        {/* Semester Selector & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div>
            {/* Semester Selector */}
            <label htmlFor="semester-select" className="block text-base font-semibold text-gray-800 mb-2">
              Semestre
            </label>
            <div className="relative">
              <select
                id="semester-select"
                value={selectedSemester}
                onChange={e => setSelectedSemester(e.target.value)}
                className="appearance-none w-full rounded-lg border border-emerald-300 bg-white/90 px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-colors duration-150"
              >
                {semestres.map(semestre => (
                  <option key={semestre} value={semestre} className="text-gray-900">
                    {semestre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <title>Desplegar semestres</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard 
              title="Promedio General"
              value={getPromedioGeneral()}
              icon={
              <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Promedio General</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              }
            />

            <StatsCard
              title="Materias"
              value={materias.length.toString()}
              icon={
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Materias</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
            />

            <StatsCard
              title="Créditos"
              icon={
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Créditos</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              value={(
                materias.reduce((accumulator, subject) => accumulator + subject.creditos, 0)
              ).toString()}
            />
          </div>
        </div>

        <GradesList
          getCalificacionColor={getCalificacionColor}
          calificaciones={materias}
        />

        {materias.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
              <title>No hay calificaciones</title>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay calificaciones</h3>
            <p className="mt-1 text-sm text-gray-500">No se encontraron calificaciones para este semestre.</p>
          </div>
        )}
      </main>
    </EstudiantesLayout>
  )
}
