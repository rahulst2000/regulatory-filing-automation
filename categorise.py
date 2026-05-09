from flask import Blueprint, request, jsonify
from services.groq_client import GroqClient

categorise_bp = Blueprint('categorise', __name__)
groq_client = GroqClient()

@categorise_bp.route('/categorise', methods=['POST'])
def categorise():
    """
    AI Developer 2: POST /categorise endpoint (Day 3)
    """
    data = request.json
    text = data.get("text", "")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400

    prompt = f"""
    Categorize this regulatory filing into [FINANCIAL_REPORT, DISCLOSURE, COMPLIANCE_NOTICE, BOARD_RESOLUTION, LEGAL_FILING, OTHER].
    Return JSON with fields: category, confidence (0-1), reasoning.
    
    TEXT: "{text}"
    """
    
    result = groq_client.call_with_retry(prompt)
    return jsonify(result)
