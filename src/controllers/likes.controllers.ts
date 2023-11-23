import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LIKE_MESSAGES } from '~/constants/messages'
import { LikeTweetReqBody } from '~/models/requests/Like.request'
import { TokenPayload } from '~/models/requests/User.request'
import likesService from '~/services/likes.services'
export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await likesService.createLike(user_id, tweet_id) // likesService.createLike chưa làm
  return res.json({
    message: LIKE_MESSAGES.LIKE_SUCCESSFULLY, //thêm LIKE_SUCCESSFULLY : 'LIKE successfully' vào messages.ts
    result
  })
}

export const unlikeTweetController = async (
  req: Request<ParamsDictionary, any, any>, //any vì delete thì  k dùng body nên k có định nghĩa
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.params //k phải req.body vì tweet_id nằm trong url
  await likesService.unlikeTweet(user_id, tweet_id) // unlikeTweet chưa làm
  return res.json({
    message: LIKE_MESSAGES.UNLIKE_SUCCESSFULLY //thêm UNLIKE_SUCCESSFULLY: 'Unlike successfully' vào messages.ts
  })
}
