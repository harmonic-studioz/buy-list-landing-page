import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import './Hover.css'
import 'aos/dist/aos.css'
import 'animate.css'
import AOS from 'aos'
import Landing from './pages/Landing/Landing'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
const App = () => {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  )
}

export default App
