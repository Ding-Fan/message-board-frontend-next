import React from 'react'
import Logo from './Logo'
import Discord from './SVG/Discord'
import Github from './SVG/Github'
import Twitter from './SVG/Twitter'

type Props = {}


const FooterSection = () => {
    return (
        <div className="w-[16vw] px-8">
            <div className="text-xl py-4">
                Services
            </div>
            <div className="list">
                <div className="item">
                    list item
                </div>
                <div className="item">
                    list item
                </div>
                <div className="item">
                    list item
                </div>
            </div>
        </div>
    )
}

const Footer = (props: Props) => {
    return (
        <div className="footer w-full ">

            <div className="top flex justify-around">
                <div className="logo w-[20vw]">
                    <Logo width={200} type="horizontal" />
                    <div className="description">
                        We are a mobile and web software development agency not based in Cambridge, UK. We produce outstanding user-centered online software.
                    </div>
                </div>
                <div className="pt-6 flex justify-around">
                    {
                        Array(3).fill(0).map((_, index) => {
                            return (
                                <FooterSection key={index} />
                            )
                        })
                    }
                </div>
            </div>

            <div className="bottom px-4 pt-8 pb-4 flex justify-between">
                <div className="copyright">
                    © 2022 MessageBoard™. All Rights Reserved.
                </div>
                <div className="links flex text-warning ">
                    <div className="px-4 flex items-center">
                        <Twitter />
                    </div>
                    <div className="px-4 flex items-center">
                        <Github />
                    </div>
                    <div className="px-4 flex items-center">
                        <Discord />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer