import { createClient } from '@prismicio/client'
import { createCachelyFetch } from '@cachely-io/sdk'
import sm from './slicemachine.config.json' with { type: 'json' }

const cachelyFetch = createCachelyFetch({
  tenant: 'prismic',
  provider: 'prismic',
  transform: 'czech',
  transformWhen: ({ url }) => {
    const qValues = url.searchParams.getAll('q').join(' ')
    return qValues.includes('page_home') || qValues.includes('page_default')
  }
})

const client = createClient(sm.repositoryName, {
  fetch: cachelyFetch
})

try {
  const page = await client.getSingle('page_home')

  console.log(JSON.stringify({
    id: page.id,
    type: page.type,
    uid: page.uid,
    hasData: !!page.data,
    title: page.data?.title,
    slices: page.data?.slices?.length
  }, null, 2))
} catch (error) {
  console.error(error)
  process.exit(1)
}
