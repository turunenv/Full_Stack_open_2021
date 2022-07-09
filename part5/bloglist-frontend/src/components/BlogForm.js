import { useState } from 'react'

const BlogForm = ({ createBlog, setNotification, setBlogs, blogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createNewBlog = async event => {
        event.preventDefault()
        
        const newBlog = {
            title,
            author,
            url,
        }

        //add new blog to the database and update the state-array
        const createdBlog = await createBlog(newBlog)
        setBlogs(blogs.concat(createdBlog))

        //set notification of a successful operation
        setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 'message successMessage')
    }
    return (
        <form onSubmit={createNewBlog} className="blogForm">
            <label htmlFor="title">title:</label>
            <input type="text" name="title" id="title" 
                   value={title}
                   onChange={({target}) => setTitle(target.value)}
            />

            <label htmlFor="author">author:</label>
            <input type="text" name="author" id="author" 
                   value={author}
                   onChange={({target}) => setAuthor(target.value)}
            />

            <label htmlFor="url">url:</label>
            <input type="text" name="url" id="url" 
                   value={url} 
                   onChange={({target}) => setUrl(target.value)}
            />

            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm