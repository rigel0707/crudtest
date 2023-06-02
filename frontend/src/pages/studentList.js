import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { AddStudent } from '../components/addStudent'
import { Logout } from '../components/logout'

export const StudentList = () => {
  return (
    <div className="container mt-5">
      <h1>Student List</h1>
      <Logout />
      <AddStudent />
      <List />
    </div>
  )
}

const List = () => {
  const [list, setList] = useState([])
  const [cookies, setCookies] = useCookies(['access_token'])

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await axios.get('http://localhost:5000/list')
        setList(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchList()
  }, [])

  const updateList = (data) => {
    setList(data)
  }

  const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/list/' + id)
      setList((prevList) => prevList.filter((student) => student.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleView = (id) => {
    navigate(`/student/${id}`)
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  let isAdmin = false
  if (cookies.access_token) {
    try {
      const decoded = jwt_decode(cookies.access_token)
      isAdmin = decoded.role === 'admin'
    } catch (e) {
      console.log('Invalid token:', e.message)
    }
  }

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
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID Number</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Program</th>
            </tr>
          </thead>
          <tbody>
            {list.map((student) => (
              <tr key={student.id}>
                <th scope="row">{student.id}</th>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.program}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleView(student.id)}
                  >
                    View
                  </button>
                  {isStudent ? null : (
                    <>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(student.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
