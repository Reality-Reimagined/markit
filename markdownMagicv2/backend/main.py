from fastapi import FastAPI, UploadFile, HTTPException, File, Form
from fastapi.middleware.cors import CORSMiddleware
import groq
import os
from dotenv import load_dotenv
import tempfile
from typing import List

from converters.basic import BasicConverter
from converters.image import ImageConverter
from converters.batch import BatchConverter
from utils.file_utils import is_supported_file, get_conversion_type

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client for image and batch processing
groq_client = groq.Groq(api_key=os.getenv("GROQ_API_KEY"))
GROQ_MODEL = "mixtral-8x7b-32768"

# Initialize converters
basic_converter = BasicConverter()
image_converter = ImageConverter(groq_client, GROQ_MODEL)
batch_converter = BatchConverter(groq_client, GROQ_MODEL)

@app.post("/convert/single")
async def convert_single_file(
    file: UploadFile = File(...),
    use_llm: bool = Form(False)
):
    if not is_supported_file(file.filename):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file.flush()

            # Choose converter based on file type and LLM preference
            conversion_type = get_conversion_type(file.filename)
            if conversion_type == 'image' and use_llm:
                result = await image_converter.convert(temp_file.name)
            else:
                result = await basic_converter.convert(temp_file.name)

            os.unlink(temp_file.name)
            return {"markdown": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/convert/batch")
async def convert_multiple_files(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")

    temp_files = []
    try:
        # Save all files temporarily
        for file in files:
            if not is_supported_file(file.filename):
                raise HTTPException(
                    status_code=400, 
                    detail=f"Unsupported file type: {file.filename}"
                )
            
            temp = tempfile.NamedTemporaryFile(delete=False)
            content = await file.read()
            temp.write(content)
            temp.flush()
            temp_files.append((file.filename, temp.name))

        # Convert all files
        results = await batch_converter.convert([t[1] for t in temp_files])

        # Map temporary filenames back to original filenames
        mapped_results = {
            orig_name: results[temp_name]
            for orig_name, temp_name in temp_files
        }

        return mapped_results
    finally:
        # Clean up temporary files
        for _, temp_path in temp_files:
            try:
                os.unlink(temp_path)
            except:
                pass

@app.get("/health")
async def health_check():
    return {"status": "healthy"}