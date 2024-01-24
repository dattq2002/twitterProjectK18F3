import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { isEmpty } from 'lodash'
import { ObjectId } from 'mongodb'
import { MediaType, TweetAudience, TweetType, UserVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { TWEETS_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { TokenPayload } from '~/models/requests/User.request'
import Tweet from '~/models/schemas/Tweet.schemas'
import databaseService from '~/services/database.services'
import { numberEnumToArray } from '~/utils/commons'
import { wrapAsync } from '~/utils/handlers'
import { validate } from '~/utils/validation'

const tweetTypes = numberEnumToArray(TweetType) //kq có dạng [0, 1, 2, 3]
const tweetAudiences = numberEnumToArray(TweetAudience) //kq có dạng [0, 1]
const mediaTypes = numberEnumToArray(MediaType) //kq có dạng [0, 1]

export const createTweetValidator = validate(
  checkSchema(
    {
      type: {
        isIn: {
          options: [tweetTypes], //doc bảo là phải truyền [[0,1,2,3]]
          errorMessage: TWEETS_MESSAGES.INVALID_TYPE
        }
      },
      audience: {
        isIn: {
          options: [tweetAudiences],
          errorMessage: TWEETS_MESSAGES.INVALID_AUDIENCE
        }
      },
      parent_id: {
        custom: {
          options: (value, { req }) => {
            const type = req.body.type as TweetType
            //nếu `type` là `retweet` , `comment` , `quotetweet` thì `parent_id` phải là `tweet_id` của tweet cha
            if (
              [TweetType.Retweet, TweetType.Comment, TweetType.QuoteTweet].includes(type) &&
              !ObjectId.isValid(value)
            ) {
              throw new Error(TWEETS_MESSAGES.PARENT_ID_MUST_BE_A_VALID_TWEET_ID)
            }
            // nếu `type` là `tweet` thì `parent_id` phải là `null`
            if (type == TweetType.Tweet && value != null) {
              throw new Error(TWEETS_MESSAGES.PARENT_ID_MUST_BE_NULL)
            }
            //oke thì trả về true
            return true
          }
        }
      },
      content: {
        isString: true,
        custom: {
          options: (value, { req }) => {
            const type = req.body.type as TweetType
            const mentions = req.body as string[] //không dùng destructuring vì không định nghĩa kiểu dữ liệu được
            const hashtags = req.body as string[]
            //nếu `type` là `tweet` , `comment` , `quotetweet` và không có mention hay hashtag thì `content` phải là string và không được rỗng
            if (
              [TweetType.Tweet, TweetType.Comment, TweetType.QuoteTweet].includes(type) &&
              isEmpty(mentions) &&
              isEmpty(hashtags) &&
              value.trim() == ''
            ) {
              //isEmpty() của lodash
              throw new Error(TWEETS_MESSAGES.CONTENT_MUST_BE_A_NON_EMPTY_STRING)
            }
            // nếu `type` là `retweet` thì `content` phải là `''`
            if (type == TweetType.Retweet && value != '') {
              throw new Error(TWEETS_MESSAGES.CONTENT_MUST_BE_EMPTY_STRING)
            }
            //oke thì trả về true
            return true
          }
        }
      },
      hashtags: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            //yêu cầu mỗi phần tử trong array phải là string
            if (value.some((item: any) => typeof item !== 'string')) {
              throw new Error(TWEETS_MESSAGES.HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING)
            }
            //oke thì trả về true
            return true
          }
        }
      },
      mentions: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            //yêu cầu mỗi phần tử trong array phải là user_id
            if (value.some((item: any) => !ObjectId.isValid(item))) {
              throw new Error(TWEETS_MESSAGES.MENTIONS_MUST_BE_AN_ARRAY_OF_user_id)
            }
            //oke thì trả về true
            return true
          }
        }
      },
      medias: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            //yêu cầu mỗi phần tử trong array phải là Media Object
            if (
              value.some((item: any) => {
                return typeof item.url !== 'string' || !mediaTypes.includes(item.type)
              })
            ) {
              throw new Error(TWEETS_MESSAGES.MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT)
            }
            //oke thì trả về true
            return true
          }
        }
      }
    },

    ['body']
  )
)

export const tweetIdValidator = validate(
  checkSchema(
    {
      tweet_id: {
        custom: {
          options: async (value, { req }) => {
            //nếu tweet_id không phải objectId thì báo lỗi
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST, //400
                message: TWEETS_MESSAGES.INVALID_TWEET_ID //thêm trong messages.ts
              })
            }

            //nếu tweet_id không tồn tại thì báo lỗi
            const tweet = await databaseService.tweets.findOne({
              _id: new ObjectId(value)
            })
            if (!tweet) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND, //404
                message: TWEETS_MESSAGES.TWEET_NOT_FOUND //thêm trong messages.ts
              }) //thêm trong messages.ts
            }
            ;(req as Request).tweet = tweet //lưu tweet vào req để dùng ở bước sau
            return true
          }
        }
      }
    },
    ['params', 'body']
  )
)
//vì hàm này mình truy cập vào database nên sẽ dùng async await, nếu phát sinh lỗi phải dùng try catch
//nếu không thích dùng trycatch có thể bọc cả hàm vào wrapAsync
export const audienceValidator = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tweet = req.tweet as Tweet
  //nếu bài tweet này là TwitterCircle thì mới hiểm tra user có đc xem hay k, còn là everyone thì k cần
  if (tweet.audience == TweetAudience.TwitterCircle) {
    //kiểm tra người xem tweet này đã đăng nhập chưa
    //nếu chưa đăng nhập thì sẽ không có req.decoded_authorization
    if (!req.decoded_authorization) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED, //401
        message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED //thêm trong messages.ts
      })
    }
    //lấy user_id của người xem tweet này
    const { user_id } = req.decoded_authorization as TokenPayload
    //kiểm tra xem người đăng tweet có bị banned không?
    const authorUser = await databaseService.users.findOne({
      _id: new ObjectId(tweet.user_id) //user_id này là của tweet, tức là của tác giả bài đăng
    })
    //nếu không có authorUser hoặc authorUser bị banned thì res 404
    //thì ta sẽ báo rằng bài đăng này không tồn tại nữa và không cho xem
    if (!authorUser || authorUser.verify == UserVerifyStatus.Banned) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND, //404
        message: TWEETS_MESSAGES.TWEET_NOT_FOUND //thêm trong messages.ts
      })
    }
    //kiểm tra xem user có nằm trong twitter_circle của authorUser hay không
    const isInTwitterCircle = authorUser.twitter_circle.some((user_circle_id) => user_circle_id.equals(user_id)) //equals là method có sẵn của object
    //nếu không nằm trong twitter_circle của authorUser và không phải tác giả
    if (!isInTwitterCircle && !authorUser._id.equals(user_id)) {
      //ném res 403
      throw new ErrorWithStatus({
        status: HTTP_STATUS.FORBIDDEN, //403
        message: TWEETS_MESSAGES.TWEET_IS_NOT_PUBLIC //thêm trong messages.ts
      })
    }
  }
  next()
})
