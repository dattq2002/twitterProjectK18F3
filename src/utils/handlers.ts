import { NextFunction, Request, RequestHandler, Response } from 'express'

//hàm này tạo ra để bọc những hàm async không có try catch
//để bắt lỗi
export const wrapAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
