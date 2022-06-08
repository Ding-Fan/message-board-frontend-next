import anime from 'animejs'
// import { AnimeInstance } from 'animejs'
import React, { useEffect, useState } from 'react'
import SectionBox from './SectionBox'
import SPM from './SVG/SPM'

type Props = {}

const LoadingMask = (props: Props) => {


  // const [animationRef, setAnimationRef] = useState<AnimeInstance>()

  useEffect(() => {
    anime({
      targets: ['.pray-mask path'],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInCirc',
      duration: 1500,
      delay: function (el, i) { return i * 500 },
      direction: 'alternate',
      loop: true
    })

    anime({
      targets: ".loading-mask",
      easing: "easeOutCirc",
      duration: 3000,
      opacity: [
        { value: 1, duration: 0 },
        { value: 1, duration: 1500 },
        { value: 0, duration: 2800 }
      ]
    })


    return () => {
    }
  }, [])


  return (
    <SectionBox layout="center" className="loading-mask fixed top-0 left-0 z-40">
      <div className="bg-black absolute w-full h-full"></div>

      <SPM className="pray-mask z-50" />
    </SectionBox>
  )
}

export default LoadingMask