import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaGithub, FaLinkedinIn, FaTwitter, FaDiscord, FaDribbble } from "react-icons/fa";
import GlassCard from "@/components/ui/glass-card";
import { apiRequest } from "@/lib/queryClient";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // In a real implementation, this would send to an API
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-primary/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="font-['Montserrat'] text-sm uppercase tracking-widest text-accent">Contact</span>
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl md:text-5xl mt-2">
            Let's Create <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Interested in working together? Reach out and let's discuss your project.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <GlassCard className="p-8">
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-secondary/30 focus:border-accent focus:ring focus:ring-accent/20 transition-all outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-secondary/30 focus:border-accent focus:ring focus:ring-accent/20 transition-all outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-secondary/30 focus:border-accent focus:ring focus:ring-accent/20 transition-all outline-none"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-secondary/30 focus:border-accent focus:ring focus:ring-accent/20 transition-all outline-none"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="text-red-500 text-sm">{submitError}</div>
                )}
                
                {submitSuccess && (
                  <div className="text-green-500 text-sm">Message sent successfully! I'll get back to you soon.</div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hover-trigger w-full px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-accent text-white font-semibold transition-all hover:opacity-90 shadow-lg shadow-accent/20 disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </GlassCard>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Connect With Me</h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-medium text-lg mb-1">Email</h4>
                  <a href="mailto:contact@example.com" className="hover-trigger text-accent hover:underline">
                    contact@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-medium text-lg mb-1">Location</h4>
                  <p className="text-white/90">San Francisco, California</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <FaClock />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-medium text-lg mb-1">Availability</h4>
                  <p className="text-white/90">Open for freelance projects and consulting</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-12">
              <h4 className="font-['Space_Grotesk'] font-medium text-lg mb-4">Social Profiles</h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger w-12 h-12 rounded-lg backdrop-blur-md bg-primary/30 flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger w-12 h-12 rounded-lg backdrop-blur-md bg-primary/30 flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger w-12 h-12 rounded-lg backdrop-blur-md bg-primary/30 flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a 
                  href="https://discord.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger w-12 h-12 rounded-lg backdrop-blur-md bg-primary/30 flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10"
                  aria-label="Discord"
                >
                  <FaDiscord className="text-xl" />
                </a>
                <a 
                  href="https://dribbble.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger w-12 h-12 rounded-lg backdrop-blur-md bg-primary/30 flex items-center justify-center text-white hover:text-accent transition-colors border border-white/10"
                  aria-label="Dribbble"
                >
                  <FaDribbble className="text-xl" />
                </a>
              </div>
            </div>
            
            {/* CTA Card */}
            <div className="mt-12">
              <GlassCard className="p-6 border border-accent/30" glowEffect>
                <h4 className="font-['Space_Grotesk'] font-bold text-xl mb-3">Ready to get started?</h4>
                <p className="mb-4 text-white/90">
                  Book a free 30-minute consultation to discuss your project needs.
                </p>
                <a 
                  href="#" 
                  className="hover-trigger inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-accent text-white font-semibold transition-all hover:opacity-90"
                >
                  Schedule a Call
                </a>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 -right-40 w-80 h-80 bg-highlight/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
};

export default Contact;
