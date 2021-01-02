import Head from 'next/head'
import Header from '@components/Header'

import { fetchEntries } from '../util/contentfulPosts';
import Post from '../components/Post';
import Preview from '@components/Preview';

export default function Home({posts}) {
  return (
    <div className="container">
      <Head>
        <title>Trinity Oaks Farm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: '100%', width: '100%'}}>
        <Header title="Trinity Oaks Farm" />
        <div className="previews">
          {posts.map((p) => {
            return <Preview key={p.id} id={p.id} slug={p.slug} title={p.title} description={p.description} />
          })}
        </div>
      </main>

    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries();
  const posts = await res.map(p => {
    return {...p.fields, ...p.sys, slug: p.fields.title.split(' ').join('-')}
  });

  return {
    props: {
      posts
    }
  }
}
