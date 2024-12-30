from markitdown import MarkItDown
import os
from typing import List, Dict

class BatchConverter:
    def __init__(self, llm_client, llm_model: str):
        self.md = MarkItDown(llm_client=llm_client, llm_model=llm_model)
        
    async def convert(self, file_paths: List[str]) -> Dict[str, str]:
        results = {}
        for file_path in file_paths:
            try:
                result = self.md.convert(file_path)
                results[file_path] = {
                    'status': 'success',
                    'content': result.text_content
                }
            except Exception as e:
                results[file_path] = {
                    'status': 'error',
                    'error': str(e)
                }
        return results