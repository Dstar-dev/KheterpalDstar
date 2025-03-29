import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import GlassCard from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaSearch, FaCalendarAlt, FaTag, FaEye, FaLock, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

// Blog post type definition
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: string;
  cveId?: string;
  severity?: 'Critical' | 'High' | 'Medium' | 'Low';
}

// Example blog data - cybersecurity posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "New Critical Vulnerability in Log4j Library (Log4Shell)",
    excerpt: "A serious zero-day vulnerability in the popular Log4j library allows attackers to execute arbitrary code remotely.",
    content: "The Apache Log4j vulnerability (CVE-2021-44228), also known as Log4Shell, represents one of the most significant cybersecurity threats in recent years. This zero-day vulnerability affects the popular Java logging library and allows attackers to execute arbitrary code by getting the application to log a specially crafted string...",
    date: "December 10, 2023",
    author: "Sarah Johnson",
    category: "Vulnerabilities",
    tags: ["Log4j", "Zero-day", "Remote Code Execution", "Java"],
    imageUrl: "https://images.unsplash.com/photo-1610986603166-f78428812d13",
    readTime: "7 min",
    cveId: "CVE-2021-44228",
    severity: "Critical"
  },
  {
    id: "2",
    title: "Rise in Ransomware Attacks Targeting Healthcare Sector",
    excerpt: "Healthcare organizations face increasing threats from sophisticated ransomware groups exploiting vulnerabilities in medical devices.",
    content: "Ransomware attacks against healthcare organizations have increased by 73% in the past year, with criminal groups specifically targeting vulnerabilities in connected medical devices and outdated hospital infrastructure...",
    date: "January 15, 2024",
    author: "Michael Chen",
    category: "Threat Intelligence",
    tags: ["Ransomware", "Healthcare", "Medical Devices", "Critical Infrastructure"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    readTime: "5 min",
    severity: "High"
  },
  {
    id: "3",
    title: "Critical Microsoft Exchange Server Vulnerabilities Patched",
    excerpt: "Microsoft releases emergency patches for Exchange Server vulnerabilities actively exploited in the wild.",
    content: "Microsoft has released emergency patches for multiple vulnerabilities in Exchange Server that were being actively exploited by a state-sponsored threat group. Organizations are urged to apply these patches immediately to prevent unauthorized access to email systems...",
    date: "February 3, 2024",
    author: "Emily Rodriguez",
    category: "Patching",
    tags: ["Microsoft Exchange", "Zero-day", "Email Security", "Patching"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    readTime: "4 min",
    cveId: "CVE-2023-36884",
    severity: "Critical"
  },
  {
    id: "4",
    title: "New Malware Campaign Targeting Finance Industry Through Phishing",
    excerpt: "Sophisticated phishing campaign delivers banking trojan through seemingly legitimate financial documents.",
    content: "A new malware campaign is specifically targeting the finance industry through highly convincing phishing emails that appear to contain legitimate financial documents. When opened, these documents deploy a sophisticated banking trojan designed to steal credentials and financial data...",
    date: "March 12, 2024",
    author: "David Park",
    category: "Malware",
    tags: ["Phishing", "Banking Trojan", "Finance", "Social Engineering"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    readTime: "6 min",
    severity: "High"
  },
  {
    id: "5",
    title: "AI-Powered Security Tools: The Future of Cyber Defense",
    excerpt: "How artificial intelligence is revolutionizing cybersecurity detection and response capabilities.",
    content: "As cyber threats grow in complexity and volume, organizations are turning to artificial intelligence to enhance their security posture. AI-powered security tools can detect patterns and anomalies that would be impossible for human analysts to identify in real-time...",
    date: "March 25, 2024",
    author: "Aisha Patel",
    category: "Trends",
    tags: ["Artificial Intelligence", "Machine Learning", "Security Tools", "Automation"],
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    readTime: "8 min"
  },
  {
    id: "6",
    title: "Critical Vulnerability in Popular NPM Package Affects Millions of Applications",
    excerpt: "Security researchers discover severe vulnerability in widely-used JavaScript library affecting web applications worldwide.",
    content: "A critical vulnerability has been discovered in a popular NPM package used by millions of web applications. The flaw could allow attackers to inject malicious code and potentially take control of affected applications...",
    date: "April 2, 2024",
    author: "Thomas Wong",
    category: "Vulnerabilities",
    tags: ["JavaScript", "NPM", "Supply Chain", "Web Security"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    readTime: "5 min",
    cveId: "CVE-2024-23812",
    severity: "Critical"
  }
];

// Define categories for filtering
const categories = ["All", "Vulnerabilities", "Threat Intelligence", "Malware", "Patching", "Trends"];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  
  // Filter posts based on category and search query
  useEffect(() => {
    let result = blogPosts;
    
    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter(post => post.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) || 
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(result);
  }, [activeCategory, searchQuery]);

  // Function to get severity badge color
  const getSeverityColor = (severity?: 'Critical' | 'High' | 'Medium' | 'Low') => {
    switch (severity) {
      case 'Critical': return 'bg-red-600 hover:bg-red-700';
      case 'High': return 'bg-orange-500 hover:bg-orange-600';
      case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-darkBg">
      {/* Header Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
                Security
              </span>{" "}
              News & Analysis
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Stay informed about the latest cybersecurity threats, vulnerabilities, and defensive strategies.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 rounded-full py-2 pl-10 pr-4 text-white/90 focus:outline-none focus:ring-2 focus:ring-accent border border-white/20"
                />
                <FaSearch className="absolute left-3 top-3 text-white/60" />
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: parseInt(post.id) * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Link href={`/blog/${post.id}`}>
                  <a className="block h-full">
                    <GlassCard className="overflow-hidden h-full flex flex-col">
                      {/* Featured Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div 
                          className="w-full h-full bg-cover bg-center transform transition-transform duration-500 hover:scale-110"
                          style={{ backgroundImage: `url(${post.imageUrl})` }}
                        />
                        {post.severity && (
                          <Badge className={`absolute top-3 right-3 ${getSeverityColor(post.severity)}`}>
                            <FaExclamationTriangle className="mr-1" />
                            {post.severity}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category & Date */}
                        <div className="flex items-center justify-between mb-3 text-sm text-white/70">
                          <div className="flex items-center">
                            <FaTag className="mr-2 text-accent" />
                            {post.category}
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-accent" />
                            {post.date}
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-3 hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-white/80 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags and Read Time */}
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-white/70">
                            <div className="flex items-center">
                              <FaEye className="mr-2 text-accent" />
                              {post.readTime} read
                            </div>
                            {post.cveId && (
                              <div className="flex items-center">
                                <FaLock className="mr-2 text-accent" />
                                {post.cveId}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <FaSearch className="mx-auto text-4xl text-white/30 mb-4" />
              <h3 className="text-2xl font-bold mb-2">No results found</h3>
              <p className="text-white/70">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
        
        {/* Background Elements */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-highlight/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
      </section>
      
      {/* Featured Cybersecurity Resources */}
      <section className="relative py-16 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold mb-4">
              Essential Security <span className="text-accent">Resources</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Tools and resources to help you stay protected in an ever-evolving threat landscape.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resource 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <GlassCard className="p-6 h-full hover:border-accent/40 transition-all">
                <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-2xl text-accent" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-3">
                  OWASP Top 10
                </h3>
                <p className="text-white/80 mb-4">
                  Learn about the most critical web application security risks and how to protect against them.
                </p>
                <Button variant="outline" size="sm" className="mt-auto">
                  Explore Guide
                </Button>
              </GlassCard>
            </motion.div>
            
            {/* Resource 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <GlassCard className="p-6 h-full hover:border-highlight/40 transition-all">
                <div className="w-14 h-14 rounded-lg bg-highlight/20 flex items-center justify-center mb-4">
                  <FaLock className="text-2xl text-highlight" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-3">
                  CVE Database
                </h3>
                <p className="text-white/80 mb-4">
                  Search and monitor known vulnerabilities affecting software and systems you use.
                </p>
                <Button variant="outline" size="sm" className="mt-auto">
                  Browse Database
                </Button>
              </GlassCard>
            </motion.div>
            
            {/* Resource 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <GlassCard className="p-6 h-full hover:border-secondary/40 transition-all">
                <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                  <FaExclamationTriangle className="text-2xl text-secondary" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-3">
                  Security Advisories
                </h3>
                <p className="text-white/80 mb-4">
                  Stay updated with the latest security bulletins and vulnerability disclosures from vendors.
                </p>
                <Button variant="outline" size="sm" className="mt-auto">
                  View Advisories
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;