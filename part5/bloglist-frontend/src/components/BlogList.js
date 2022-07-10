import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) => {
    const blogListStyle = {
        marginTop: 10,
    }
    return (
        <div style={blogListStyle}>
            {blogs.map(blog => {
                return <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
            })}
        </div>
    )
}

export default BlogList