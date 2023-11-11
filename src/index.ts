import usersRouter from './routes/users.routes'
import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'

config()
const app = express()
app.use(express.json())
const port = process.env.PORT || 4000
initFolder()
databaseService.connect().catch(console.dir)
// localhost:3000/
app.get('/', (req, res) => {
  res.send('hello world')
})
// localhost:3000/users
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
//cách 1:
// app.use('/static', express.static(UPLOAD_IMAGE_DIR))
app.use('/static', staticRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên port ${port}`)
})
