import { Button, Profile, mq } from '@ensdomains/thorin'
import { ConnectButton as ConnectButtonBase } from '@rainbow-me/rainbowkit'
import styled, { css } from 'styled-components'
import { useDisconnect } from 'wagmi'
import { useEnsName } from 'wagmi';
import { useEnsAvatar } from "wagmi";
import { useRecords } from "ens-tools/react";


const StyledButton = styled(Button)`
  ${({ theme }) => css`
    width: fit-content;

    ${mq.xs.min(css`
      min-width: ${theme.space['45']};
    `)}
  `}
`

export function ConnectButton() {
  const { disconnect } = useDisconnect()

  return (
    <ConnectButtonBase.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain
        const { data: ensName } = useEnsName({
          address: account.address as `0x${string}`,
        });

        const { data: ensAvatar } = useEnsAvatar({
          name: ensName as string,
        });

        const { data } = useRecords({
          name: ensName,
          records: ["com.twitter", "com.github", "description", "avatar", "test-1"],
          normalize: true,
      });

        console.log(ensName)
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <StyledButton shape="rounded" onClick={openConnectModal}>
                    Connect
                  </StyledButton>
                )
              }

              if (chain.unsupported) {
                return (
                  <StyledButton
                    shape="rounded"
                    colorStyle="redPrimary"
                    onClick={openChainModal}
                  >
                    Wrong network
                  </StyledButton>
                )
              }
              console.log(account)
              return (
                <div>
                  <Profile
                  address={account.address}
                  ensName={account.ensName || ensName || undefined}
                  avatar={account.ensAvatar || ensAvatar || undefined}
                  onClick={openAccountModal}
                  dropdownItems={[
                    {
                      label: 'Copy Address',
                      color: 'text',
                      onClick: () => copyToClipBoard(account.address),
                    },
                    {
                      label: 'Disconnect',
                      color: 'red',
                      onClick: () => disconnect(),
                    },
                  ]}
                />
                {data.map((record) => (
                    <div key={record.key}>
                        {record.key}: {record.value}
                    </div>
                ))}
                </div>
                

              )
            })()}
          </div>
        )
      }}
    </ConnectButtonBase.Custom>
  )
}

const copyToClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
