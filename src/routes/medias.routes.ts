import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controller'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const mediasRouter = Router()

mediasRouter.post('/upload-image', accessTokenValidator, wrapAsync(uploadImageController))

export default mediasRouter
