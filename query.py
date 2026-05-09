from flask import Blueprint, request, jsonify
from services.groq_client import GroqClient
from services.chroma_client import chroma

query_bp = Blueprint('query', __name__)
groq_client = GroqClient()

@query_bp.route('/query', methods=['POST'])
def query_rag():
    """
    AI Developer 2: POST /query RAG endpoint (Day 5)
    """
    data = request.json
    question = data.get("question", "")
    
    if not question:
        return jsonify({"error": "No question provided"}), 400

    # 1. Retrieve Context from ChromaDB
    context = chroma.query(question)
    
    # 2. Augment Prompt
    prompt = f"""
    Answer the following regulatory question using the provided context.
    If the context doesn't have the answer, use your general regulatory knowledge but flag it.
    
    CONTEXT:
    {chr(10).join(context)}
    
    QUESTION: "{question}"
    
    Return JSON with fields: answer, sources (array), is_verified (bool).
    """
    
    # 3. Call AI
    result = groq_client.call_with_retry(prompt)
    return jsonify(result)
