import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

export const connectToDatabase = async () => {
  const client = new pg.Client(dbConfig)
  await client.connect()
  return client
}
