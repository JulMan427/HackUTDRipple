from flask import Flask, request, jsonify, send_from_directory
import openai
import os
from dotenv import load_dotenv
import time

load_dotenv()

app = Flask(__name__, static_folder='../static')

API_BASE = "https://api.sambanova.ai/v1"
API_KEY = os.getenv("API_KEY")

MODELS = [
    "Meta-Llama-3.1-405B-Instruct",
    "Meta-Llama-3.1-70B-Instruct",
    "Meta-Llama-3.1-8B-Instruct"
]

def create_client(api_key=None):
    # Always use the hardcoded API key
    openai.api_key = API_KEY
    return openai.OpenAI(api_key=openai.api_key, base_url=API_BASE)

def chat_with_ai(message, chat_history, system_prompt):
    messages = [{"role": "system", "content": system_prompt}]
    for tup in chat_history:
        messages.append({"role": "user", "content": tup["user"]})
        messages.append({"role": "assistant", "content": tup["assistant"]})
    messages.append({"role": "user", "content": message})
    return messages

def respond(message, chat_history, model, system_prompt, thinking_budget, api_key):
    client = create_client(api_key)
    messages = chat_with_ai(message, chat_history, system_prompt.format(budget=thinking_budget))
    start_time = time.time()

    try:
        completion = client.chat.completions.create(model=model, messages=messages)
        response = completion.choices[0].message.content
        thinking_time = time.time() - start_time
        return response, thinking_time
    except Exception as e:
        error_message = f"Error: {str(e)}"
        return error_message, time.time() - start_time

@app.route('/api/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        message = data.get('message', '')
        chat_history = data.get('chat_history', [])
        model = data.get('model', MODELS[0])
        system_prompt = data.get('system_prompt', '')
        thinking_budget = data.get('thinking_budget', 10)
        api_key = data.get('api_key', None)

        response, thinking_time = respond(message, chat_history, model, system_prompt, thinking_budget, api_key)
        return jsonify({"response": response, "thinking_time": thinking_time})
    except Exception as e:
        app.logger.error(f"Error in generate endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500
    

@app.route('/')
def home():
    return send_from_directory('../static', 'ripple.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('../static', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
