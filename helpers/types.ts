export interface IAssetData {
  name: string
  symbol: string
  decimals: number
}

export interface IChainData {
  name: string
  title: string
  chain: string
  network: string
  rpc: string[]
  faucets: string[]
  chainId: number
  networkId: number
  nativeCurrency: IAssetData
}
