import { handleCategorisation } from "./routes/categorise.ts";
import { handleReportGeneration } from "./routes/report.ts";
import { getCacheStats } from "./services/groq_client.ts";
import { handleRegulatoryQuery } from "./routes/query.ts";


/**
 * AI Developer 2: Main service module (Day 15 Package AI)
 */
export const AIService = {
  categorise: handleCategorisation,
  generateReport: handleReportGeneration,
  
  health: () => ({
    status: "healthy",
    model: "llama-3.3-70b-versatile",
    platform: "Groq Cloud",
    cache: getCacheStats(),
    uptime: Math.floor(performance.now() / 1000),
    timestamp: new Date().toISOString(),
    api_version: "v1.0.0"
  })
};
