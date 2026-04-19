import { expect, test } from './test-utils'

test.describe('Blog feeds', () => {
  test.describe('have alternate links and matching content types', () => {
    const feeds = [
      {
        name: 'RSS',
        contentType: 'application/rss+xml',
      },
      {
        name: 'Atom',
        contentType: 'application/rss+atom',
      },
      {
        name: 'JSON Feed',
        contentType: 'application/feed+json',
      },
    ]

    for (const feed of feeds) {
      test(feed.name, async ({ page, goto }) => {
        await goto('/blog', { waitUntil: 'domcontentloaded' })

        const locator = page.locator(`link[rel='alternate'][type='${feed.contentType}']`).first()
        await expect(locator).toHaveAttribute('href')

        const href = await locator.getAttribute('href')
        expect(href).not.toBeNull()

        const { contentType, cors } = await page.evaluate(async href => {
          const response = await fetch(href)
          return {
            contentType: response.headers.get('Content-Type'),
            cors: response.headers.get('Access-Control-Allow-Origin'),
          }
        }, href as string)

        expect(contentType).toBe(feed.contentType)
        expect(cors).toBe('*')
      })
    }
  })
})
