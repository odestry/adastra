class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector("form");
    this.button = this.querySelector('[type="submit"]');
    this.form.querySelector("[name=id]").disabled = false;
    this.form.addEventListener("submit", this.submitHandler.bind(this));
  }
  async submitHandler(event) {
    event.preventDefault();
    this.button.classList.add("animate-pulse");
    const config = (type = "javascript") => ({
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: `application/${type}`
      },
      // We get the data from the product form it self
      body: new FormData(this.form)
    });
    try {
      await fetch(`${routes.cart_add_url}`, config());
      window.location = window.shopUrl + "/checkout";
    } catch (error) {
      console.error(error);
    }
  }
}
customElements.define("product-form", ProductForm);
