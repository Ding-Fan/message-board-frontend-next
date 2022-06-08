import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import LoadingMask from "../components/LoadingMask"

const MaskContext = createContext({
  hasMask: false,
  setHasMask: (() => { }) as any,
})


interface MaskProviderProps {
  children: ReactNode
}

const MaskProvider = (props: MaskProviderProps) => {
  const [hasMask, setHasMask] = useState(false)


  return (
    <MaskContext.Provider value={{ hasMask, setHasMask }}>
      {props.children}
      {hasMask && <LoadingMask />}
    </MaskContext.Provider>

  )
}

const useMask = () => {
  const context = useContext(MaskContext)
  if (context === undefined) {
    throw new Error('useMask must be used within a UserProvider')
  }

  return context
}

export { MaskProvider, useMask }