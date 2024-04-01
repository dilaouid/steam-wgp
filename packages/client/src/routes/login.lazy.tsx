import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Loginpage } from '../components/templates/Login_page';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Route = createLazyFileRoute("/login")({
  component: Login
})

function Login() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return <Loginpage />
}