import {ADD_COMMENT,GET_COMMENTS, LOADED_COMMENT_POST, DELETE_COMMENT, SET_LOADING_FALSE} from '../contexts/constants'

export const commentReducer = (state, action) => {
    const { type, payload: { comment, comments, commentOfPost } } = action;

    switch (type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: comments
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [comment,...state.comments],
                commentOfPost: [comment,...state.commentOfPost]
            }
        case LOADED_COMMENT_POST:
            return {
                ...state,
                commentOfPost,
                commentLoading: false
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(cmt => cmt._id !== comment._id),
                commentOfPost: state.commentOfPost.filter(cmt => cmt._id !== comment._id)
            }
        case SET_LOADING_FALSE:
            return {
                ...state,
                commentLoading: true
            }
        default: throw new Error('Action not found');
    }
}