import { Router } from 'express'
import CompanyController from '../src/controllers/CompanyController.js'

const companyRouter = Router()

companyRouter.get('/calculate-route', CompanyController.calculateRoute)

export default companyRouter
