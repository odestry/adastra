import HelloWorld from '../hello-world.svelte'

const app = new HelloWorld({
  target: document.getElementById('hello-world'),
})

export default app
