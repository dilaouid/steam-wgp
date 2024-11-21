import { createLazyFileRoute } from '@tanstack/react-router'
import { Loginpage } from '@templates/Login_page';

import { HelmetWrapper } from '@wrappers/HelmetWrapper';

export const Route = createLazyFileRoute("/login")({
  component: Login
})

function Login() {
  return (
    <HelmetWrapper keyPrefix='login' noindex={true}>
      <Loginpage />
    </HelmetWrapper>)
}