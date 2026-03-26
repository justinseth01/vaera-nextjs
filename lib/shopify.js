/**
 * Shopify Storefront API Client
 *
 * This is a stub file for future Shopify integration.
 * To enable Shopify functionality:
 * 1. Create a Shopify store and enable the Storefront API
 * 2. Copy .env.local.example to .env.local
 * 3. Fill in your Shopify store domain and Storefront access token
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

const endpoint = domain ? `https://${domain}/api/2024-01/graphql.json` : null

/**
 * Execute a GraphQL query against the Shopify Storefront API
 * @param {string} query - GraphQL query string
 * @param {object} variables - Query variables
 * @returns {Promise<object>} - Query response data
 */
export async function shopifyFetch({ query, variables = {} }) {
  if (!endpoint || !storefrontAccessToken) {
    console.warn('Shopify is not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local')
    return null
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    })

    const json = await response.json()

    if (json.errors) {
      console.error('Shopify API Error:', json.errors)
      throw new Error(json.errors[0].message)
    }

    return json.data
  } catch (error) {
    console.error('Shopify Fetch Error:', error)
    throw error
  }
}

/**
 * Example: Get all products
 */
export async function getProducts(first = 10) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch({ query, variables: { first } })
  return data?.products?.edges?.map(edge => edge.node) || []
}

/**
 * Example: Get a single product by handle
 */
export async function getProductByHandle(handle) {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch({ query, variables: { handle } })
  return data?.productByHandle
}

/**
 * Example: Create a checkout
 */
export async function createCheckout(lineItems) {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyFetch({
    query,
    variables: {
      input: { lineItems }
    }
  })

  return data?.checkoutCreate?.checkout
}
