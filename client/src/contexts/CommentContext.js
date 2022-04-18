import { createContext, useReducer } from "react";
import axios from "axios";
import { commentReducer } from "../reducers/commentReducer";
import {apiUrl,ADD_COMMENT, GET_COMMENTS, LOADED_COMMENT_POST, DELETE_COMMENT} from './constants'

export const CommentContext = createContext()

export default function CommentContextProvider({children}){
    const [commentState, dispatch] = useReducer(commentReducer, {
        comments: [],
        commentOfPost: [],
        commentLoading: true
    })

    const getComments = async () => {
        try {
            const res = await axios.get(`${apiUrl}/comment`)
            if(res.data.success){
                dispatch({
                    type: GET_COMMENTS,
                    payload: {
                        comments: res.data.comments
                    }
                })
            }
        } catch (error) {
            
        }
    }

    const addComment = async (form) => {
        try {
            const res = await axios.post(`${apiUrl}/comment`,form)
            if(res.data.success){
                dispatch({
                    type: ADD_COMMENT,
                    payload: {
                        comment: res.data.comment
                    }
                })
            }
            return res.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const getCommentPost = async (id) => {
        try {
            const res = await axios.get(`${apiUrl}/posts/${id}/comment`)
            if(res.data.success){
                dispatch({
                    type: LOADED_COMMENT_POST,
                    payload: {
                        commentOfPost: res.data.comments
                    }
                })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const deleteComment = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/comment/${id}`)
            if(res.data.success){
                dispatch({
                    type: DELETE_COMMENT,
                    payload: {
                        comment: res.data.comment
                    }
                })
            }
            return res.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const commentContextData = {commentState, addComment, getComments, getCommentPost, deleteComment}

    return <CommentContext.Provider value={commentContextData} >
        {children}
    </CommentContext.Provider>
}