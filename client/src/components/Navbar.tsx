import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FaGithub, FaLinkedinIn, FaDiscord, FaBars, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

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
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ];
  
  const pageLinks = [
    { path: "/blog", label: "Blog" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm dark:bg-slate-900" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <nav className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center mr-2">
                  <span className="font-heading font-bold text-lg text-white">S</span>
                </div>
                <span className="font-heading font-medium text-xl text-gray-900 dark:text-white">sentinel</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-body text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            {pageLinks.map((link) => (
              <div 
                key={link.path} 
                className="font-body text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors cursor-pointer"
                onClick={() => window.location.href = link.path}
              >
                {link.label}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Log In
            </button>
            <button className="btn-primary px-5 py-2 rounded-md">
              Register
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              className="ml-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? 
                <FaTimes className="text-xl text-gray-900 dark:text-white" /> : 
                <FaBars className="text-xl text-gray-900 dark:text-white" />
              }
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white dark:bg-slate-900 py-4 px-6 space-y-4 transition-all duration-300 border-t border-gray-100 dark:border-gray-800",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="block w-full text-left font-body text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium py-2"
          >
            {link.label}
          </button>
        ))}
        {pageLinks.map((link) => (
          <div 
            key={link.path} 
            className="block w-full text-left font-body text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium py-2 cursor-pointer"
            onClick={() => window.location.href = link.path}
          >
            {link.label}
          </div>
        ))}
        <div className="flex flex-col pt-4 space-y-3 border-t border-gray-100 dark:border-gray-800">
          <button className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors w-full text-left py-2">
            Log In
          </button>
          <button className="btn-primary px-5 py-2 rounded-md">
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
