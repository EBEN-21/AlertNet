import { useState } from 'react'
import Homepage from './pages/Homepage/Homepage'
import { Routes, Route } from 'react-router-dom'
import ReportPage from './pages/Homepage/ReportPage'



function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/report' element={<ReportPage />} />
      </Routes>
     
    </div>
  )
}


export default App
