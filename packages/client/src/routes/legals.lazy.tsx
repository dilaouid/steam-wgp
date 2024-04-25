import { createLazyFileRoute } from '@tanstack/react-router'
import { Legalpage } from '../components/templates/Legal_page'
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute("/legals")({
  component: Legals,
})

function Legals() {
  const { t } = useTranslation('global/titles');
  document.title = t('legals');

  return <Legalpage />
}