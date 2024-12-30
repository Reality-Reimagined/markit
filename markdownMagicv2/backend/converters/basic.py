from markitdown import MarkItDown

class BasicConverter:
    def __init__(self):
        self.md = MarkItDown()

    async def convert(self, file_path: str) -> str:
        result = self.md.convert(file_path)
        return result.text_content