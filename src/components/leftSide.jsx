import { useState } from 'react'
import './leftSide.css'

export default function leftSide() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="left-side">
        Left Side
      </h1>
    </>
  )
}
