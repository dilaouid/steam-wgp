import { createLazyFileRoute } from '@tanstack/react-router'
import { CGUpage } from '../components/templates/CGU_page'
import { HelmetWrapper } from '../components/wrappers/HelmetWrapper'

export const Route = createLazyFileRoute("/cgu")({
  component: CGU,
})

function CGU() {
  return (
    <HelmetWrapper keyPrefix='cgu' noindex={false}>
      <CGUpage />
    </HelmetWrapper>
  );
}