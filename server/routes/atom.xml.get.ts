import { getFeed } from '../utils/feeds'

export default defineEventHandler(event => {
  setHeader(event, 'Content-Type', 'application/atom+xml')
  setHeader(event, 'Access-Control-Allow-Origin', '*')

  const atomFeed = getFeed().atom1()

  return atomFeed
})
