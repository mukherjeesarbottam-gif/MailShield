import os
import joblib
import pandas as pd
import numpy as np
from scipy.sparse import hstack, csr_matrix

from .preprocessing import clean_email_text
from .features import extract_urls_from_text, calculate_url_features, url_feature_columns

# Global variables to store loaded models
_tfidf_vectorizer = None
_url_scaler = None
_svm_model = None

def load_models(models_dir="models"):
    """Load the trained models into memory if not already loaded."""
    global _tfidf_vectorizer, _url_scaler, _svm_model
    
    if _tfidf_vectorizer is None:
        _tfidf_vectorizer = joblib.load(os.path.join(models_dir, "tfidf_vectorizer.pkl"))
    if _url_scaler is None:
        _url_scaler = joblib.load(os.path.join(models_dir, "url_scaler.pkl"))
    if _svm_model is None:
        _svm_model = joblib.load(os.path.join(models_dir, "spam_classifier_svm.pkl"))

def predict_email(subject, body, models_dir="models"):
    """
    Predict whether an email is HAM or SPAM.
    Returns a dictionary with prediction, decision_score, and url stats.
    """
    load_models(models_dir)
    
    # 1. Clean text
    cleaned_text = clean_email_text(subject, body)
    
    # 2. TF-IDF
    tfidf_features = _tfidf_vectorizer.transform([cleaned_text])
    
    # 3. Raw email text for URL extraction
    raw_text = ("" if pd.isna(subject) else str(subject)) + " " + ("" if pd.isna(body) else str(body))
    
    # 4. Extract URLs
    extracted_urls = extract_urls_from_text(raw_text)
    
    # 5. Calculate URL features
    url_feature_dict = calculate_url_features(extracted_urls)
    
    # 6. Create URL feature vector
    url_vector = np.array([url_feature_dict[column] for column in url_feature_columns]).reshape(1, -1)
    
    # 7. Scale URL features
    url_scaled = _url_scaler.transform(url_vector)
    
    # 8. Convert to sparse
    url_sparse = csr_matrix(url_scaled)
    
    # 9. Combine TF-IDF + URL features
    combined_features = hstack([tfidf_features, url_sparse]).tocsr()
    
    # 10. Prediction
    prediction = _svm_model.predict(combined_features)[0]
    
    # 11. Decision score
    decision_score = _svm_model.decision_function(combined_features)[0]
    
    # 12. Label
    label = "SPAM" if prediction == 1 else "HAM"
    
    return {
        "prediction": label,
        "decision_score": float(decision_score),
        "url_count": len(extracted_urls),
        "suspicious_url_count": url_feature_dict["suspicious_url_count"],
        "url_stats": url_feature_dict
    }
