import { client } from '@/sanity/lib/client'
import { CASE_STUDIES_QUERY } from '@/sanity/lib/queries'

export default async function WorkPage() {
  const cases = await client.fetch(CASE_STUDIES_QUERY)

  return (
    <main>
      <h1>Work</h1>
      <ul>
        {cases.map((item: any) => (
          <li key={item._id}>
            <a href={`/work/${item.slug.current}`}>
              <h2>{item.title}</h2>
              {item.client && <p>{item.client}</p>}
              {item.summary && <p>{item.summary}</p>}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}