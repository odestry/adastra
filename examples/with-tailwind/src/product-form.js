export default class ProductForm extends window.HTMLElement {
  constructor() {
    super()

    this.form = this.querySelector('form')
    this.button = this.querySelector('[type="submit"]')
    this.form.querySelector('[name=id]').disabled = false
    this.form.addEventListener('submit', this.submitHandler.bind(this))
  }

  async submitHandler(event) {
    event.preventDefault()
    // Hint ✦ 2 change this ;)
    this.button.classList.add('animate-pulse')

    const config = (type = 'javascript') => ({
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: `application/${type}`
      },
      // We get the data from the product form it self
      body: new FormData(this.form)
    })

    // We send a request to the ajax API
    // More here https://shopify.dev/docs/api/ajax
    try {
      await fetch(`${window.routes.cart_add_url}`, config())
      // We redirect to checkout
      window.location = window.shopUrl + '/checkout'
    } catch (error) {
      console.error(error)
    }
  }
}
