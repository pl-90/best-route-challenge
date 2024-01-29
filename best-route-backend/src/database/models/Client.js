import { connectToDatabase } from '../../../config/database/postgresql.js'

const tableName = 'clients'

const Client = {
  // Get all clients
  async getAll(search = null) {
    const clientDb = await connectToDatabase()

    try {
      var query = `SELECT * FROM ${tableName}`

      if (search) {
        // make search query
        const whereQuery = ` WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR coord_x::text ILIKE $1 OR coord_y::text ILIKE $1`
        query += whereQuery

        const result = await clientDb.query(query, [`%${search}%`])
        return result.rows
      } else {
        const result = await clientDb.query(query)
        return result.rows
      }
    } catch (error) {
      throw error
    } finally {
      await clientDb.end()
    }
  },

  // Find 1 client by id
  async findOne(clientId) {
    const clientDb = await connectToDatabase()

    try {
      const query = `SELECT * FROM ${tableName} WHERE id = $1`

      const result = await clientDb.query(query, [clientId])

      return result.rows[0]
    } catch (error) {
      throw error
    } finally {
      await clientDb.end()
    }
  },

  // New client
  async create(newClientData) {
    const clientDb = await connectToDatabase()

    try {
      const { name, email, phone, coord_x, coord_y } = newClientData
      const query = `INSERT INTO ${tableName} (name, email, phone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5) RETURNING *`

      const result = await clientDb.query(query, [
        name,
        email,
        phone,
        coord_x,
        coord_y
      ])
      return result.rows[0]
    } catch (error) {
      throw error
    } finally {
      await clientDb.end()
    }
  },

  // Delete client
  async delete(clientId) {
    const clientDb = await connectToDatabase()

    try {
      const query = `DELETE FROM ${tableName} WHERE id = $1`

      const result = await clientDb.query(query, [clientId])
      return result.rows
    } catch (error) {
      throw error
    } finally {
      await clientDb.end()
    }
  }
}

export default Client
