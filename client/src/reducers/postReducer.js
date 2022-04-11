import { POSTS_LOADED_SUCCESS,POSTS_LOADED_FAIL,ADD_POST,FIND_POST,UPDATE_POST,DELETE_POST,GET_POSTS_USER, ADD_LIKE_POST, DELETE_LIKE_POST } from "../contexts/constants";

export default function postReducer(state, action){
    const {type, payload: {post, posts, postsUser, likes, like} } = action;

    switch(type){
        case POSTS_LOADED_SUCCESS:
            return {
                ...state,
                posts,
                postLoading: false,
                likes
            }
        case POSTS_LOADED_FAIL:
            return {
                ...state,
                posts: [],
                postLoading: false,
                likes: []
            }
        case ADD_POST:
            return {
                ...state,
                posts: [post,...state.posts]
            }
        case FIND_POST:
            return {
                ...state,
                post
            }
        case UPDATE_POST:
            const newPosts = state.posts.map(p => {
                if(p._id === post._id)
                    return post
                return p
            })
            return {
                ...state,
                posts: newPosts
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p._id !== post._id)
            }
        case GET_POSTS_USER:
            return {
                ...state,
                postsUser,
                likes
            }
        case ADD_LIKE_POST:
            return {
                ...state,
                likes: [like,...state.likes]
            }
        case DELETE_LIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(l => l._id !== like._id)
            }
        default:
            throw new Error('Action invalid.')
    }
}