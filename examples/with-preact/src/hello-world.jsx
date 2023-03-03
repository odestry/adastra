import { useState } from 'preact/hooks'

function HelloWorld() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      Counter <output>{count}</output>
    </button>
  )
}

export default HelloWorld
