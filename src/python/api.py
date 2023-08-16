import os
import logging

from flask import Flask, jsonify, request
from urllib.parse import unquote

from utils import decode_website

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

app = Flask(__name__)

@app.route('/api/pdp', methods=['POST'])
def get_data():
    logging.debug("request",request)

    pdp_url = unquote(unquote(request.args.get('pdp_url')))

    logging.debug("pdp_url received",pdp_url)

    if not pdp_url:
        return jsonify({'error': 'URL is required'}), 400

    decoded_text = decode_website(pdp_url)

    logging.debug("decoded_text",decoded_text)

    summary = summarize_webpage(decoded_text) # or however you want to call the langchain model

    response = {
        'submitted_url': pdp_url,
        'product summary': summary,
    }

    return jsonify(response)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)


