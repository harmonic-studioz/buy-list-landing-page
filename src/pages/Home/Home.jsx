import './Home.scss'
import NavBar from '../../components/NavBar/NavBar'
import Container from '../../components/Container/Container'
import Hero from './components/Hero3'
import Spots from './components/Spots'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <NavBar className="navContent" />
      <Hero />
      <Container>
        <Spots />
        <Footer />
      </Container>
    </>
  )
}

export default Home
