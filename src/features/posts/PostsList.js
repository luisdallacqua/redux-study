import React from 'react'
import { useSelector } from 'react-redux' //to read data from the redux store
import { Link } from 'react-router-dom'

export const PostsList = () => {
    const posts = useSelector(state => state.posts)

    const renderedPosts = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0,100)}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View post
            </Link>
        </article>
    ))

    return(
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

//All the new features we'll add after this will follow the same basic patterns you've seen here: adding slices of state, writing reducer functions, dispatching actions, and rendering the UI based on data from the Redux store.