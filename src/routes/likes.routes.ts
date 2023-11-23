import { Router } from 'express'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const likesRouter = Router()
/*
    des: like a tweets
    path: / nghĩa là localhost:4000/likes thôi
    method: post
    headers: {Authorization: Bearer <access_token>}
    body: {tweet_id: string}
  */

likesRouter.post('/', accessTokenValidator, verifiedUserValidator, tweetIdValidator, wrapAsync(likeTweetController)) //likeTweetController chưa làm

/*
des: unlike a tweets
path: /tweets/:tweet_id thêm /tweets/ để thân thiện với client khi sử dụng tránh hiểu lầm truyền user_id vào params
method: delete
headers: {Authorization: Bearer <access_token>}
body: null vì tweet_id nằm trong url
và delete thì ngta k cho truyền body


*/
likesRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapAsync(unlikeTweetController)
) //unlikeTweetController chưa làm
export default likesRouter
