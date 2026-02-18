import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Kernsite from './pages/KernSite'
import Omniportal from './projects/Omniportal'
import Kadiz from './projects/Kadiz'
import Spendzy from './projects/Spendzy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Kernsite />} />
        <Route path="/projects/Omniportal" element={<Omniportal />} />
        <Route path="/projects/kadiz" element={<Kadiz />} />
        <Route path="/projects/Spendzy" element={<Spendzy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App