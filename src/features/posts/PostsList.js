import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux' //to read data from the redux store
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'

const PostExcerpt = ({ post }) => {
    return(
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View post
            </Link>
        </article>
    )
}


export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)

    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
          dispatch(fetchPosts())
        }
      }, [postStatus, dispatch])

      let content

      if(postStatus === 'loading'){
        content = <div className="loader">Loading...</div>
      } else if (postStatus === 'succeeded') {
          // Sort posts in reverse chronological order by datetime string
          const orderedPosts = posts
          .slice()
          .sort((a, b) => b.date.localeCompare(a.date))

          content = orderedPosts.map(post => (
              <PostExcerpt key={post.id} post={post} />
          ))

      } else if (postStatus === 'error') {
          content = <div>{error}</div>
      }  

    return(
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

//All the new features we'll add after this will follow the same basic patterns you've seen here: adding slices of state, writing reducer functions, dispatching actions, and rendering the UI based on data from the Redux store.