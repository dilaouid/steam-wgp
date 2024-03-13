import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute("/")({
  component: Homepage,
})

function Homepage() {
  return (
    <div></div>
  )
}