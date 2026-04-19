import { getFeed } from '../utils/feeds'

export default defineEventHandler(event => {
  setHeader(event, 'Content-Type', 'application/rss+xml')
  setHeader(event, 'Access-Control-Allow-Origin', '*')

  const rssFeed = getFeed().rss2()

  return rssFeed
})
