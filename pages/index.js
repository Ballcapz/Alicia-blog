import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

import { fetchEntries } from '../util/contentfulPosts';
import Post from '../components/Post';

export default function Home({posts}) {
  return (
    <div className="container">
      <Head>
        <title>My blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome" />
        <div className="posts">
          {posts.map((p) => {
            return <Post key={p.title} title={p.title} content={p.content} description={p.description} />
          })}
        </div>
      </main>

      <Footer />
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
