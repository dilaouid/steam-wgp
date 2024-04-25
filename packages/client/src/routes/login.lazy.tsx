import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Loginpage } from '../components/templates/Login_page';

import AOS from 'aos';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute("/login")({
  component: Login
})

function Login() {
  const { t } = useTranslation('global/titles');
  document.title = t('login');
  
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return <Loginpage />
}