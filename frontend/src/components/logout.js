import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const Logout = () => {
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(['access_token'])

  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('sessionToken')
    navigate('/')
  }
  return (
    <div className="d-flex flex-row-reverse">
      <button className="btn btn-primary" onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}
