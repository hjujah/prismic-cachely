import { createClient } from '@prismicio/client'
import { createCachelyFetch } from '@cachely-io/sdk'
import sm from './slicemachine.config.json' with { type: 'json' }

const cachelyFetch = createCachelyFetch({
  tenant: 'prismic',
  provider: 'prismic',
  transform: 'czech',
  transformWhen: ({ url }) => {
    const qValues = url.searchParams.getAll('q').join(' ')
    const should = qValues.includes('page_home') || qValues.includes('page_default')
    console.log('[transformWhen]', should, url.toString())
    return should
  }
})

const debugFetch = async (input, init) => {
  const response = await cachelyFetch(input, init)

  const clone = response.clone()
  let body

  try {
    body = await clone.json()
  } catch {
    body = await clone.text()
  }

  console.log('\n[FETCH RESULT]')
  console.log('status:', response.status)
  console.log('url:', response.url)
  console.log('content-type:', response.headers.get('content-type'))
  console.log('x-cachely-ai-transform:', response.headers.get('x-cachely-ai-transform'))
  console.log('x-cachely-ai-profile:', response.headers.get('x-cachely-ai-profile'))
  console.log(JSON.stringify(body, null, 2).slice(0, 5000))

  return response
}

const client = createClient(sm.repositoryName, {
  fetch: debugFetch
})

try {
  const page = await client.getSingle('page_home')

  console.log('\n[PAGE]')
  console.log(JSON.stringify({
    id: page.id,
    type: page.type,
    uid: page.uid,
    hasData: !!page.data,
    title: page.data?.title,
    slices: page.data?.slices?.length
  }, null, 2))
} catch (error) {
  console.error('\n[ERROR]')
  console.error(error)
  process.exit(1)
}
