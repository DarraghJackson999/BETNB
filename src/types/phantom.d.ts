export interface PhantomPublicKeyLike {
  toString: () => string
}

export interface PhantomConnectResponse {
  publicKey?: PhantomPublicKeyLike
}

export interface PhantomProvider {
  isPhantom?: boolean
  publicKey?: PhantomPublicKeyLike
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<PhantomConnectResponse>
  disconnect: () => Promise<void>
  on?: (event: 'connect' | 'disconnect', handler: (...args: unknown[]) => void) => void
  off?: (event: 'connect' | 'disconnect', handler: (...args: unknown[]) => void) => void
  removeListener?: (
    event: 'connect' | 'disconnect',
    handler: (...args: unknown[]) => void
  ) => void
}

export interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  on?: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
  isMetaMask?: boolean
  isRabby?: boolean
  isFrame?: boolean
  isCoinbaseWallet?: boolean
  providers?: Eip1193Provider[]
  [key: string]: unknown
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider & { providers?: Eip1193Provider[] }
    solana?: PhantomProvider
    phantom?: { solana?: PhantomProvider }
  }
}

export {}
