import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Loginpage } from '@templates/Login_page';

import AOS from 'aos';
import { HelmetWrapper } from '@wrappers/HelmetWrapper';

export const Route = createLazyFileRoute("/login")({
  component: Login
})

function Login() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <HelmetWrapper keyPrefix='login' noindex={true}>
      <Loginpage />
    </HelmetWrapper>)
}