from markitdown import MarkItDown
from typing import Optional

class ImageConverter:
    def __init__(self, llm_client, llm_model: str):
        self.md = MarkItDown(llm_client=llm_client, llm_model=llm_model)
        
    async def convert(self, file_path: str) -> str:
        result = self.md.convert(file_path)
        return result.text_content