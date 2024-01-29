import Client from '../database/models/Client.js'
import bestRoute from '../utils/bestRoute.js'

const CompanyController = {
  async calculateRoute(req, res) {
    const clients = await Client.getAll()
    const ordenedByDistance = await bestRoute.calculate(
      { coord_x: 0, coord_y: 0 },
      clients
    )

    res.json({ route: ordenedByDistance })
  }
}

export default CompanyController
