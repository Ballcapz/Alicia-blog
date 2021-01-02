import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

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

function Post({ content, title, description}) {

    console.log(content);
    
    return (
        <div className="post">
            <h1 className="title">{title}</h1>
            <p>{description}</p>
            {content && documentToReactComponents(content, options)}
        </div>
    )
}


export default Post