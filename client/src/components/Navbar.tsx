import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FaGithub, FaLinkedinIn, FaDiscord, FaBars, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];
  
  const pageLinks = [
    { path: "/blog", label: "Blog" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled && "shadow-lg"
      )}
    >
      <nav className="backdrop-blur-md bg-primary/50 border-b border-white/10 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <span className="font-['Space_Grotesk'] font-bold text-2xl text-text">S</span>
          </div>
          <span className="font-['Space_Grotesk'] font-medium text-xl">Sentinel</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover-trigger hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
          {pageLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="hover-trigger hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-trigger text-text hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-trigger text-text hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-xl" />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-trigger text-text hover:text-accent transition-colors"
            aria-label="Discord"
          >
            <FaDiscord className="text-xl" />
          </a>
          <button
            className="md:hidden hover-trigger"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden backdrop-blur-md bg-primary/50 py-4 px-6 space-y-4 transition-all duration-300 border-b border-white/10",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="hover-trigger block w-full text-left hover:text-accent transition-colors"
          >
            {link.label}
          </button>
        ))}
        {pageLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="hover-trigger block w-full text-left hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
