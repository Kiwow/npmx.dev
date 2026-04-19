import { getFeed } from '../utils/feeds'

export default defineEventHandler(event => {
  setHeader(event, 'Content-Type', 'application/feed+json')
  setHeader(event, 'Access-Control-Allow-Origin', '*')

  const jsonFeed = getFeed().json1()

  return jsonFeed
})
