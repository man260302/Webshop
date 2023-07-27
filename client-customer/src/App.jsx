import { Routes, Route } from 'react-router-dom'
import Index from './Components/index.jsx'
import './App.scss'

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Index />}/>
    </Routes>
  )
}

export default App
