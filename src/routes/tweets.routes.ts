import { Router } from 'express'
import { createTweetController, getTweetController } from '~/controllers/tweets.controllers'
import { audienceValidator, createTweetValidator, tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const tweetsRouter = Router()
/*
des: create tweets
method: post
headers: {Authorization: Bearer <access_token>}
body: TweetRequestBody

khi muốn đăng một bài tweet thì client sẽ gữi lên server một request có body  như 
TweetRequestBody(ta chưa làm) kém theo access_token để biết ai là người đăng bài

*/

tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapAsync(createTweetController)
)

/*
  des: get tweets detail
  path: / nghĩa là localhost:4000/tweets thôi
  headers: {Authorization?: Bearer <access_token>}
  method: get
  */

tweetsRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapAsync(getTweetController)
)
//isUserLoggedInValidator là middleware kiểm tra xem người dùng đã đăng nhập chưa
//nếu chưa thì chỉ xem đc các tweet everyone
//nếu rồi thì middleware sẽ dùng lại accessTokenValidator, verifiedUserValidator từ đó biết
//user này có được phép xem tweet này hay không

//audienceValidator kiểm tra đối tượng có được phép xem tweet này hay không sau khi đã xác định ở bước trên

export default tweetsRouter
