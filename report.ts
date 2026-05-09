import { groqCallWithFallback } from "../services/groq_client.ts";

export interface AIReport {
  title: string;
  executive_summary: string;
  overview: string;
  top_items: string[];
  recommendations: string[];
}

const FALLBACK: AIReport = {
  title: "Pending Regulatory Analysis",
  executive_summary: "Analysis failed due to model timeout.",
  overview: "System is in fallback mode.",
  top_items: ["Item extraction unavailable"],
  recommendations: ["Manually review filing", "Retry analysis in 5 minutes"]
};

/**
 * AI Developer 2: Report Generation Logic (Day 11)
 */
export async function handleReportGeneration(text: string) {
  const prompt = `Generate a structured regulatory report from this text. 
  Return JSON with: title, executive_summary, overview, top_items (array), recommendations (array).
  
  TEXT: "${text}"`;

  return await groqCallWithFallback<AIReport>(prompt, "llama-3.3-70b-versatile", FALLBACK);
}
