import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client'

export const client = makeClient({
  // host: 'http://localhost:5003'
  // host: 'http://172.16.11.79:5003'
  host: 'http://localhost:5003'
  // host: 'http://172.20.10.3:5003'
})
