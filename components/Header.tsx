import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

type Props = {}

const styles = {
  header: "w-full absolute z-20 py-2 flex justify-between px-5 shadow-md font-bold text-white bg-dark",
  item: 'invisible self-center lg:px-7 md:px-5 py-3 md:visible cursor-pointer underline-animation',
  logo: 'self-center'
}

const Header = (props: Props) => {
  return (
    <div className={styles.header}>
      <div >
        <Link href='/' passHref >
          <a className="flex content-center">
            <Logo width={180} height={56} type="horizontal" />
          </a>
        </Link>
      </div>
      {/* <div className="test">
        <div className="outer">
          <div className="inner">
            inner
          </div>
        </div>
      </div> */}
      <div className="flex ">
        {
          [
            [
              'Home',
              '/'
            ],
            [
              'NFT',
              '/NFT'
            ],
            [
              'About',
              '/about'
            ],
            [
              'Contact',
              '/contact'
            ],
          ].map(
            ([title, href]) => (
              <div key={title} className={styles.item}>
                <Link href={href}>
                  {title}
                </Link>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default Header