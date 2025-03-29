import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTag, FaClock, FaArrowLeft, FaShare, FaExclamationTriangle, FaLock } from 'react-icons/fa';
import GlassCard from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Blog post type definition - same as on blog.tsx
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

// Example blog data - same as on blog.tsx
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "New Critical Vulnerability in Log4j Library (Log4Shell)",
    excerpt: "A serious zero-day vulnerability in the popular Log4j library allows attackers to execute arbitrary code remotely.",
    content: "The Apache Log4j vulnerability (CVE-2021-44228), also known as Log4Shell, represents one of the most significant cybersecurity threats in recent years. This zero-day vulnerability affects the popular Java logging library and allows attackers to execute arbitrary code by getting the application to log a specially crafted string.\n\n## What is Log4Shell?\n\nLog4Shell is a vulnerability in Apache Log4j, a widely used Java logging library. The vulnerability allows attackers to execute arbitrary code on a server by making the application log a specially crafted string. When Log4j processes this string, it interprets it as a command to retrieve and execute code from a remote server controlled by the attacker.\n\n## Why is it so dangerous?\n\n1. **Widespread usage**: Log4j is used in countless enterprise applications and services.\n2. **Ease of exploitation**: The vulnerability is relatively simple to exploit, requiring minimal technical knowledge.\n3. **Complete system compromise**: Successful exploitation can lead to full system takeover.\n4. **Embedded in dependencies**: Many organizations are unaware they're using Log4j as it's often buried in dependencies.\n\n## Mitigation Strategies\n\n- Update to Log4j 2.17.0 or later immediately\n- Implement network monitoring for exploitation attempts\n- Scan your codebase for vulnerable versions of Log4j\n- Set the system property `-Dlog4j2.formatMsgNoLookups=true` as a temporary measure\n- Deploy web application firewalls with rules to block exploitation attempts\n\n## Long-term lessons\n\nThe Log4Shell vulnerability highlights the critical importance of software supply chain security and dependency management. Organizations should maintain complete software bills of materials (SBOMs) and implement automated vulnerability scanning across their entire technology stack.",
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
    content: "Ransomware attacks against healthcare organizations have increased by 73% in the past year, with criminal groups specifically targeting vulnerabilities in connected medical devices and outdated hospital infrastructure...\n\nHealthcare providers are particularly vulnerable due to the critical nature of their services, making them more likely to pay ransoms, as well as their complex networks of IoT medical devices that often run on legacy operating systems.",
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

// Function to format content with basic markdown
const formatContent = (content: string) => {
  // Replace markdown headers with HTML headers
  let formattedContent = content
    .replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/### (.*?)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    // Replace markdown lists with HTML lists
    .replace(/^\d+\. (.*?)$/gm, '<li class="ml-6 list-decimal mb-2">$1</li>')
    .replace(/^- (.*?)$/gm, '<li class="ml-6 list-disc mb-2">$1</li>')
    // Replace double newlines with paragraph breaks
    .split('\n\n').join('</p><p class="my-4">');
  
  return formattedContent;
};

// Get severity badge color
const getSeverityColor = (severity?: 'Critical' | 'High' | 'Medium' | 'Low') => {
  switch (severity) {
    case 'Critical': return 'bg-red-600 hover:bg-red-700';
    case 'High': return 'bg-orange-500 hover:bg-orange-600';
    case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'Low': return 'bg-blue-500 hover:bg-blue-600';
    default: return 'bg-gray-500 hover:bg-gray-600';
  }
};

// Related posts - simplified function to get 3 related posts by category or tags
const getRelatedPosts = (currentPost: BlogPost) => {
  return blogPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, 3);
};

const BlogPostPage = () => {
  const [, params] = useRoute<{ id: string }>('/blog/:id');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
  // Find the post by ID
  useEffect(() => {
    if (params && params.id) {
      const foundPost = blogPosts.find(p => p.id === params.id);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedPosts(foundPost));
      }
    }
  }, [params]);
  
  // If post not found
  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-darkBg">
        <GlassCard className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <a>
              <Button>
                <FaArrowLeft className="mr-2" /> Back to Blog
              </Button>
            </a>
          </Link>
        </GlassCard>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-darkBg pb-20">
      {/* Hero section with cover image */}
      <div className="relative h-[50vh] mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/blog">
                <a className="inline-flex items-center text-white/80 hover:text-accent mb-4 transition-colors">
                  <FaArrowLeft className="mr-2" /> Back to Blog
                </a>
              </Link>
              
              <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-4 text-white">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-accent" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-2 text-accent" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <FaTag className="mr-2 text-accent" />
                  {post.category}
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-accent" />
                  {post.readTime} read
                </div>
                {post.severity && (
                  <Badge className={`${getSeverityColor(post.severity)}`}>
                    <FaExclamationTriangle className="mr-1" />
                    {post.severity} Severity
                  </Badge>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard className="p-8">
                {/* CVE Notice */}
                {post.cveId && (
                  <div className="mb-6 p-4 bg-red-900/30 rounded-lg border border-red-500/40">
                    <div className="flex items-start">
                      <FaLock className="text-red-400 text-xl mt-1 mr-3" />
                      <div>
                        <h3 className="font-bold text-red-400 mb-1">Security Vulnerability: {post.cveId}</h3>
                        <p className="text-white/90 text-sm">
                          This article discusses a documented security vulnerability. Review the complete security advisory and apply the recommended patches immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Article excerpt */}
                <p className="text-lg text-white/90 font-medium mb-8 border-l-4 border-accent pl-4 py-2">
                  {post.excerpt}
                </p>
                
                {/* Article content */}
                <div 
                  className="prose prose-invert prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: `<p class="my-4">${formatContent(post.content)}</p>` }}
                />
                
                {/* Tags */}
                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-white/70">Tags:</span>
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Share buttons */}
                <div className="mt-8 flex justify-end">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <FaShare className="mr-2" /> Share Article
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 sticky top-24">
              {/* Author info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassCard className="p-6">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-4">About the Author</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-4">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{post.author}</h4>
                      <p className="text-sm text-white/70">Security Researcher</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">
                    Experienced cybersecurity professional specializing in vulnerability research and threat intelligence. Regular contributor to security conferences and journals.
                  </p>
                </GlassCard>
              </motion.div>
              
              {/* Related posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard className="p-6">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <a className="block group">
                          <div className="flex items-start">
                            <div 
                              className="w-16 h-16 rounded-md bg-cover bg-center flex-shrink-0 mr-3"
                              style={{ backgroundImage: `url(${relatedPost.imageUrl})` }}
                            ></div>
                            <div>
                              <h4 className="font-bold text-sm group-hover:text-accent transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-white/70 mt-1">{relatedPost.date}</p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
              
              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassCard className="p-6">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-4">Security Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-white/80 hover:text-accent transition-colors">
                        <FaLock className="mr-2 text-accent" /> NIST Cybersecurity Framework
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-white/80 hover:text-accent transition-colors">
                        <FaLock className="mr-2 text-accent" /> OWASP Top 10 Project
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-white/80 hover:text-accent transition-colors">
                        <FaLock className="mr-2 text-accent" /> Common Vulnerabilities and Exposures
                      </a>
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;