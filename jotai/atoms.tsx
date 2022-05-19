import { Contract } from "ethers"
import { atom } from "jotai"
import { atomWithRefresh } from "./utils"

export const contractAtom = atom<Contract | null>(null)

export const selectedAddressAtom = atom("")
export const messageAtom = atom("")
export const asyncMessagesAtom = atomWithRefresh(
  async (get) => {

    const contract = get(contractAtom)

    if (!contract) {
      return
    }

    const result = await contract.getAllMessages()

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