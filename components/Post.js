function Post({ content, title, description}) {
    
    return (
        <div className="post">
            <h1 className="title">{title}</h1>
            <p>{description}</p>
            <div className="content">
                {content}
            </div>
        </div>
    )
}


export default Post