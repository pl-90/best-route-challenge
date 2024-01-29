import { Router } from 'express'
import ClientsController from '../src/controllers/ClientsController.js'

const clientsRouter = Router()

clientsRouter.get('/', ClientsController.index)
clientsRouter.get('/:clientId', ClientsController.show)
clientsRouter.delete('/delete/:clientId', ClientsController.destroy)

clientsRouter.post('/store', ClientsController.store)

export default clientsRouter
