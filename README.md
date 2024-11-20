Here’s a comprehensive README file for your project, optimized for a GitHub repository:

---

# Ripple Chatbot API

![License](https://img.shields.io/badge/license-MIT-blue.svg)  
A chatbot API built with Flask, integrating SambaNova OpenAI models for dynamic conversational AI experiences.

## Features

- **Dynamic Model Selection**: Choose between multiple AI models like Meta-Llama-3.1-405B, 70B, and 8B for different use cases.
- **Chat History Management**: Maintain context with persistent chat history for a natural conversational flow.
- **System Prompt Customization**: Configure the chatbot's personality and responses using customizable system prompts.
- **Thinking Time Analysis**: Monitor AI response times with a `thinking_budget` feature.
- **Error Handling**: Provides robust error handling and logging for seamless user experience.
- **Static File Hosting**: Serves an interactive frontend from the `static` directory for easy deployment.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites
- Python 3.8 or later
- [Pip](https://pip.pypa.io/en/stable/installation/)
- [SambaNova OpenAI API Key](https://sambanova.ai/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ripple-chatbot.git
   cd ripple-chatbot
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file in the project root:
     ```plaintext
     API_KEY=your_sambanova_api_key
     PORT=5000
     ```
   - Replace `your_sambanova_api_key` with your actual API key.

5. Run the application:
   ```bash
   python app.py
   ```

6. Access the application:
   Open your browser and navigate to `http://localhost:5000`.

---

## Usage

### Starting the API
Run the Flask server with:
```bash
python app.py
```

### Using the API
- The primary endpoint for generating responses is `/api/generate`.
- Use an HTTP client like Postman, Curl, or your own frontend to send POST requests.

#### Example Request
```json
POST /api/generate
Content-Type: application/json

{
  "message": "Tell me a joke.",
  "chat_history": [
    {"user": "Who are you?", "assistant": "I am your chatbot."}
  ],
  "model": "Meta-Llama-3.1-70B-Instruct",
  "system_prompt": "You are a funny assistant.",
  "thinking_budget": 15
}
```

#### Example Response
```json
{
  "response": "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "thinking_time": 2.345
}
```

---

## API Endpoints

### `GET /`
Serves the static HTML frontend (`static/ripple.html`).

### `POST /api/generate`
Generates a chatbot response based on the user input and chat history.

| Parameter        | Type   | Description                                                                 |
|------------------|--------|-----------------------------------------------------------------------------|
| `message`        | string | The user’s message for the chatbot.                                         |
| `chat_history`   | array  | List of prior messages in the chat.                                         |
| `model`          | string | The model to use. Defaults to `Meta-Llama-3.1-405B-Instruct`.              |
| `system_prompt`  | string | A customizable prompt that sets the chatbot’s personality.                 |
| `thinking_budget`| number | Maximum response time for the AI (in seconds). Default: `10`.              |
| `api_key`        | string | API key for SambaNova authentication (optional; defaults to `.env` key).   |

---

## Environment Variables

| Variable  | Description                                      |
|-----------|--------------------------------------------------|
| `API_KEY` | Your SambaNova OpenAI API key.                  |
| `PORT`    | Port to run the Flask server (default: `5000`). |

---

## File Structure

```
ripple-chatbot/
│
├── static/
│   ├── ripple.html           # Frontend HTML file
│   ├── styles.css            # Stylesheet for the frontend
│   └── ...                   # Additional frontend assets
│
├── app.py                    # Main Flask application
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables
├── README.md                 # Project documentation
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out if you have questions or feature suggestions. Happy coding! 🚀

--- 
