import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import AboutText from '../components/About/AboutText';
import Gallery from '../components/Gallery/Gallery';
import Timeline from '../components/Timeline/Timeline';
import Projects from '../components/Projects/Projects';
import Testimonials from '../components/Testimonials/Testimonials';
import Faq from '../components/Faq/Faq';
import Partners from '../components/Partners/Partners';
import GalleryTeaser from '../components/GalleryTeaser/GalleryTeaser';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutText />
        <Gallery />
        <Timeline />
        <Projects />
        <Testimonials />
        <Faq />
        <Partners />
        <GalleryTeaser />
      </main>
      <Footer />
    </>
  );
}
