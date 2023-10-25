import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.request'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'

export const loginController = async (req: Request, res: Response) => {
  //nếu nó vào dc đây , tức là đã qua được các bước validate và đăng nhập thành công
  const { user }: any = req
  const user_id = user._id //ObjectId
  //server phải tạo ra access token và refresh token để đưa về cho client
  const result = await usersService.login(user_id.toString()) //
  return res.json({
    message: 'Login successfully',
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)

  return res.json({
    message: 'Register successfully',
    result
  })
}
