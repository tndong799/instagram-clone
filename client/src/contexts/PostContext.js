import axios from "axios";
import { createContext, useState, useReducer } from "react";
import postReducer from '../reducers/postReducer'
import { apiUrl, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, FIND_POST, UPDATE_POST, DELETE_POST, GET_POSTS_USER,ADD_LIKE_POST,DELETE_LIKE_POST } from "./constants";

export const PostContext = createContext()

export default function PostContextProvider({children}){
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true,
        postsUser: [],
        likes: []
    })
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    const loadedPosts = async () => {
        try {
            await axios.all([axios.get(`${apiUrl}/posts`),axios.get(`${apiUrl}/like`)]).then(
                axios.spread((res, res2) => {
                    if(res.data.success && res2.data.success){
                        dispatch({
                            type: POSTS_LOADED_SUCCESS,
                            payload: {
                                posts: res.data.posts,
                                likes: res2.data.likes
                            }
                        })
                    }
                })
            )
            
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL
            })
        }
    }

    const addNewPost = async (post) => {
        try {
            const res = await axios.post(`${apiUrl}/posts`,post)
            if(res.data.success){
                dispatch({
                    type: ADD_POST,
                    payload: {
                        post: res.data.post
                    }
                })
                return res.data
            }
            return res.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const findPost = (id) => {
        const post = postState.posts.find(post => post._id === id);
        if(post){
            dispatch({
                type: FIND_POST,
                payload: {
                    post
                }
            })
        }
    }

    const updatePost = async (form) => {
        try {
            const res = await axios.put(`${apiUrl}/posts/${form.get('id')}`, form);
            if(res.data.success){
                dispatch({
                    type: UPDATE_POST,
                    payload: {
                        post: res.data.post
                    }
                })
            }
            return res.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/posts/${id}`)
            if(res.data.success){
                dispatch({
                    type: DELETE_POST,
                    payload: {
                        post: res.data.post
                    }
                })
            }
            return res.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const getPostsUser = async (username) => {
        try {
            const res = await axios.all([axios.get(`${apiUrl}/posts/${username}`),axios.get(`${apiUrl}/like`)]).then(
                axios.spread((res, res2) => {
                    if(res.data.success && res2.data.success){
                        dispatch({
                            type: GET_POSTS_USER,
                            payload: {
                                postsUser: res.data.posts,
                                likes: res2.data.likes
                            }
                        })
                    }
                    return res
                })
            )
            return res.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const likePost = async (id) => {
        try {
            const res = await axios.post(`${apiUrl}/like`,{postId: id})
            if(res.data.success){
                dispatch({
                    type: ADD_LIKE_POST,
                    payload: {
                        like: res.data.like
                    }
                })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const deleteLikePost = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/like/${id}`)
            if(res.data.success){
                dispatch({
                    type: DELETE_LIKE_POST,
                    payload: {
                        like: res.data.like
                    }
                })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const postContextData = {postState, loadedPosts, showAddPostModal, setShowAddPostModal, addNewPost, showToast, setShowToast, showUpdatePostModal, setShowUpdatePostModal, findPost, updatePost, deletePost, getPostsUser, likePost, deleteLikePost}
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}