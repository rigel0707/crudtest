import { useCookies } from 'react-cookie'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

async function addList() {
  try {
    const name = document.getElementById('name').value
    const age = document.getElementById('age').value
    const program = document.getElementById('program').value

    const response = await axios.post('http://localhost:5000/list', {
      name,
      age,
      program,
    })

    console.log(response.data)
  } catch (err) {
    console.error(err)
  }
}

export const AddStudent = () => {
  const [cookies, setCookies] = useCookies(['access_token'])

  let isStudent = false
  if (cookies.access_token) {
    try {
      const decoded = jwt_decode(cookies.access_token)
      isStudent = decoded.role === 'student'
    } catch (e) {
      console.log('Invalid token:', e.message)
    }
  }
  return (
    <>
      {!isStudent && (
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="age" className="form-label">
                  Age:
                </label>
                <input type="number" className="form-control" id="age" />
              </div>
              <div className="col mb-3">
                <label htmlFor="program" className="form-label">
                  Program:
                </label>
                <input type="text" className="form-control" id="program" />
              </div>
            </div>
            <button
              className="btn btn-primary d-flex justify-content-end"
              type="submit"
              onClick={addList}
            >
              Add Student
            </button>
          </form>
        </div>
      )}
    </>
  )
}
