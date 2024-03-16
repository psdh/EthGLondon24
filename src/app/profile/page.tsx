'use client'

import { ConnectButton } from '@/components/ConnectButton'
import { Container, Layout } from '@/components/templates'
import { Auth0Provider } from '@auth0/auth0-react';
import { LoginButton } from '@/components/login'

export default function Page() {
  return (
    <Layout>
      <header />

      <Auth0Provider
    domain="dev-2h23mlddm62eatyt.us.auth0.com"
    clientId="UoaqILgFu2OPTJxzlYiE632i3TEmyXgj"
    authorizationParams={{
      redirect_uri: window.location.origin + '/profile'
    }}
  >
    <Container as="main" $variant="flexVerticalCenter">
        <ConnectButton />
        <LoginButton />
      </Container>
  </Auth0Provider>
      

      <footer />
    </Layout>
  )
}
