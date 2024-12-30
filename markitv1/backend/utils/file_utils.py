import os
from typing import List

SUPPORTED_EXTENSIONS = {
    'basic': ('.pdf', '.docx', '.pptx', '.xlsx', '.html', '.csv', '.json', '.xml', '.zip'),
    'image': ('.jpg', '.jpeg', '.png'),
    'audio': ('.mp3', '.wav')
}

def is_image(filename: str) -> bool:
    return filename.lower().endswith(SUPPORTED_EXTENSIONS['image'])

def is_supported_file(filename: str) -> bool:
    ext = os.path.splitext(filename)[1].lower()
    all_extensions = (
        SUPPORTED_EXTENSIONS['basic'] + 
        SUPPORTED_EXTENSIONS['image'] + 
        SUPPORTED_EXTENSIONS['audio']
    )
    return ext in all_extensions

def get_conversion_type(filename: str) -> str:
    if is_image(filename):
        return 'image'
    return 'basic'