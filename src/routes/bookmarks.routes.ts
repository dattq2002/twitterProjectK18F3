import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const bookmarksRouter = Router()
/*
    des: bookmark a tweets
    path: / nghĩa là localhost:4000/bookmarks thôi
    method: post
    headers: {Authorization: Bearer <access_token>}
    body: {tweet_id: string}
  */

bookmarksRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapAsync(bookmarkTweetController)
)

/*
des: delete a bookmarked tweets
path: /tweets/:tweet_id thêm /tweets/ để thân thiện với client khi sử dụng tránh hiểu lầm truyền user_id vào params
method: delete
headers: {Authorization: Bearer <access_token>}
body: null vì tweet_id nằm trong url
và delete thì ngta k cho truyền body


*/
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapAsync(unbookmarkTweetController)
)

export default bookmarksRouter
