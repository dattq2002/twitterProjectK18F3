import usersRouter from './routes/users.routes'
import express from 'express'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import { runRedis } from '~/utils/redis'

config()
const app = express()

const port = process.env.PORT || 4000
initFolder()
databaseService.connect().then(() => {
  databaseService.indexUsers()
})
runRedis()
// localhost:3000/
app.get('/', (req, res) => {
  res.send('hello world')
})
// localhost:3000/users
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
//cách 1:
// app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
//cách 2:
app.use('/static', staticRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên port ${port}`)
})
