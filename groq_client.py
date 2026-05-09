import os
import time
import json
import hashlib
from groq import Groq
from typing import Dict, Any, Optional

class GroqClient:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable is required")
        self.client = Groq(api_key=self.api_key)
        self.cache = {}  # AI Developer 2: Shared Cache (Day 8)
        self.stats = {
            "total_calls": 0,
            "total_latency_ms": 0,
            "cache_hits": 0
        }

    def _get_cache_key(self, prompt: str) -> str:
        # AI Developer 2: SHA256 Cache Key (Day 8)
        return hashlib.sha256(prompt.encode()).hexdigest()

    def call_with_retry(self, prompt: str, model: str = "llama-3.3-70b-versatile", retries: int = 3) -> Dict[str, Any]:
        """
        AI Developer 2: 3-retry with backoff, error logging, and caching (Day 2 & 8)
        """
        cache_key = self._get_cache_key(prompt)
        current_time = time.time()

        # Cache Check (15 min TTL)
        if cache_key in self.cache:
            entry = self.cache[cache_key]
            if current_time - entry['timestamp'] < 900:
                self.stats["cache_hits"] += 1
                return {
                    "data": entry['data'],
                    "meta": {
                        "confidence": 0.98,
                        "model_used": model,
                        "response_time_ms": 1,
                        "cached": True,
                        "tokens_used": entry.get('tokens', 0)
                    }
                }

        start_time = time.time()
        last_error = None
        
        for attempt in range(retries):
            try:
                self.stats["total_calls"] += 1
                completion = self.client.chat.completions.create(
                    messages=[{"role": "user", "content": prompt}],
                    model=model,
                    response_format={"type": "json_object"}
                )
                
                response_content = completion.choices[0].message.content
                data = json.loads(response_content)
                latency = int((time.time() - start_time) * 1000)
                self.stats["total_latency_ms"] += latency

                # Meta Object (Day 9)
                meta = {
                    "confidence": data.get("confidence", 0.95),
                    "model_used": model,
                    "response_time_ms": latency,
                    "cached": False,
                    "tokens_used": completion.usage.total_tokens
                }

                # Update Cache
                self.cache[cache_key] = {
                    "data": data,
                    "timestamp": current_time,
                    "tokens": completion.usage.total_tokens
                }

                return {"data": data, "meta": meta}

            except Exception as e:
                last_error = e
                print(f"Groq API Attempt {attempt + 1} failed: {str(e)}")
                time.sleep(2 ** attempt) # Exponential backoff

        # AI Fallback Logic (Day 13)
        return {
            "data": {"is_fallback": True, "message": "Manual review required"},
            "meta": {"confidence": 0, "model_used": "fallback", "response_time_ms": 0, "cached": False}
        }

    def get_health_metrics(self) -> Dict[str, Any]:
        avg_latency = self.stats["total_latency_ms"] / max(1, self.stats["total_calls"])
        return {
            "model_name": "llama-3.3-70b-versatile",
            "avg_response_time": f"{avg_latency:.2f}ms",
            "cache_stats": {
                "hits": self.stats["cache_hits"],
                "active_keys": len(self.cache)
            }
        }
