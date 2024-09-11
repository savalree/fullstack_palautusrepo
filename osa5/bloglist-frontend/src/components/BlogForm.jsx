const BlogForm = (props) => {
    return (
      <form onSubmit={props.addBlog}>
        <div>title: <input value={props.blogTitle} onChange={props.handleNewTitle}/></div>
        <div>author: <input value={props.blogAuthor} onChange={props.handleNewAuthor}/></div>
        <div>url: <input value={props.blogUrl} onChange={props.handleNewUrl}/></div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    )
  }

  export default BlogForm