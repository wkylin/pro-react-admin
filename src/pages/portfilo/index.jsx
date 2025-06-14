import Navbar from './components/navbar.jsx'
import About from './components/about.jsx'
import Info from './components/info.jsx'
import Stack from './components/stack.jsx'
import Project from './components/project.jsx'
import Contact from './components/contact.jsx'

const MyPortfilo = () => {
  return (
    <div className='relative w-full scroll-smooth'>
      <Navbar />
      <main className='relative z-10 pt-16 text-white'>
        <section id='about' className='scroll-mt-20'>
          <About />
        </section>

        <section id='info' className='scroll-mt-20'>
          <Info />
        </section>
        <section id='stack' className='scroll-mt-20'>
          <Stack />
        </section>
        <section id='project' className='scroll-mt-20'>
          <Project />
        </section>

        <section id='contact' className='scroll-mt-20'>
          <Contact />
        </section>
      </main>
    </div>
  )
}

export default MyPortfilo
