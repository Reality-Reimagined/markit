# MarkItDown Backend

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with your Groq API key:
```
GROQ_API_KEY=your-api-key-here
```

4. Start the server:
```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Endpoints

- POST /convert - Convert a file to markdown
- GET /health - Health check endpoint

## Development

The backend uses FastAPI with the following features:
- File upload handling
- Groq integration for LLM processing
- CORS middleware for frontend communication
- Error handling and validation
- Temporary file management