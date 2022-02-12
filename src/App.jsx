import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import './Hover.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Login'
const App = () => {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </Router>
  )
}

export default App
