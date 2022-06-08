import { Contract } from "ethers"
import { atom } from "jotai"
import { atomWithRefresh } from "./utils"
import Web3Modal from 'web3modal'

export const CMessageBoardAtom = atom<Contract | null>(null)
export const CNFTAtom = atom<Contract | null>(null)
export const web3ModalAtom = atom<Web3Modal | null>(null)

export const selectedAddressAtom = atom("")
export const messageAtom = atom("")
export const asyncMessagesAtom = atomWithRefresh(
  async (get) => {

    const CMessageBoard = get(CMessageBoardAtom)

    if (!CMessageBoard) {
      return
    }

    const result = await CMessageBoard.getAllMessages()

    console.log('result is', result)

    const formattedResult: Message[] = result.map((item: any) => {
      console.log('this is item', item)

      return {
        content: item.content,
        sender: item.sender
      }
    }).reverse()

    console.log('formatted result', formattedResult)
    // await transaction.wait()
    
    return formattedResult
  }
)