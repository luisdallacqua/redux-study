import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
//component responsible for handling all updates to the posts data.

const initialState = {
    posts: [],
    status: 'idle',
    error: null    
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
        const response = await client.post('/fakeApi/posts', { post: initialPost })
        return response.post
    }
)

// Remember: reducer functions must always create new state values immutably, by making copies! It's safe to call mutating functions like Array.push() or modify object fields like state.someField = someValue inside of createSlice(), because it converts those mutations into safe immutable updates internally using the Immer library, but don't try to mutate any data outside of createSlice!

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postUpdated(state, action) {
            const { id, title, content }= action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.dispatch
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        },
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions //createSlice automatically generates an action when we write a reducer that we can export

export default postsSlice.reducer

//But, like any abstraction, it's not something you should do all the time, everywhere. 
// Writing selectors means more code to understand and maintain. 
//Don't feel like you need to write selectors for every single field of your state. 
//Try starting without any selectors, and add some later when you find yourself looking up the same values in many parts of your application code.

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) =>
    state.users.find(user => user.id === userId)

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId)