import React, { useCallback } from 'react'
import logoWithTextHorizontal from '../public/assets/logo-with-text-horizontal.svg'
import logoWithTextVertical from '../public/assets/logo-with-text-vertical.svg'
import Image, { ImageProps } from 'next/image'

type Props = {
  width: ImageProps['width']
  height?: ImageProps['height']
  type: 'horizontal' | 'vertical'
}

const Logo = ({ width, height, type }: Props) => {

  const getLogo = useCallback(
    () => {
      switch (type) {
        case 'vertical':
          return logoWithTextVertical
        case 'horizontal':
          return logoWithTextHorizontal
        default:
          return logoWithTextHorizontal
      }
    },
    [type],
  )

  return (
    <Image width={width} height={height} src={getLogo()} alt="logo" />
  )
}

export default Logo