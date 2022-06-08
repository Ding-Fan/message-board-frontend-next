import { supportedChains } from "./chains"
import { IChainData } from "./types"

export function getChainData(chainId: number): IChainData {


  const chainData = supportedChains.filter(
    (chain: any) => chain.chainId === chainId
  )[0];

  console.log('chain data', chainData);
  

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }


  // ! switch chain and change rpc url with api key

  // const API_KEY = process.env.REACT_APP_INFURA_ID;

  // if (
  //   chainData.rpc[0].includes("infura.io") &&
  //   chainData.rpc[0].includes("%API_KEY%") &&
  //   API_KEY
  // ) {
  //   const rpcUrl = chainData.rpc[0].replace("%API_KEY%", API_KEY);

  //   return {
  //     ...chainData,
  //     rpc: 
  //   };
  // }

  return chainData;
}