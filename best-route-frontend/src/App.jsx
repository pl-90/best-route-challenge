import { Routes, Route, useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Clients from './pages/Clients'

function App() {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </NextUIProvider>
  )
}

export default App
