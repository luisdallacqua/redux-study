import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { postAdded } from './postsSlice'

function AddPostForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch() //we need this hook to acess the store's dispatch, to dispatch actions.

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)

    const onSavePostClicked = () => {
        if(title && content) {
            dispatch(postAdded(title, content))
            setTitle('')
            setContent('')
        }
    }

    return (
       <section>
           <h2>Add a New Post</h2>

            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postTitle">Content:</label>
                <input 
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>

       </section>
    )
}

export default AddPostForm
