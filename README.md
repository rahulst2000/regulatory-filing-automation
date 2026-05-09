# Tool-19 Regulatory Filing Automation - AI Service

Built as part of the AI Developer 2 role. This is a high-performance Python microservice powered by Groq and ChromaDB.

## ⚙️ Setup Instructions for VS Code

1. **Environmental Variables**:
   Create a `.env` file in the root directory (or in this folder) with:
   ```env
   GROQ_API_KEY=your_key_here
   ```

2. **Install Dependencies**:
   Open a terminal in the `ai-service` folder and run:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Service**:
   ```bash
   python app.py
   ```
   The service will start on `http://localhost:5000`.

## 📍 API Endpoints (AI Developer 2 Tasks)

| Endpoint | Method | Description | Day Task |
|----------|--------|-------------|----------|
| `/api/ai/health` | GET | Detailed health & cache metrics | Day 7 |
| `/api/ai/categorise` | POST | Document classification | Day 3 |
| `/api/ai/generate-report` | POST | Structured report generation | Day 11 |
| `/api/ai/query` | POST | RAG-based regulatory search | Day 5 |

## 🛠 Tech Stack
- **Engine**: Groq LLaMA 3.3 70b
- **Database**: Simulated ChromaDB (Vectors)
- **Framework**: Flask 3.x
- **Cache**: SHA256 In-Memory TTL Cache
