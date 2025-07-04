import type { Express } from "express";
import { createServer, type Server } from "http";
import { simpleStorage } from "./storage-simple";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check route for navigation
  app.get('/api/health', async (req, res) => {
    const health = await simpleStorage.getHealth();
    res.json(health);
  });

  const server = createServer(app);
  return server;
}