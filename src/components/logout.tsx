import { useAuth0 } from "@auth0/auth0-react";
import { Button, mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'


const StyledButton = styled(Button)`
  ${({ theme }) => css`
    width: fit-content;

    ${mq.xs.min(css`
      min-width: ${theme.space['45']};
    `)}
  `}
`

export function LogoutButton() {
    const { logout } = useAuth0();    
    return (
        <StyledButton shape="rounded" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log out
        </StyledButton>
      )
};
