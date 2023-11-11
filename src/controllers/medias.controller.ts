import { Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadImage(req)
  res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}
export const serveImageController = async (req: Request, res: Response) => {
  const { namefile } = req.params
  res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, namefile), (err) => {
    if (err) {
      res.status((err as any).status).send('not found image')
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadVideo(req)
  res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveVideoController = async (req: Request, res: Response) => {
  const { namefile } = req.params
  res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, namefile), (err) => {
    if (err) {
      res.status((err as any).status).send('not found image')
    }
  })
}
