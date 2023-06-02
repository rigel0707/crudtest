import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [unused, setCookies] = useCookies(['access_token'])

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      })

      if (response.status === 200) {
        setCookies('access_token', response.data.token)
        window.localStorage.setItem('sessionToken', response.data.token)
        navigate('/list')
      }
    } catch (err) {
      alert('Wrong username or password')
      console.error(err)
    }
  }
  return (
    <div className="d-grid justify-content-center container mt-5">
      <div>
        <h1>Login</h1>
      </div>

      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="p-3">
            <label className="px-2" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="p-3">
            <label className="px-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="p-3">
            <input className="btn btn-primary" type="submit" value="Log In" />
          </div>
        </form>
        <div className="p-3">
          Not a member?{' '}
          <a href="#" onClick={() => navigate('/register')}>
            Signup now
          </a>
        </div>
      </div>
    </div>
  )
}
