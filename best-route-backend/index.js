import express from 'express'
import cors from 'cors';
import companyRouter from './routes/companyRoutes.js'
import clientsRouter from './routes/clientsRoutes.js'

const app = express()
app.use(express.json())
app.use(cors());

app.use('/api/company', companyRouter)
app.use('/api/clients', clientsRouter)

const PORT = 3333
app.listen(PORT, () => {
  console.log(`server on ${PORT}!`)
})
