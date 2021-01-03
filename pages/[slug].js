import Link from 'next/link';
import Head from 'next/head';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { fetchEntries } from '../util/contentfulPosts';

const Bold = ({ children }) => <span className="bold">{children}</span>;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description, file } = node.data.target.fields;
      const mimeType = file.contentType
      const mimeGroup = mimeType.split('/')[0]

      switch (mimeGroup) {
        case 'image':
          return <img
            className="post-image"
            title={ title ? title : null}
            alt={description ?  description : null}
            src={file.url}
          />
        case 'application':
          return <a
            alt={description ?  description : null}
            href={file.url}
            >{ title ? title : file.details.fileName }
          </a>
        default:
          return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
      }
    },
  }
};

function Post({ post }) {
    
    return (
        <div className="post">
            <Head>
              <title>{post?.title}</title>
            </Head>
            <Link href="/">
                <a className="home-link">Home</a>
            </Link>
            {post && documentToReactComponents(post.content, options)}
        </div>
    )
}


export default Post


export async function getStaticProps({ params }) {
  const { slug } = params;
  const title = slug.split('-').join(' ');
  const res = (await fetchEntries());
  const post = res.find(p => p.fields.title.toLowerCase() == title.toLowerCase()).fields;

  return {
    props: {
      post
    }
  }
}


export async function getStaticPaths() {
  const res = await fetchEntries();

  return {
      paths: res.map(p => `/${p.fields.title.split(' ').join('-')}`),
      fallback: false
  }
}
