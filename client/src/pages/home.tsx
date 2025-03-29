import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
