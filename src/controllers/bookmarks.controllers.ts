import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BOOKMARK_MESSAGES } from '~/constants/messages'
import { BookmarkTweetReqBody } from '~/models/requests/Bookmark.request'
import { TokenPayload } from '~/models/requests/User.request'
import bookmarksService from '~/services/bookmarks.services'

export const bookmarkTweetController = async (
  req: Request<ParamsDictionary, any, BookmarkTweetReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await bookmarksService.createBookmark(user_id, tweet_id) // bookmarksService.createBookmark chưa làm
  return res.json({
    message: BOOKMARK_MESSAGES.BOOKMARK_SUCCESSFULLY, //thêm BOOKMARK_SUCCESSFULLY : 'Bookmark successfully' vào messages.ts
    result
  })
}

export const unbookmarkTweetController = async (
  req: Request<ParamsDictionary, any, any>, //any vì delete thì  k dùng body nên k có định nghĩa
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.params //k phải req.body vì tweet_id nằm trong url
  await bookmarksService.unbookmarkTweet(user_id, tweet_id) // unbookmarkTweet chưa làm
  return res.json({
    message: BOOKMARK_MESSAGES.UNBOOKMARK_SUCCESSFULLY //thêm UNBOOKMARK_SUCCESSFULLY: 'Unbookmark successfully' vào messages.ts
  })
}
