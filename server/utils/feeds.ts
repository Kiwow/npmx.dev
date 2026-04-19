import { Feed } from 'feed'
import { posts } from '#blog/posts'

export const rssPath = '/rss.xml'
export const atomPath = '/atom.xml'
export const jsonPath = '/feed.json'

let feed: Feed | undefined = undefined

export function getFeed(): Feed {
  if (!feed) {
    feed = generateFeed()
  }
  return feed
}

function generateFeed(): Feed {
  // Generate content for RSS, Atom and JSON feeds
  const feed = new Feed({
    title: 'Blog - npmx',
    description: 'a fast, modern browser for the npm registry',
    id: 'https://npmx.dev/',
    link: 'https://npmx.dev/',
    language: 'en',
    image: 'https://npmx.dev/logo.svg',
    favicon: 'https://npmx.dev/favicon.ico',
    feedLinks: {
      rss: new URL(rssPath, 'https://npmx.dev').toString(),
      atom: new URL(atomPath, 'https://npmx.dev').toString(),
      json: new URL(jsonPath, 'https://npmx.dev').toString(),
    },
  })

  for (const post of posts.filter(post => !post.draft)) {
    feed.addItem({
      title: post.title,
      id: new URL(post.path, 'https://npmx.dev').toString(),
      link: new URL(post.path, 'https://npmx.dev').toString(),
      description: post.description,
      author: post.authors.map(author => ({
        name: author.name,
        link: author.profileUrl ?? undefined,
        // author.avatar is a relative URL - make it absolute to work in feed readers
        avatar: author.avatar ? new URL(author.avatar, 'https://npmx.dev').toString() : undefined,
      })),
      date: new Date(post.date),
      image: post.image,
    })
  }

  return feed
}
