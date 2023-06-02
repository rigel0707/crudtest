import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'hotdog123',
  database: 'students',
})

db.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error)
  } else {
    console.log('Connected to the database!')
  }
})

app.use(express.json())
app.use(cors())

app.get('/users', (req, res) => {
  const getUserList = 'SELECT * FROM students.users;'

  db.query(getUserList, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post('/users', (req, res) => {
  const postUserList = 'INSERT INTO users (`username`, `password`) VALUES (?)'
  const values = [req.body.username, req.body.password]

  db.query(postUserList, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.get('/list', (req, res) => {
  const getStudentList = 'SELECT * FROM students.candidates;'

  db.query(getStudentList, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post('/list', (req, res) => {
  const postStudentList =
    'INSERT INTO candidates (`name`, `age`, `program`) VALUES (?)'
  const values = [req.body.name, req.body.age, req.body.program]

  db.query(postStudentList, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Student Added!')
  })
})

app.delete('/list/:id', (req, res) => {
  const studentId = req.params.id
  const deleteStudent = 'DELETE FROM candidates WHERE id = ?'

  db.query(deleteStudent, [studentId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Student Deleted!')
  })
})

app.get('/list/:id', (req, res) => {
  const studentId = req.params.id
  const viewStudent = 'SELECT * FROM candidates WHERE id = ?'

  db.query(viewStudent, [studentId], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.put('/list/:id', (req, res) => {
  const studentId = req.params.id
  const { name, age, program } = req.body
  const updateStudent =
    'UPDATE candidates SET name = ?, age = ?, program = ? WHERE id = ?'

  db.query(updateStudent, [name, age, program, studentId], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post('/register', (req, res) => {
  const { username, password } = req.body
  const regUser =
    "INSERT INTO users (`username`, `password`, `role`) VALUES (?, ?, 'student');"
  const values = [username, password]

  db.query(regUser, values, (err, data) => {
    if (err) {
      console.error(err)
      return res.json({ message: 'Error occurred!' })
    }
    return res.status(200).json({ message: 'Registration successful!' })
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const getUser = 'SELECT * FROM students.users WHERE username = ?'

  db.query(getUser, [username], (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (data.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const user = data[0]
    const role = user.role

    let token
    if (role === 'admin') {
      token = jwt.sign({ id: user._id, role: 'admin' }, 'secret')
    } else if (role === 'student') {
      token = jwt.sign({ id: user._id, role: 'student' }, 'secret')
    } else {
      return res.status(403).json({ error: 'Access forbidden' })
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    return res.status(200).json({ message: 'Login successful', user, token })
  })
})

const port = 5000

app.listen(port, () => {
  console.log(`Connected to port ${port}!`)
})
