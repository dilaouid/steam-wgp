import { createLazyFileRoute } from '@tanstack/react-router'
import { CGUpage } from '@layouts/templates/CGU_page'
import { HelmetWrapper } from '@layouts/wrappers/HelmetWrapper'

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