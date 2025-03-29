import { FaGithub, FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "wouter";

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

  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="font-heading font-bold text-lg text-white">S</span>
              </div>
              <span className="font-heading font-medium text-xl text-gray-900 dark:text-white">sentinel</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-body text-sm">
              Advanced cybersecurity research and modern digital design solutions for forward-thinking businesses.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-5">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection("home")} className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("projects")} className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Projects
                </button>
              </li>
              <li>
                <Link href="/blog" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Team
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-5">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Security Audits
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Penetration Testing
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Vulnerability Research
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  UX/UI Design
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Brand Identity
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-5">Contact Us</h3>
            <ul className="space-y-3">
              <li className="font-body text-gray-600 dark:text-gray-400">
                New York City, NY 10001
              </li>
              <li>
                <a href="mailto:hello@sentinel.com" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  hello@sentinel.com
                </a>
              </li>
              <li>
                <a href="tel:+12125551234" className="font-body text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  +1 (212) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {year} Sentinel Security & Design. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
