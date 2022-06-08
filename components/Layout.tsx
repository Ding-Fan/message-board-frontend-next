import { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

interface Props {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <div className="bg-asumicha text-white">
            <Header />
            <main className="relative top-0" >{children}</main>
            <Footer />
        </div>
    )
}