import Head from 'next/head'
import Header from '@components/Header'

import { fetchEntries } from '../util/contentfulPosts';
import Post from '../components/Post';
import Preview from '@components/Preview';

export default function Home({posts}) {
  return (
    <div className="container">
      <Head>
        <title>My blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: '100%', width: '100%'}}>
        <Header title="Welcome" />
        <div className="posts">
          {posts.map((p) => {
            return <Preview key={p.title} title={p.title} description={p.description} />
          })}
        </div>
      </main>

    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries();
  const posts = await res.map(p => {
    return p.fields;
  });

  return {
    props: {
      posts
    }
  }
}
