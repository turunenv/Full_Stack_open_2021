import Blog from './Blog'

const BlogList = ({ blogs }) => {
    const blogListStyle = {
        marginTop: 10,
    }
    return (
        <div style={blogListStyle}>
            {blogs.map(blog => {
                return <Blog key={blog.id} blog={blog} />
            })}
        </div>
    )
}

export default BlogList