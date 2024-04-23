import { createLazyFileRoute } from '@tanstack/react-router'
import { Legalpage } from '../components/templates/Legal_page'

export const Route = createLazyFileRoute("/legals")({
  component: Legals,
})

function Legals() {
  return <Legalpage />
}