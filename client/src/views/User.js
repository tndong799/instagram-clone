import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import ErrorPage from './ErrorPage'
import { useLocation } from 'react-router-dom'

import {Container, CircularProgress} from '@mui/material'
import Porfolio from '../components/auth/Porfolio'
import PorfolioPosts from '../components/layouts/PorfolioPosts'

export default function User() {
  const {authState: { checkRouteUser}, checkUser} = useContext(AuthContext)


  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const [path, setPath] = useState(pathname.slice(pathname.indexOf('/'),pathname.lastIndexOf('/') > 0 ? pathname.lastIndexOf('/') : pathname.length))

  useEffect(() => {
    if(pathname.slice(pathname.indexOf('/'),pathname.lastIndexOf('/') > 0 ? pathname.lastIndexOf('/') : pathname.length) !== path){
      setPath(pathname.slice(pathname.indexOf('/'),pathname.lastIndexOf('/') > 0 ? pathname.lastIndexOf('/') : pathname.length))
    }
  },[pathname])
  
  useEffect(() => {
    const checked = async (pathName) => {
      try {
        await checkUser(pathName)
        setLoading(false)
        
      } catch (error) {
        console.log(error)
      }
    }
    checked(path.slice(1))
    return () => setLoading(true)
  },[path])
  return (
    <div className='bg-[#fafafa] min-h-screen flex'>
      <Container maxWidth='md' className="mt-7 mb-10">
      {
        loading
        ? <div className='flex justify-center min-h-full h-[500px] items-center'>
              <CircularProgress  />
          </div> : !checkRouteUser ? <ErrorPage></ErrorPage>
          :  <>
              <Porfolio></Porfolio>
              <PorfolioPosts></PorfolioPosts>
            </>
          
      }
    </Container>
    </div>
  )
}
