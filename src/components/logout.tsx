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
    const { loginWithRedirect } = useAuth0();
    
    return (
        <StyledButton shape="rounded" onClick={() => loginWithRedirect()}>
          Log in
        </StyledButton>
      )
};
