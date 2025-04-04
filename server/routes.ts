import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Router } from 'express';
import { getSecurityNews } from './services/newsService';

const router = Router();

// Mock blog data
const blogPosts = [
  {
    id: "1",
    title: "New Critical Vulnerability in Log4j Library (Log4Shell)",
    excerpt: "A serious zero-day vulnerability in the popular Log4j library allows attackers to execute arbitrary code remotely.",
    content: "The Apache Log4j vulnerability represents one of the most significant cybersecurity threats in recent years...",
    date: "2024-04-03",
    author: "Sarah Johnson",
    category: "Vulnerabilities",
    tags: ["Log4j", "Zero-day", "Remote Code Execution"],
    imageUrl: "https://images.unsplash.com/photo-1610986603166-f78428812d13",
    readTime: "7 min",
    cveId: "CVE-2021-44228",
    severity: "Critical"
  },
  {
    id: "2",
    title: "Rise in Ransomware Attacks Targeting Healthcare",
    excerpt: "Healthcare organizations face increasing threats from sophisticated ransomware groups.",
    content: "Ransomware attacks against healthcare organizations have increased significantly...",
    date: "2024-04-02",
    author: "Michael Chen",
    category: "Threat Intelligence",
    tags: ["Ransomware", "Healthcare", "Security"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    readTime: "5 min",
    severity: "High"
  }
];

// Blog routes
router.get('/api/blogposts', (req, res) => {
  res.json(blogPosts);
});

router.get('/api/blogposts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});


export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/security-news', (_req, res) => {
    const news = getSecurityNews();
    res.json(news);
  });
  app.use(router); // Use the blog routes
  const httpServer = createServer(app);
  return httpServer;
}