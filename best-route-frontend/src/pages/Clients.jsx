import {
  Card,
  CardBody,
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios/axios'
import Map from '../componts/Map'

const Clients = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')

  const [route, setRoute] = useState([])

  const getAllClients = async () => {
    try {
      const result = await axiosInstance.get(`/api/clients`, {
        params: { search: search }
      })

      setClients(result.data.clients)
    } catch (error) {
      console.error('Error!', error)
    }
  }

  const calculateRoute = async () => {
    try {
      const result = await axiosInstance.get(`/api/company/calculate-route`)

      setRoute(result.data.route)
    } catch (error) {
      console.error('Error!', error)
    }
  }

  useEffect(() => {
    getAllClients()
  }, [search])

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    coord_x: '',
    coord_y: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }))
  }

  const handleDeleteClient = async (clientId) => {
    try {
      // Request to delete client
      await axiosInstance.delete(`/api/clients/delete/${clientId}`)

      console.log('Success!')

      getAllClients()
    } catch (error) {
      console.error('Error!', error)
    }
  }

  const handleAddClient = async () => {
    try {
      // Post to add clients
      await axiosInstance.post('/api/clients/store', newClient)

      // Clear form
      setNewClient({
        name: '',
        email: '',
        phone: '',
        coord_x: '',
        coord_y: ''
      })

      console.log('Success!')

      getAllClients()
    } catch (error) {
      console.error('Error!', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
          Clients Dashboard
        </h1>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8">
        {/* First Card */}
        <Card className="lg:w-2/3 sm:w-90 mx-auto">
          <CardBody>
            <div className="flex w-full flex-wrap gap-4 items-center justify-center">
              <p>Add new client.</p>
              <Input
                type="text"
                label="Name"
                name="name"
                value={newClient.name}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                value={newClient.email}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                label="Phone"
                name="phone"
                value={newClient.phone}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                label="Coordinate X"
                name="coord_x"
                value={newClient.coord_x}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                label="Coordinate Y"
                name="coord_y"
                value={newClient.coord_y}
                onChange={handleInputChange}
              />
              <Button color="secondary" onClick={handleAddClient}>
                Add Client
              </Button>
            </div>
          </CardBody>
        </Card>

        {route.length > 0 && (
          <Card className="lg:w-2/3 sm:w-90 mx-auto">
            <CardBody>
              <div className="flex w-full flex-wrap gap-4 items-center justify-center">
                <p>Map</p>
              </div>
              <div className="flex w-full flex-wrap gap-4 items-center justify-center">
                <Map points={route}></Map>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Second Card */}
        <Card className="lg:w-2/3 sm:w-90 mx-auto">
          <CardBody>
            <div className="flex w-full flex-wrap gap-4 items-center justify-center">
              <Input
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                type="text"
                label="Search"
              />
              <Button
                color="secondary"
                onPress={() => {
                  onOpen()
                  calculateRoute()
                }}
              >
                Calculate Route
              </Button>
              <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Best Route
                      </ModalHeader>
                      <ModalBody>
                        <Table aria-label="Example empty table">
                          <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>COORDINATE X</TableColumn>
                            <TableColumn>COORDINATE Y</TableColumn>
                          </TableHeader>
                          <TableBody emptyContent={'No rows to display.'}>
                            {route.map((route, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {route.name ? route.name : 'Your Company'}
                                </TableCell>
                                <TableCell>{route.coord_x}</TableCell>
                                <TableCell>{route.coord_y}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            <Table aria-label="Example empty table">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>PHONE</TableColumn>
                <TableColumn>COORDINATE X</TableColumn>
                <TableColumn>COORDINATE Y</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent={'No rows to display.'}>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.coord_x}</TableCell>
                    <TableCell>{client.coord_y}</TableCell>
                    <TableCell>
                      <Button
                        color="danger"
                        onPress={() => {
                          handleDeleteClient(client.id)
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Clients
