import { createSlice, nanoid } from '@reduxjs/toolkit'

//component responsible for handling all updates to the posts data.

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

// Remember: reducer functions must always create new state values immutably, by making copies! It's safe to call mutating functions like Array.push() or modify object fields like state.someField = someValue inside of createSlice(), because it converts those mutations into safe immutable updates internally using the Immer library, but don't try to mutate any data outside of createSlice!

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{            
            reducer(state, action) {
                state.push(action.payload)
            },
            // The "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object.It should then return an object with the payload field inside.
            prepare(title, content) {
                return {
                    payload:{
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content }= action.payload
            const existingPost = state.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions //createSlice automatically generates an action when we write a reducer that we can export

export default postsSlice.reducer