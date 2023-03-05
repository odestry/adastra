export interface IEndpoints {
  /**
   * Returns Ajax Cart
   */
  get: '/cart.json'
  /**
   * Add a product to cart
   */
  add: '/cart/add.js'
  /**
   * Updates cart line items
   */
  update: '/cart/update.js'
  /**
   * Changes an line item
   */
  change: '/cart/change.js'
  /**
   * Clear all line items from cart
   */
  clear: '/cart/clear.js'
  /**
   * Returns Shipping Rates
   */
  shipping_rates: '/cart/shipping_rates.json'
  /**
   * Applies a discount to the checkout
   */
  checkout_discount: '/checkout?discount='
}

export interface IBrowserContextSuggestions {
  detected_values: {
    /**
     * An object informing of the the visitors country and 2 letter country code
     */
    country: {
      /**
       * The 2 letter country code
       */
      handle: string
      /**
       * The country name in English
       */
      name: string
    }
    /**
     * The country name in English (same as `country.name`)
     */
    country_name: string
  }
}

export interface ICartDiscount {
  percentage?: number
  variant_id: string
}

export interface ILineItems {
  id: number
  properties: {
    return?: string
    shipping?: string
  }
  quantity: number
  variant_id: number
  key: string
  title: string
  price: number
  line_price: number
  final_price: number
  final_line_price: number
  original_line_price: number
  sku: string
  grams: number
  vendor: string
  taxable: boolean
  product_id: number
  product_has_only_default_variant: boolean
  gift_card: boolean
  url: string
  featured_image: {
    url: string
    aspect_ratio: number
    alt: string
  }
  image: string
  handle: string
  requires_shipping: boolean
  product_title: string
  product_description: string
  product_type: string
  variant_title: string
  variant_options: string[]
  options_with_values: Array<{
    name: string
    value: string
  }>
}
export interface IAjaxCart {
  token?: string
  note?: string
  attributes?: {
    [attribute: string]: string
  }
  total_price?: number
  total_weight?: number
  item_count?: number
  items?: ILineItems[]
  requires_shipping?: boolean
  currency?: string
  items_subtotal_price?: number
  cart_level_discount_applications?: Array<{
    type?: string
    key?: string
    title?: string
    description?: string | null
    value?: string
    created_at?: string
    value_type?: string
    allocation_method?: string
    target_selection?: string
    target_type?: string
    total_allocated_amount?: number
  }>
}

export interface ShopifyGlobals {
  PaymentButton: {
    init(): any
  }
  autoloadFeatures(param: any): any
  PreviewBarInjector(): any
  /**
   * Set to `true` when active in theme editor
   */
  designMode?: boolean
  cdnHost: string
  currency: {
    active: string
    rate: string
  }
  customerPrivacy: {
    getRegulation(): any
    getShopPrefs(): any
    getTrackingConsent(): any
    isRegulationEnforced(): any
    setTrackingConsent(param1: any, param2: any): any
    shouldShowGDPRBanner(): any
    userCanBeTracked(): any
    userDataCanBeSold(): any
  }
  loadFeatures(
    params: Array<{
      name: LiteralUnion<'consent-tracking-api', string>
      version: LiteralUnion<'0.1', string>
    }>,
    callback: (error: Error) => void
  ): any
  /**
   * Two letter language code
   */
  locale: string
  /**
   * Myshopify.com store domain
   */
  shop: string
  modules: boolean
  /**
   * Theme Information
   */
  theme: {
    handle: string
    id: number
    name: string
    role: 'published' | 'unpublished'
    style: {
      id: number
      handle: string
    }
    theme_store_id: null | number
  }
}

declare global {
  interface Window {
    Shopify: ShopifyGlobals
  }
}

export as namespace Shopify
