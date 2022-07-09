import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
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
        
        await createBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
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