import React from 'react'

type Props = {
  children?: React.ReactNode
  layout?: 'center'
  className?: string
}

const SectionBox = ({ children, layout, className }: Props) => {

  let classList: string[] = [
    'min-h-screen', 'max-w-screen', 'min-w-full'
  ]

  if (layout === 'center') {
    classList = classList.concat([
      'flex',
      'items-center',
      'justify-center'
    ])
  }

  if (className?.trim()) {
    classList.push(className)
  }

  return (
    <section className={classList.join(' ')}>{children}</section>
  )
}

export default SectionBox