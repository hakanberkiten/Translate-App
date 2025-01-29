from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)  

API_KEY = os.getenv("HUGGINGFACE_API_KEY")
BASE_URL = "https://api-inference.huggingface.co/models"

@app.route('/translate', methods=['POST'])
def translate():
    try:
        data = request.get_json()
        source_lang = data.get("source")
        target_lang = data.get("target")
        text = data.get("text")

        if not all([source_lang, target_lang, text]):
            return jsonify({"error": "source, target and text information is required."}), 400

        model_endpoint = "facebook/nllb-200-distilled-600M"
        API_URL = f"{BASE_URL}/{model_endpoint}"

        headers = {"Authorization": f"Bearer {API_KEY}"}

        payload = {
            "inputs": text,
            "parameters": {
                "src_lang": source_lang,
                "tgt_lang": target_lang
            }
        }

        response = requests.post(API_URL, headers=headers, json=payload)
        
        print("Response:", response.text)
        if response.status_code != 200:
            return jsonify({
                "error": "Hugging Face API Error",
                "details": response.json()
            }), response.status_code

        translated_text = response.json()[0].get("translation_text", "Translate failed.")

        return jsonify({
            "translation": translated_text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
