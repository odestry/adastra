import {ShopifyProvider, ShopPayButton} from '@shopify/hydrogen-react'

export default function HelloWorld() {
  return (
    <ShopifyProvider
      storeDomain="https://example-store.myshopify.com"
      storefrontToken="fce11a7732e531ce54a27b77d489f390"
      storefrontApiVersion="2022-10"
      countryIsoCode="EN"
      languageIsoCode="EN"
    >
      <ShopPayButton variantIds={['gid://shopify/ProductVariant/8187539292428']} />
    </ShopifyProvider>
  )
}
