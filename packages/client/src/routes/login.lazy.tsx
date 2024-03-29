import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { Loginpage } from '../components/templates/Loginpage';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Route = createFileRoute("/login")({
  component: Login
})

function Login() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return <Loginpage />
}