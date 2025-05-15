import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import { StrictMode } from 'react'
import MemebrsTrainersPage from './pages/MemebrsTrainersPage'
import Landing from './pages/Landing'
import AuthProvider from './Context/authContext'
import IndivisualMember from './pages/IndivisualMember'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Landing />} />
          <Route path='/memebrs&trainers' element={<MemebrsTrainersPage />} />
          <Route path='/member/:memberID' element={<IndivisualMember />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  </StrictMode>,
)
