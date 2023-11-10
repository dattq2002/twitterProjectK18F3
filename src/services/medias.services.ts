import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadImage } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { Media } from '~/models/Other'
import { MediaType } from '~/constants/enums'
class MediasService {
  async uploadImage(req: Request) {
    //check and lưu ảnh vào trong uploads/temp
    const files = await handleUploadImage(req)
    //xử lý file bằng sharp giúp tối ưu hóa ảnh
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newFilename = getNameFromFullname(file.newFilename) + '.jpg'
        const newPath = UPLOAD_DIR + '/' + newFilename
        const info = await sharp(file.filepath).jpeg().toFile(newPath)
        //xóa file ảnh trong uploads/temp
        fs.unlinkSync(file.filepath)

        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newFilename}`
            : `http://localhost:${process.env.PORT}/static/image/${newFilename}`,
          type: MediaType.Image
        }
      })
    )
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
