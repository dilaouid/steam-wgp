import { createLazyFileRoute } from '@tanstack/react-router'
import { CGUpage } from '../components/templates/CGU_page'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute("/cgu")({
  component: CGU,
})

function CGU() {
  const { t } = useTranslation('global/titles');
  document.title = t('cgu');

  return <CGUpage />
}