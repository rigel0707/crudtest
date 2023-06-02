import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="container d-grid justify-content-center mt-5">
      <h1>Student Portal</h1>
      <div className="container">
        <button
          className="btn btn-primary m-2"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  )
}
