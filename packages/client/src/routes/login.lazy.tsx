import { createLazyFileRoute } from '@tanstack/react-router'
import { Loginpage } from '@layouts/templates/Login_page';

import { HelmetWrapper } from '@layouts/wrappers/HelmetWrapper';

export const Route = createLazyFileRoute("/login")({
  component: Login
})

function Login() {
  return (
    <HelmetWrapper keyPrefix='login' noindex={true}>
      <Loginpage />
    </HelmetWrapper>)
}