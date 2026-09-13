import sys
import os
import time

# Add parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import streamlit as st
import pandas as pd
from src.predict import predict_email

# Configure the Streamlit page
st.set_page_config(
    page_title="MAILSHIELD | AI Threat Detection",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Premium Cybersecurity Custom CSS
st.markdown("""
<style>
    /* Reset and general styling */
    html, body, [class*="st-"] {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    
    /* Background and global colors */
    .stApp {
        background-color: #050505 !important;
        color: #f0f0f0;
    }
    
    /* Hide Streamlit Chrome */
    header {visibility: hidden;}
    footer {visibility: hidden;}
    .css-1rs6os {visibility: hidden;}
    .css-17ziqus {visibility: hidden;}
    #MainMenu {visibility: hidden;}
    
    /* Subtle Grid Background for Hero */
    .hero-bg {
        position: absolute;
        top: 0; left: 0; right: 0; height: 350px;
        background-image: 
            linear-gradient(rgba(20, 20, 20, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 20, 20, 0.4) 1px, transparent 1px);
        background-size: 30px 30px;
        z-index: -1;
        opacity: 0.5;
        pointer-events: none;
    }
    
    /* Scanning line animation */
    @keyframes scan {
        0% { top: 0; opacity: 0; }
        10% { opacity: 0.5; }
        90% { opacity: 0.5; }
        100% { top: 350px; opacity: 0; }
    }
    .scan-line {
        position: absolute;
        top: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg, transparent, rgba(100, 100, 100, 0.3), transparent);
        animation: scan 4s linear infinite;
        z-index: -1;
        pointer-events: none;
    }
    
    /* Navigation Bar */
    .nav-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: rgba(5, 5, 5, 0.8);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #141414;
        margin-top: -3rem;
        margin-bottom: 2rem;
    }
    .nav-left {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        font-size: 1.1rem;
        color: #fff;
    }
    .nav-center {
        display: flex;
        gap: 24px;
        font-size: 0.85rem;
        color: #888;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    .nav-right {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.75rem;
        color: #888;
        letter-spacing: 1.5px;
    }
    .pulse-dot {
        width: 8px; height: 8px;
        background-color: #00ff66;
        border-radius: 50%;
        box-shadow: 0 0 10px #00ff66;
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 255, 102, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 102, 0); }
    }
    
    /* Hero Section */
    .hero-container {
        text-align: center;
        padding: 3rem 1rem 4rem 1rem;
    }
    .badge {
        display: inline-block;
        font-size: 0.7rem;
        letter-spacing: 2px;
        padding: 4px 12px;
        background-color: #101010;
        border: 1px solid #222;
        border-radius: 20px;
        color: #aaa;
        margin-bottom: 1.5rem;
    }
    .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        letter-spacing: -1px;
        color: #fff;
    }
    .hero-subtitle {
        font-size: 1.1rem;
        color: #666;
        max-width: 600px;
        margin: 0 auto;
    }
    
    /* Inputs */
    .stTextInput input, .stTextArea textarea {
        background-color: #0A0A0A !important;
        border: 1px solid #1a1a1a !important;
        color: #fff !important;
        font-family: inherit !important;
        transition: border-color 0.3s, box-shadow 0.3s;
        border-radius: 6px !important;
    }
    .stTextInput input:focus, .stTextArea textarea:focus {
        border-color: #333 !important;
        box-shadow: 0 0 0 1px #333 !important;
    }
    label {
        color: #888 !important;
        font-size: 0.85rem !important;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 0.5rem !important;
    }
    
    /* Button */
    .stButton > button {
        background-color: #fff !important;
        color: #050505 !important;
        font-weight: 600 !important;
        letter-spacing: 1px;
        border: none !important;
        border-radius: 4px !important;
        padding: 0.75rem 2rem !important;
        transition: all 0.3s ease !important;
        width: 100%;
        font-size: 1rem;
        margin-top: 1rem;
    }
    .stButton > button:hover {
        background-color: #ddd !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1) !important;
    }
    
    /* Analysis Card */
    .analysis-card {
        background-color: #0A0A0A;
        border: 1px solid #141414;
        border-radius: 8px;
        padding: 2rem;
        margin-top: 2rem;
    }
    .analysis-title {
        font-size: 1.2rem;
        color: #fff;
        margin-bottom: 0.2rem;
        font-weight: 600;
    }
    .analysis-subtitle {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 2rem;
    }
    
    /* Result Styling */
    .result-container {
        text-align: center;
        padding: 3rem 1rem;
        background-color: #0A0A0A;
        border: 1px solid #141414;
        border-radius: 8px;
        margin-top: 2rem;
        animation: fadeIn 0.5s ease-out forwards;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .result-label {
        font-size: 0.8rem;
        letter-spacing: 3px;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
    .result-status {
        font-size: 4rem;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        letter-spacing: -1px;
    }
    .result-desc {
        color: #888;
        font-size: 1rem;
        max-width: 500px;
        margin: 0 auto;
    }
    
    /* Spam/Ham specific */
    .is-spam .result-label { color: #ff3333; }
    .is-spam .result-status { color: #ff3333; text-shadow: 0 0 20px rgba(255,51,51,0.2); }
    
    .is-ham .result-label { color: #00ff66; }
    .is-ham .result-status { color: #00ff66; text-shadow: 0 0 20px rgba(0,255,102,0.2); }
    
    /* Metrics */
    .metric-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 2rem;
    }
    .metric-card {
        background-color: #0A0A0A;
        border: 1px solid #141414;
        border-radius: 6px;
        padding: 1.5rem;
    }
    .metric-label {
        font-size: 0.75rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 0.5rem;
    }
    .metric-value {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
    }
    
    /* Threat Meter */
    .meter-container {
        margin-top: 2rem;
        background-color: #0A0A0A;
        border: 1px solid #141414;
        border-radius: 6px;
        padding: 2rem;
    }
    .meter-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 0.8rem;
        color: #888;
        letter-spacing: 1px;
    }
    .meter-bar-bg {
        height: 6px;
        background-color: #1a1a1a;
        border-radius: 3px;
        position: relative;
        overflow: hidden;
    }
    .meter-bar-fill {
        position: absolute;
        top: 0; left: 0; bottom: 0;
        border-radius: 3px;
        transition: width 1s ease-out;
    }
    .meter-low { background: linear-gradient(90deg, #00ff66, #ffcc00); }
    .meter-high { background: linear-gradient(90deg, #ffcc00, #ff3333); }
    
    /* Detail Sections */
    .detail-section {
        margin-top: 2rem;
        background-color: #0A0A0A;
        border: 1px solid #141414;
        border-radius: 6px;
        padding: 2rem;
    }
    .detail-title {
        font-size: 1rem;
        color: #fff;
        margin-bottom: 1rem;
        font-weight: 600;
        letter-spacing: 1px;
    }
    
    .url-stat-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #141414;
        font-size: 0.9rem;
    }
    .url-stat-row:last-child {
        border-bottom: none;
    }
    .url-stat-label { color: #888; }
    .url-stat-val { color: #fff; font-weight: 500; }
    
    /* Footer */
    .footer {
        text-align: center;
        margin-top: 5rem;
        padding-bottom: 2rem;
        color: #444;
        font-size: 0.8rem;
        letter-spacing: 1px;
    }
    
    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 4rem 1rem;
        color: #444;
    }
    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.3;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# UI STRUCTURE
# ---------------------------------------------------------

# Background Effects
st.markdown("<div class='hero-bg'></div><div class='scan-line'></div>", unsafe_allow_html=True)

# Navigation
st.markdown("""
<div class='nav-bar'>
    <div class='nav-left'>
        <span style="font-size: 1.2rem;">🛡️</span> MAILSHIELD
    </div>
    <div class='nav-center'>
        <span>AI Threat Detection</span>
        <span style="color: #fff;">Live Analysis</span>
    </div>
    <div class='nav-right'>
        <div class='pulse-dot'></div> SYSTEM ONLINE
    </div>
</div>
""", unsafe_allow_html=True)

# Hero
st.markdown("""
<div class='hero-container'>
    <div class='badge'>AI EMAIL SECURITY</div>
    <h1 class='hero-title'>Protect Every Inbox.</h1>
    <p class='hero-subtitle'>AI-powered email threat detection powered by NLP and machine learning.</p>
</div>
""", unsafe_allow_html=True)

# Main container for layout
col1, col2, col3 = st.columns([1, 10, 1])

with col2:
    # Analyzer Card
    st.markdown("<div class='analysis-title'>Email Threat Analyzer</div>", unsafe_allow_html=True)
    st.markdown("<div class='analysis-subtitle'>Analyze an email for spam and phishing indicators.</div>", unsafe_allow_html=True)
    
    subject = st.text_input("Email Subject", placeholder="Enter subject...")
    body = st.text_area("Email Body", height=200, placeholder="Paste the email content here...")
    
    analyze_btn = st.button("ANALYZE EMAIL")
    
    # Results Placeholder
    result_placeholder = st.empty()
    
    if analyze_btn:
        if not subject.strip() and not body.strip():
            result_placeholder.markdown("""
            <div class='empty-state'>
                <div class='empty-icon'>🛡️</div>
                <p>Please enter an email subject or body to analyze.</p>
            </div>
            """, unsafe_allow_html=True)
        else:
            # ---------------------------------------------------------
            # LIVE ANALYSIS EXPERIENCE (Visual only)
            # ---------------------------------------------------------
            stages = [
                "Parsing email structure...",
                "Running NLP analysis...",
                "Inspecting URL indicators...",
                "Evaluating threat model..."
            ]
            
            for stage in stages:
                result_placeholder.markdown(f"""
                <div class='result-container' style='padding: 5rem 1rem;'>
                    <div class='pulse-dot' style='margin: 0 auto 1.5rem auto;'></div>
                    <div style='color: #888; font-family: monospace; letter-spacing: 1px;'>{stage}</div>
                </div>
                """, unsafe_allow_html=True)
                time.sleep(0.4)
            
            # ---------------------------------------------------------
            # PREDICTION
            # ---------------------------------------------------------
            try:
                models_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models")
                result = predict_email(subject, body, models_dir=models_dir)
                
                prediction = result["prediction"]
                score = result["decision_score"]
                url_count = result["url_count"]
                suspicious = result["suspicious_url_count"]
                stats = result["url_stats"]
                
                # Determine display classes
                if prediction == "SPAM":
                    css_class = "is-spam"
                    label = "THREAT DETECTED"
                    status = "SPAM"
                    desc = "MailShield detected characteristics associated with spam or phishing."
                else:
                    css_class = "is-ham"
                    label = "NO THREAT DETECTED"
                    status = "HAM / NOT SPAM"
                    desc = "MailShield classified this email as legitimate based on the model analysis."
                
                # Render Results
                with result_placeholder.container():
                    
                    # Main Result
                    st.markdown(f"""
                    <div class='result-container {css_class}'>
                        <div class='result-label'>{label}</div>
                        <div class='result-status'>{status}</div>
                        <div class='result-desc'>{desc}</div>
                    </div>
                    """, unsafe_allow_html=True)
                    
                    # Metrics Grid
                    st.markdown(f"""
                    <div class='metric-grid'>
                        <div class='metric-card'>
                            <div class='metric-label'>Model Decision Score</div>
                            <div class='metric-value'>{score:.3f}</div>
                        </div>
                        <div class='metric-card'>
                            <div class='metric-label'>URLs Detected</div>
                            <div class='metric-value'>{url_count}</div>
                        </div>
                        <div class='metric-card'>
                            <div class='metric-label'>Suspicious</div>
                            <div class='metric-value'>{suspicious}</div>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
                    
                    # Threat Signal Meter
                    # Map the raw score to a 0-100% width for the visual meter
                    # Usually LinearSVC scores > 0 are SPAM. Let's bound it roughly between -3 and +3
                    bounded_score = max(-3.0, min(3.0, score))
                    percentage = ((bounded_score + 3.0) / 6.0) * 100
                    meter_class = "meter-high" if score > 0 else "meter-low"
                    
                    st.markdown(f"""
                    <div class='meter-container'>
                        <div class='meter-header'>
                            <span>LOW</span>
                            <span>THREAT SIGNAL</span>
                            <span>HIGH</span>
                        </div>
                        <div class='meter-bar-bg'>
                            <div class='meter-bar-fill {meter_class}' style='width: {percentage}%;'></div>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
                    
                    # Explanation Section
                    explanation = "Classification based on learned NLP patterns and engineered URL signals."
                    if url_count > 0:
                        reasons = []
                        if suspicious > 0:
                            reasons.append(f"{suspicious} suspicious URL indicator(s) detected.")
                        if stats.get("short_url_count", 0) > 0:
                            reasons.append("Shortened URL(s) detected.")
                        if stats.get("ip_url_count", 0) > 0:
                            reasons.append("IP-based URL(s) detected.")
                            
                        if reasons:
                            explanation = "Indicators found: " + " ".join(reasons)
                        else:
                            explanation = "Classification based on learned NLP patterns. URLs present but no immediate high-risk heuristics triggered."
                            
                    st.markdown(f"""
                    <div class='detail-section'>
                        <div class='detail-title'>Why MailShield flagged this email</div>
                        <div style='color: #888; font-size: 0.95rem; line-height: 1.5;'>{explanation}</div>
                    </div>
                    """, unsafe_allow_html=True)
                    
                    # URL Security Analysis
                    if url_count > 0:
                        st.markdown(f"""
                        <div class='detail-section'>
                            <div class='detail-title'>URL Security Analysis</div>
                            <div class='url-stat-row'>
                                <span class='url-stat-label'>Total URLs</span>
                                <span class='url-stat-val'>{stats.get('url_count_extracted', 0)}</span>
                            </div>
                            <div class='url-stat-row'>
                                <span class='url-stat-label'>Suspicious URLs</span>
                                <span class='url-stat-val'>{stats.get('suspicious_url_count', 0)}</span>
                            </div>
                            <div class='url-stat-row'>
                                <span class='url-stat-label'>HTTP URLs</span>
                                <span class='url-stat-val'>{stats.get('http_count', 0)}</span>
                            </div>
                            <div class='url-stat-row'>
                                <span class='url-stat-label'>HTTPS URLs</span>
                                <span class='url-stat-val'>{stats.get('https_count', 0)}</span>
                            </div>
                            <div class='url-stat-row'>
                                <span class='url-stat-label'>IP-based URLs</span>
                                <span class='url-stat-val'>{stats.get('ip_url_count', 0)}</span>
                            </div>
                            <div class='url-stat-row'>
                                <span class='url-stat-label'>Shortened URLs</span>
                                <span class='url-stat-val'>{stats.get('short_url_count', 0)}</span>
                            </div>
                        </div>
                        """, unsafe_allow_html=True)
                        
            except Exception as e:
                result_placeholder.error(f"Error during prediction: {str(e)}")
                
    else:
        # Empty State
        result_placeholder.markdown("""
        <div class='empty-state'>
            <div class='empty-icon'>🛡️</div>
            <p style='font-size: 1.2rem; margin-bottom: 0.5rem;'>Ready to inspect.</p>
            <p style='font-size: 0.9rem; color: #666;'>Paste an email above and let MailShield analyze its threat signals.</p>
        </div>
        """, unsafe_allow_html=True)

# Footer
st.markdown("""
<div class='footer'>
    <div style='font-weight: 600; letter-spacing: 2px; margin-bottom: 0.5rem;'>MAILSHIELD</div>
    <div style='color: #666;'>AI-Powered Email Threat Detection</div>
    <div style='color: #444; margin-top: 0.5rem; font-style: italic;'>Built with NLP + Machine Learning</div>
</div>
""", unsafe_allow_html=True)
