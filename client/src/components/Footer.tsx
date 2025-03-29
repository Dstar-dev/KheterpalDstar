import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <span className="font-['Space_Grotesk'] font-bold text-2xl text-white">S</span>
            </div>
            <span className="font-['Space_Grotesk'] font-medium text-xl">Sentinel</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <button onClick={() => scrollToSection("home")} className="hover-trigger hover:text-accent transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="hover-trigger hover:text-accent transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover-trigger hover:text-accent transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection("skills")} className="hover-trigger hover:text-accent transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover-trigger hover:text-accent transition-colors">
              Contact
            </button>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger w-10 h-10 rounded-lg backdrop-blur-md bg-primary/50 flex items-center justify-center text-white hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger w-10 h-10 rounded-lg backdrop-blur-md bg-primary/50 flex items-center justify-center text-white hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger w-10 h-10 rounded-lg backdrop-blur-md bg-primary/50 flex items-center justify-center text-white hover:text-accent transition-colors"
              aria-label="Discord"
            >
              <FaDiscord />
            </a>
          </div>
        </div>

        <div className="border-t border-primary/30 mt-12 pt-8 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Sentinel Security & Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
