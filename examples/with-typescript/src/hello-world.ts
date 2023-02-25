export default class HelloWorld extends HTMLElement {
  button: HTMLButtonElement
  output: HTMLOutputElement

  constructor() {
    super()

    this.button = this.querySelector('button') as HTMLButtonElement
    this.output = this.querySelector('output') as HTMLOutputElement

    this.button.addEventListener('click', () => {
      this.output.value = String(+this.output.value + 1)
    })
  }
}
