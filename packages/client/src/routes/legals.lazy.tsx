import { createLazyFileRoute } from '@tanstack/react-router'
import { Legalpage } from '@templates/Legal_page'
import { HelmetWrapper } from '@wrappers/HelmetWrapper';

export const Route = createLazyFileRoute("/legals")({
  component: Legals,
})

function Legals() {
  return (
  <HelmetWrapper keyPrefix='legals' noindex={false}>
    <Legalpage />
  </HelmetWrapper>);
}