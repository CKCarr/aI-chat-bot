# AI Chat Bot

A full-stack AI chatbot built with **React, Vite, Node.js, Express, and the Google Gemini API**.

## Features

- AI-generated responses using Google Gemini
- Multiple chat sessions with create, select, and delete functionality
- Browser-based chat history using localStorage
- Markdown-formatted AI responses
- Emoji picker
- Typing indicator and error handling
- Server-side API key management

## Tech Stack

| Frontend | Backend | AI Integration |
|---|---|---|
| React | Node.js | Google Gemini API |
| Vite | Express | @google/genai |
| CSS | dotenv | Gemini Flash-Lite |
| react-markdown | cors | |
| emoji-picker-react | | |

## Getting Started

### Prerequisites

- Node.js and npm
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/CKCarr/aI-chat-bot.git
cd aI-chat-bot
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```dotenv
GEMINI_API_KEY=your_google_api_key_here
```

Never commit this file to GitHub. Ensure `.env` is included in `.gitignore`.

### Start the Backend

```bash
npm run server
```

The Express server runs on port `3001` by default.

### Start the Frontend

Open a second terminal:

```bash
npm run dev
```

Open the Vite development URL, normally `http://localhost:5173`.

In GitHub Codespaces, use the Ports panel to open the frontend preview.

## How It Works

1. The user submits a message through the React interface.
2. React sends a POST request to `/api/chat`.
3. Vite forwards the development request to Express.
4. Express sends the message to Google Gemini using a server-side API key.
5. Gemini generates a response.
6. Express returns the response as JSON.
7. React displays the answer and saves the conversation in localStorage.

## Testing the API

With the backend running:

```bash
curl -i http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Gemini! Tell me a fun fact."}'
```

A successful response returns HTTP `200 OK` with a JSON `reply`.

## Screenshot

A screenshot of the working application will be added here.

Suggested file location: `docs/images/chatbot-demo.png`.

## Current Limitations

- Chat history is stored in the current browser, not a database.
- Previous conversation messages are not yet sent to Gemini as context.
- The application is configured for local development and Codespaces.
- No production authentication or API rate limiting is implemented.
- Gemini API availability and free-tier limits depend on Google's current policies.

## Future Improvements

- Context-aware conversations using message history
- Improved responsive design and accessibility
- Better API error handling and retry logic
- Automated frontend and backend tests
- Optional database storage
- Secure deployment for portfolio demonstrations

## Development

The Gemini integration was developed on the `feature/gemini-integration` branch using Git feature-branch and pull-request workflows.

## License

No license has been added to this repository.