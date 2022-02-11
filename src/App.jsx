import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './Hover.css'
import Home from './pages/Home/Home'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  )
}

export default App
