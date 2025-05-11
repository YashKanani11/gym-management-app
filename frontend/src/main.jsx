import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import { StrictMode } from 'react'
import BG from './Components/BG'
import MemebrsTrainersPage from './pages/MemebrsTrainersPage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<BG />} />
        <Route path='/memebrs&trainers' element={<MemebrsTrainersPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
