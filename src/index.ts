import usersRouter from './routes/users.routes'
import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
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
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên port ${port}`)
})
