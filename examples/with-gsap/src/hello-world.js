import gsap from 'gsap'

export default class HelloWorld extends window.HTMLElement {
  constructor () {
    super()

    this.button = this.querySelector('button')
    this.output = this.querySelector('output')
    if (!this.button) return

    this.button.addEventListener('click', () => {
      gsap.from(this.button, {scale: 1.1, duration: 0.4});
      this.output.innerHTML = String(++this.output.value)
    })
  }
}
