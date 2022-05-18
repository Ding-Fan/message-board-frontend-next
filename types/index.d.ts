interface MessageBoardContract {
  saveMessage: (content: string) => any
  getAllMessages: () => any
}

interface Window {
  ethereum: any
}

interface Message {
  sender: string
  content: string
}