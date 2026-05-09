from flask import Flask, jsonify
from routes.categorise import categorise_bp
from routes.report import report_bp
from routes.query import query_bp
from services.groq_client import GroqClient
import time
import threading

app = Flask(__name__)
start_time = time.time()
groq_handler = GroqClient()

# Register Blueprints
app.register_blueprint(categorise_bp, url_prefix='/api/ai')
app.register_blueprint(report_bp, url_prefix='/api/ai')
app.register_blueprint(query_bp, url_prefix='/api/ai')

# AI Developer 2: Async Job Simulation (Day 11)
jobs = {}

@app.route('/api/ai/health', methods=['GET'])
def health():
    """
    AI Developer 2: GET /health (Day 7/17)
    """
    metrics = groq_handler.get_health_metrics()
    return jsonify({
        "status": "healthy",
        "uptime_seconds": int(time.time() - start_time),
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "api_version": "v1.0.0",
        **metrics
    })

if __name__ == '__main__':
    print("--- Tool-19 AI Service Starting (VS Code Mode) ---")
    app.run(host='0.0.0.0', port=5000, debug=True)
