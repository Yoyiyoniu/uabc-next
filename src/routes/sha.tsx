import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sha')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sha"!</div>
}
