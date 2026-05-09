import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { AIService } from "./ai-service/app.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes (AI Developer 2 Responsibilities)
  
  // Health Endpoint (Day 7)
  app.get("/api/ai/health", (req, res) => {
    res.json(AIService.health());
  });

  // Categorise Endpoint (Day 3)
  app.post("/api/ai/categorise", async (req, res) => {
    try {
      const result = await AIService.categorise(req.body.text);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "AI service failed" });
    }
  });

  // Generate Report Endpoint (Day 11/Part of AI Dev 2 role)
  app.post("/api/ai/generate-report", async (req, res) => {
    try {
      const result = await AIService.generateReport(req.body.text);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "AI service failed" });
    }
  });

  // RAG-based Regulatory Search Endpoint (Day 5)
  app.post("/api/ai/query", async (req, res) => {
    try {
      const result = await AIService.query(req.body.query);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "AI query service failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
