import { createSignal } from "solid-js";

function HelloWorld() {
  const [count, setCount] = createSignal(0);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      Counter <output>{count()}</output>
    </button>
  )
}

export default HelloWorld
