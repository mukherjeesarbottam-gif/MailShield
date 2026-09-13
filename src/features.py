import re
import pandas as pd
from urllib.parse import urlparse

# URL patterns
url_pattern = r'https?://[^\s<>"\']+|www\.[^\s<>"\']+'
ip_url_pattern = re.compile(r'https?://(?:\d{1,3}\.){3}\d{1,3}')

short_url_domains = {
    "bit.ly", "tinyurl.com", "t.co", "goo.gl",
    "ow.ly", "is.gd", "buff.ly", "adf.ly",
    "bit.do", "cutt.ly", "rb.gy"
}

suspicious_words = {
    "login", "verify", "verification", "secure",
    "account", "update", "confirm", "password",
    "bank", "signin", "authenticate", "credential"
}

url_feature_columns = [
    "url_count_extracted",
    "http_count",
    "https_count",
    "ip_url_count",
    "short_url_count",
    "suspicious_url_count",
    "avg_url_length",
    "max_url_length",
    "unique_domain_count"
]

def extract_urls_from_text(text):
    if not text:
        return []
    return re.findall(url_pattern, str(text))

def calculate_url_features(urls):
    if not urls:
        return {
            "url_count_extracted": 0,
            "http_count": 0,
            "https_count": 0,
            "ip_url_count": 0,
            "short_url_count": 0,
            "suspicious_url_count": 0,
            "avg_url_length": 0,
            "max_url_length": 0,
            "unique_domain_count": 0
        }

    lengths = [len(url) for url in urls]
    http_count = sum(url.lower().startswith("http://") for url in urls)
    https_count = sum(url.lower().startswith("https://") for url in urls)
    ip_url_count = sum(bool(ip_url_pattern.search(url)) for url in urls)
    
    short_url_count = 0
    suspicious_url_count = 0
    domains = set()
    
    for url in urls:
        try:
            parsed = urlparse(url if url.startswith(("http://", "https://")) else "http://" + url)
            domain = parsed.netloc.lower().split(":")[0]
            if domain:
                domains.add(domain)
            if domain in short_url_domains:
                short_url_count += 1
        except Exception:
            pass
            
        url_lower = url.lower()
        if any(word in url_lower for word in suspicious_words):
            suspicious_url_count += 1

    return {
        "url_count_extracted": len(urls),
        "http_count": http_count,
        "https_count": https_count,
        "ip_url_count": ip_url_count,
        "short_url_count": short_url_count,
        "suspicious_url_count": suspicious_url_count,
        "avg_url_length": sum(lengths) / len(lengths),
        "max_url_length": max(lengths),
        "unique_domain_count": len(domains)
    }
