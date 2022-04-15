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

  useEffect(() => {
    const checked = async (pathName) => {
      try {
        await checkUser(pathName)
        setLoading(false)
        
      } catch (error) {
        console.log(error)
      }
    }
    checked(pathname.slice(1))
    return () => setLoading(true)
  },[pathname])
  return (
    <div className='bg-[#fafafa] min-h-screen flex'>
      <Container maxWidth='md' className="mt-7 mb-10">
      {
        loading
        ? <div className='flex justify-center min-h-full h-[500px] items-center'>
              <CircularProgress color='secondary' />
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
