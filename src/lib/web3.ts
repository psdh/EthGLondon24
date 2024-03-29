import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID

if (!WALLETCONNECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLETCONNECT_ID')
}

const { connectors } = getDefaultWallets({
  appName: 'ENS Frontend Template',
  projectId: WALLETCONNECT_ID,
})

const chains = [sepolia] as const

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [sepolia.id]: http(),
  },
})
