class ProductForm extends HTMLElement {
  constructor() {
    super()

    this.form = this.querySelector('form')
    this.button = this.querySelector('[type="submit"]')
    this.form.querySelector('[name=id]').disabled = false
    this.form.addEventListener('submit', this.submitHandler.bind(this))
  }

  submitHandler(event) {
    event.preventDefault()
    // Hint ✦ 2 change this ;)
    this.button.classList.add('animate-pulse')

    const fetchConfig = (type = 'javascript') => ({
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: `application/${type}`
      }
    })

    const config = fetchConfig()
    // We get the data from the product form its self
    config.body = new FormData(this.form)

    // We send a request to Ajax Cart API
    fetch(`${routes.cart_add_url}`, config)
      .then(response => response.json())
      .then(response => {
        if (response.status) return
        // We redirect to checkout @todo improve it
        window.location = window.shopUrl + '/checkout'
      })
      .catch(error => {
        console.error(error)
      })
  }
}

customElements.define('product-form', ProductForm)
