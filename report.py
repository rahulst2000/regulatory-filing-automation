from flask import Blueprint, request, jsonify
from services.groq_client import GroqClient

report_bp = Blueprint('report', __name__)
groq_client = GroqClient()

@report_bp.route('/generate-report', methods=['POST'])
def generate_report():
    """
    AI Developer 2: /generate-report endpoint (Day 11/15)
    """
    data = request.json
    text = data.get("text", "")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400

    prompt = f"""
    Generate a professional regulatory report from the following filing data.
    Return JSON with: title, executive_summary, overview, top_items (array), recommendations (array).
    
    TEXT: "{text}"
    """
    
    result = groq_client.call_with_retry(prompt)
    return jsonify(result)
