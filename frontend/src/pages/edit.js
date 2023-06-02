import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [program, setProgram] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/list/${id}`)
        const { name, age, program } = response.data[0]
        setName(name)
        setAge(age)
        setProgram(program)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:5000/list/${id}`, {
        name,
        age,
        program,
      })
      navigate('/list')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="container">
        <h1>Edit Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="age" className="form-label">
                Age:
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="program" className="form-label">
                Program:
              </label>
              <input
                type="text"
                className="form-control"
                id="program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary d-flex justify-content-end"
                type="submit"
                onClick={() => navigate('/list')}
              >
                Go Back
              </button>
            </div>
            <div className="d-flex flex-row-reverse col">
              <button
                className="btn btn-primary d-flex justify-content-end"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
