import './Home.scss'
import NavBar from '../../components/NavBar/NavBar'
import Container from '../../components/Container/Container'
import Hero from './components/Hero'
import Steps from './components/Steps'
import MiniHero from './components/MiniHero'
import FAQ from '../../components/FAQ/FAQ'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Hero />
        <Steps />
        <MiniHero />
        <FAQ />
        <Footer />
      </Container>
    </>
  )
}

export default Home
