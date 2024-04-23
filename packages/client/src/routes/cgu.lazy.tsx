import { createLazyFileRoute } from '@tanstack/react-router'
import { CGUpage } from '../components/templates/CGU_page'

export const Route = createLazyFileRoute("/cgu")({
  component: CGU,
})

function CGU() {
  return <CGUpage />
}