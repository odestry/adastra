import { LitElement, html } from 'lit'

export default class HelloWorld extends LitElement {
  static get properties() {
    return {
      count: { type: Number },
    }
  }

  constructor() {
    super()
    this.count = 0
  }

  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <button @click=${this._onClick} part="button">
        Counter <output>${this.count}</output>
      </button>
    `
  }

  _onClick() {
    this.count++
  }
}
