

import { Navbar } from './components/Navbar'
import { ParticleBackground } from './components/ParticleBackground'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

function App() {


  return (
    <div className="relative gradient text-white">
    <ParticleBackground/>

    <Navbar/>
    <Hero/>
    <About/>
    <Skills/>
    <Projects/>
    <Experience/>
    <Contact/>
    <Footer/>
    </div>
  )
}

export default App
