import { createContext, useEffect, useReducer,useState } from "react";
import axios from 'axios'
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        checkRouteUser: false,
        porfolioUser: null
    })
    
    const [openModalAvt, setOpenModalAvt] = useState(false)
    const [openModalUser, setOpenModalUser] = useState(false)

    const loadUser = async () => {
        if(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)){
            setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME))
        }
        try {
            const res = await axios.all([axios.get(`${apiUrl}/auth`),axios.get(`${apiUrl}/like`)]).then(
                axios.spread((res, res2) => {
                    res.data.user.liked = res2.data.likes.filter(like => {
                        return like.user === res.data.user._id
                    })
                    return res
                })
            )
            if(res.data.success){
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user
                    }
                })
            }else{
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                setAuthToken(null)
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    useEffect(() => {
        loadUser()
    },[])

    const loginUser = async (userForm) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`,userForm)
            if(res.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,res.data.accessToken)
                await loadUser()
            }
            return res.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const registerUser = async (userForm) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, userForm)
            if(res.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,res.data.accessToken)
                await loadUser()
            }
            return res.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })

    }

    const checkUser = async (username) => {
        try {
            const res = await axios.get(`${apiUrl}/auth/${username}`)
            if(res.data.success){
                dispatch({
                    type: 'CHECKED_USER',
                    payload: {
                        checkRouteUser: true,
                        porfolioUser: res.data.user
                    }
                })
            }else{
                dispatch({
                    type: 'CHECKED_USER',
                    payload: {
                        checkRouteUser: false,
                        porfolioUser: null
                    }
                })
            }
            return res.data
        } catch (error) {
            dispatch({
                type: 'CHECKED_USER',
                payload: {
                    checkRouteUser: false,
                    porfolioUser: null
                }
            })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }
    const updateUser = async (formUser) => {
        try {
            const res = await axios.put(`${apiUrl}/auth/${authState.user.username}`, formUser)
            if(res.data.success){
                dispatch({
                    type: 'UPDATE_USER',
                    payload: {
                        user: res.data.user,
                        porfolioUser: res.data.user
                    }
                })
            }
            return res.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //Context data
    const authContextData = { loginUser,registerUser, authState, logoutUser, checkUser, updateUser, openModalAvt, setOpenModalAvt, setOpenModalUser, openModalUser}

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}