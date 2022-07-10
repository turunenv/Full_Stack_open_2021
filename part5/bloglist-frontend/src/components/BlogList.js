import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) => {
    const blogListStyle = {
        marginTop: 10,
    }
    // sort the blogs by the number of likes in descending order
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

    return (
        <div style={blogListStyle}>
            {blogs.map(blog => {
                return <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
            })}
        </div>
    )
}

export default BlogList