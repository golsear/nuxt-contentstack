import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default ctx => {
  const ssrMiddleware = setContext((_, { headers }) => {
    if (process.client) return headers
    return {
      headers
    }
  })
  
  const httpLink = new HttpLink({
    uri: 'https://graphql.contentstack.com/stacks/blt24dc9879adb66205?environment=development',
    headers: {
        'access_token': 'cs9b838805a8fda936b34a2226', 
    }
  })
  
  const link = from([ssrMiddleware, httpLink])
  const cache = new InMemoryCache()
  
  return {
    link,
    cache,
    defaultHttpLink: false
  }
}