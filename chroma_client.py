import os

class ChromaClient:
    """
    AI Developer 2: ChromaDB Integration (Day 4)
    Simulated persistent vector store for regulatory documents.
    """
    def __init__(self):
        self.collection_name = "regulatory_docs"
        self.docs = [
            {"id": "doc_1", "text": "Section 4.1: Audit reports must be signed by a registered CPA.", "metadata": {"source": "manual_v1"}},
            {"id": "doc_2", "text": "Circular 2024-B: Compliance notices required within 48h.", "metadata": {"source": "reg_update"}},
            {"id": "doc_3", "text": "Form 10-K2: Board resolutions must be filed within 5 days.", "metadata": {"source": "filing_rules"}}
        ]

    def query(self, query_text: str, n_results: int = 2):
        # AI Developer 2: Simple semantic search simulation
        words = query_text.lower().split()
        results = []
        for d in self.docs:
            if any(w in d["text"].lower() for w in words):
                results.append(d["text"])
        
        return results if results else [self.docs[0]["text"]]

chroma = ChromaClient()
