import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Student = () => {
  const { id } = useParams()
  const [student, setStudent] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/list/' + id)
        setStudent(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    getInfo()
  }, [id])

  return (
    <div className="container mt-5">
      <h1>Student Information</h1>
      {student ? (
        <div className="container">
          {student.map((s) => (
            <div key={s.id}>
              <p>ID Number: {s.id}</p>
              <p>Name: {s.name}</p>
              <p>Age: {s.age}</p>
              <p>Program: {s.program}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No student found.</p>
      )}
      <button className="btn btn-primary" onClick={() => navigate('/list')}>
        Go Back to List
      </button>
    </div>
  )
}
