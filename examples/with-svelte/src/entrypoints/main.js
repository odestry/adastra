// Same as './src/lib/hello-world.svelte'
import HelloWorld from '@/lib/hello-world.svelte'

const app = new HelloWorld({
  target: document.getElementById('hello-world'),
})

export default app
