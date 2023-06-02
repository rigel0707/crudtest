import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      })
      if (response.status === 200) {
        alert('Registration Completed! Please login now.')
        navigate('/login')
      }
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className="d-grid justify-content-center container mt-5">
      <div>
        <h1>Register</h1>
      </div>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="p-3">
            <label className="px-2" htmlFor="username">
              Username
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
          <div className="row p-3">
            <div className="col">
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            </div>
            <div className="col d-flex justify-content-end">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => navigate('/')}
              >
                Go Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
