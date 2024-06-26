import { useState } from "react";

const BlogForm = ({ createBlog, user}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: 0,
            user: user.id,
            username: user.username
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        type='text'
                        value={title}
                        name='title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        type='text'
                        value={author}
                        name='author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        type='text'
                        value={url}
                        name='url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id='create-button' type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm;