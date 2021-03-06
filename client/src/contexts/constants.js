export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'https://safe-badlands-49880.herokuapp.com/api'
export const LOCAL_STORAGE_TOKEN_NAME = 'instagram-clone'

export const POSTS_LOADED_SUCCESS = 'post_loaded_success'
export const POSTS_LOADED_FAIL = 'post_loaded_fail'
export const ADD_POST = 'add_post'
export const FIND_POST = 'find_post'
export const UPDATE_POST = 'update_post'
export const DELETE_POST = 'delete_post'

export const GET_POSTS_USER = 'get_posts_user'
export const ADD_LIKE_POST = 'add_like_post'
export const DELETE_LIKE_POST = 'delete_like_post'

export const ADD_COMMENT = 'add_comment'
export const GET_COMMENTS = 'get_comments'
export const LOADED_COMMENT_POST = 'loaded_comment_post'
export const DELETE_COMMENT = 'delete_comment'
export const SET_LOADING_FALSE = 'set_loading_false'


