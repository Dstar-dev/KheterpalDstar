import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import GlassCard from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaSearch, FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa';

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

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blogposts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-red-500">{error}</h2>
          <Link href="/">
            <Button>
              <FaArrowLeft className="mr-2" /> Back to Home
            </Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="font-['Montserrat'] text-sm uppercase tracking-widest text-accent">Blog</span>
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl md:text-5xl mt-2">
            Security <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">Latest cybersecurity news, vulnerabilities, and insights</p>
        </motion.div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 rounded-lg py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Link href={`/blog/${post.id}`}>
                <GlassCard className="h-full hover:border-accent/40 transition-all cursor-pointer overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    {post.severity && (
                      <Badge
                        className="absolute top-2 right-2"
                        variant={post.severity === 'Critical' ? 'destructive' : 'default'}
                      >
                        {post.severity}
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-sm text-gray-400">{post.readTime} read</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-400">
                        <FaCalendarAlt className="mr-2" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-accent">
                        Read more <FaTag className="ml-2" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;