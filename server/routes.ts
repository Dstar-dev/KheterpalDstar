import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import { getSecurityNews } from './services/newsService';

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/security-news', (_req, res) => {
    const news = getSecurityNews();
    res.json(news);
  });

  const httpServer = createServer(app);
  return httpServer;
}
