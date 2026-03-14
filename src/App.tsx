import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Kernsite from './pages/KernSite'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Kernsite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App