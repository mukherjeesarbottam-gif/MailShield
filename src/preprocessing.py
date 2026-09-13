import re
import pandas as pd
from bs4 import BeautifulSoup
from email.header import decode_header

def decode_mime_text(text):
    if pd.isna(text):
        return ""
    text = str(text)
    try:
        decoded_parts = decode_header(text)
        result = ""
        for part, encoding in decoded_parts:
            if isinstance(part, bytes):
                result += part.decode(encoding or "utf-8", errors="ignore")
            else:
                result += part
        return result
    except Exception:
        return text

def clean_email_text(subject, body):
    subject = decode_mime_text(subject)
    body = "" if pd.isna(body) else str(body)
    
    # Remove HTML
    body = BeautifulSoup(body, "html.parser").get_text(" ")
    
    # Combine
    text = subject + " " + body
    
    # Remove control characters
    text = re.sub(r"[\r\n\t]+", " ", text)
    
    # Normalize URLs
    text = re.sub(r'https?://\S+|www\.\S+', ' URL ', text)
    
    # Normalize email addresses
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', ' EMAIL ', text)
    
    # Normalize whitespace
    text = re.sub(r"\s+", " ", text).strip()
    
    # Lowercase
    text = text.lower()
    
    return text
