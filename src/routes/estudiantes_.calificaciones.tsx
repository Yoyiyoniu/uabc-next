import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/estudiantes_/calificaciones')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/estudiantes_/calificaciones"!</div>
}
