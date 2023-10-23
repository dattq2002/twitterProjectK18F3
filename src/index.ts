import usersRouter from './routes/users.routes'
import express from 'express'
import databaseService from './services/database.services'
const app = express()
app.use(express.json())
const port = 3000
databaseService.connect().catch(console.dir)
// localhost:3000/
app.get('/', (req, res) => {
  res.send('hello world')
})
// localhost:3000/users
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên port ${port}`)
})
