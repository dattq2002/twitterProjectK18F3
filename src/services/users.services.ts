import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import { config } from 'dotenv'
config()

class UsersService {
  //viết hàm nhận vào user_id để bỏ vào payload tạo access token
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }
  //viết hàm nhận vào user_id để bỏ vào payload tạo refesh token
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, type: TokenType.RefeshToken },
      options: { expiresIn: process.env.REFESH_TOKEN_EXPIRE_IN }
    })
  }
  private signAccessTokenAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async checkEmailExists(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )

    //lay user_id từ user vừa tạo
    const user_id = result.insertedId.toString()
    const [access_token, refesh_token] = await this.signAccessTokenAndRefreshToken(user_id)
    return { access_token, refesh_token }
  }
  async login(user_id: string) {
    const [access_token, refesh_token] = await this.signAccessTokenAndRefreshToken(user_id)
    return { access_token, refesh_token }
  }
}

const usersService = new UsersService()
export default usersService
