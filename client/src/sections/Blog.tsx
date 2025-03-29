
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import GlassCard from "@/components/ui/glass-card";

const blogPosts = [
  {
    title: "Securing Modern Web Applications",
    excerpt: "Exploring best practices in web security and common vulnerabilities.",
    date: "March 28, 2024",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
  },
  {
    title: "The Future of UI/UX Design",
    excerpt: "Emerging trends and technologies shaping digital experiences.",
    date: "March 25, 2024",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040"
  },
  {
    title: "Interactive Experiences in 2024",
    excerpt: "How modern web technologies enable immersive user experiences.",
    date: "March 22, 2024",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="font-['Montserrat'] text-sm uppercase tracking-widest text-accent">Blog</span>
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl md:text-5xl mt-2">
            Latest <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Thoughts and articles about security, design, and development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full">
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <img 
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-accent font-medium">{post.category}</span>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-accent hover:text-highlight transition-colors"
                    >
                      Read More <FaArrowRight className="inline-block ml-1" />
                    </motion.button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-40 -right-20 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-highlight/10 rounded-full filter blur-3xl opacity-20" />
    </section>
  );
};

export default Blog;
