import Client from '../database/models/Client.js'

const ClientsController = {
  async index(req, res) {
    const { search } = req.query

    try {
      const allClients = await Client.getAll(search)
      res.json({clients: allClients})
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error!' })
    }
  },

  async show(req, res) {
    try {
      const { clientId } = req.params

      if (!clientId) {
        return res
          .status(400)
          .json({ error: 'Id is required!' })
      }

      const client = await Client.findOne(clientId)

      if (!client)
        return res.status(404).json({ error: 'Client not found!' })

      res.json({ client: client })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  },

  async store(req, res) {
    try {
      const { name, email, phone, coord_x, coord_y } = req.body

      if (!name || !email || !phone || !coord_x || !coord_y) {
        return res
          .status(400)
          .json({ error: 'All fields are required!' })
      }

      const newClientData = {
        name,
        email,
        phone,
        coord_x,
        coord_y
      }

      await Client.create(newClientData)

      res.status(201).json({
        success: 'Client created!'
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  },

  async destroy(req, res) {
    try {
      const { clientId } = req.params

      if (!clientId) {
        return res
          .status(400)
          .json({ error: 'Id is required!' })
      }

      const client = await Client.findOne(clientId)

      if (!client)
        return res.status(404).json({ error: 'Client not found' })

      await Client.delete(clientId)

      res.json({ success: 'Client deleted!' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error!' })
    }
  }
}

export default ClientsController
