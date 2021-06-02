import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux' //to read data from the redux store
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { selectAllPosts, fetchPosts } from './postsSlice'

export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)

    const postStatus = useSelector(state => state.posts.status)

    useEffect(() => {
        if (postStatus === 'idle') {
          dispatch(fetchPosts())
        }
      }, [postStatus, dispatch])

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0,100)}</p>
            <PostAuthor userId={post.user} />
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