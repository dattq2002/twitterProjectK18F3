import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { TweetRequestBody } from '~/models/requests/Tweet.request'
import { TokenPayload } from '~/models/requests/User.request'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const body = req.body // và đăng cái gì
  const result = await tweetsService.createTweet(user_id, body)
  return res.status(200).json({
    message: TWEETS_MESSAGES.TWEET_CREATED_SUCCESSFULLY,
    result
  })
}
