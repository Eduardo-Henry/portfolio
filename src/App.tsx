import './styles.css'
import Header from './components/organisms/Header'
import Hero from './components/organisms/Hero'
import ImageParallax from './components/organisms/ImageParallax'
import About from './components/organisms/About'
import Carousel from './components/organisms/Carousel'
import Section from './components/molecules/Section'
import Works from './components/organisms/Works'
import Process from './components/organisms/Process'
import Contact from './components/organisms/Contact'
import ProjectCard from './components/molecules/ProjectCard'
import Footer from './components/organisms/Footer'
import SplashScreen from './components/molecules/SplashScreen'

export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  repo?: string
}

const projects: Project[] = [
  {
    title: 'Minimal Blog',
    description: 'A clean, simple blog built with React.',
    tags: ['React', 'CSS'],
    link: '#',
    repo: '#',
  },
  {
    title: 'Portfolio Theme',
    description: 'A lightweight portfolio theme focusing on typography.',
    tags: ['Design', 'Vite'],
    link: '#',
    repo: '#',
  },
  {
    title: 'Landing Page',
    description: 'Minimal landing page with accessible components.',
    tags: ['HTML', 'Accessibility'],
    link: '#',
    repo: '#',
  },
]

export default function App() {
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SplashScreen />
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <ImageParallax />
        <About />
        <Carousel />
        <Works />

        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
