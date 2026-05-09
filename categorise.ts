import { groqCallWithFallback } from "../services/groq_client.ts";

export interface AICategorization {
  category: string;
  confidence: number;
  reasoning: string;
}

const FALLBACK: AICategorization = {
  category: "OTHER",
  confidence: 0,
  reasoning: "AI service is currently unavailable. Using default categorization."
};

/**
 * AI Developer 2: Categorize Endpoint Logic (Day 3)
 */
export async function handleCategorisation(text: string) {
  const prompt = `Categorize this regulatory filing into [FINANCIAL_REPORT, DISCLOSURE, COMPLIANCE_NOTICE, BOARD_RESOLUTION, LEGAL_FILING, OTHER].
  Return JSON with { category, confidence, reasoning }.
  
  TEXT: "${text}"`;

  return await groqCallWithFallback<AICategorization>(prompt, "llama-3.3-70b-versatile", FALLBACK);
}
