<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:1e3a8a,100:06b6d4&height=220&section=header&text=MAILSHIELD&fontSize=58&fontColor=ffffff&fontAlignY=38&desc=AI-Powered%20Email%20Spam%20Detection&descAlignY=62&descSize=20&animation=fadeIn" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=22&duration=2800&pause=900&color=06B6D4&center=true&vCenter=true&width=850&lines=Detect+Spam+with+NLP+%2B+Machine+Learning;TF-IDF+%2B+URL+Feature+Engineering;Linear+SVM+%7C+99.27%25+F1-Score;From+Raw+Email+to+Real-Time+Prediction" alt="Typing SVG"/>

<br/><br/>

<a href="https://github.com/mukherjeesarbottam-gif/MailShield">
<img src="https://img.shields.io/badge/PROJECT-MailShield-06B6D4?style=for-the-badge&logo=shield&logoColor=white"/>
</a>
<img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/NLP-TF--IDF-8B5CF6?style=for-the-badge"/>
<img src="https://img.shields.io/badge/ML-LinearSVC-F59E0B?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Streamlit-Coming%20Soon-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white"/>

<br/><br/>

**An end-to-end NLP and Machine Learning system for intelligent email spam detection.**

</div>

---

# 🛡️ MailShield

> **Detect spam. Analyze links. Protect inboxes.**

MailShield is an **NLP-powered email classification system** designed to distinguish between legitimate emails (**HAM**) and unwanted or malicious emails (**SPAM**).

The system combines **textual NLP features** with **engineered URL-based security signals** and classifies emails using a **Linear Support Vector Machine**.

The final experimental model achieved:

<div align="center">

| 🎯 Accuracy | 🎯 Precision |  🎯 Recall | 🏆 F1 Score |
| :---------: | :----------: | :--------: | :---------: |
|  **99.24%** |  **99.23%**  | **99.30%** |  **99.27%** |

</div>

---

# ✨ Why MailShield?

Traditional text classification can identify many spam patterns from words alone.

However, suspicious emails frequently contain **links, redirects, fake login pages, account-verification URLs, and other URL-based indicators**.

MailShield therefore uses two complementary information sources:

```text
┌──────────────────────────────────────────────────────────────┐
│                        INCOMING EMAIL                         │
└──────────────────────────────┬───────────────────────────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │   EMAIL TEXT    │         │      URLs       │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ NLP PREPROCESS  │         │ URL ANALYSIS    │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │    TF-IDF       │         │  9 URL FEATURES │
        │ 100,000 FEATURES│         │                 │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 └─────────────┬─────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   FEATURE FUSION    │
                    │   100,009 FEATURES  │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │     LINEAR SVM      │
                    └──────────┬──────────┘
                               ▼
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
          ✅ HAM / SAFE                🚨 SPAM
```

---

# 🧠 Machine Learning Pipeline

```text
Dataset
   │
   ▼
Data Integration
   │
   ▼
Data Quality Analysis
   │
   ▼
Text Cleaning
   │
   ├── MIME decoding
   ├── HTML removal
   ├── whitespace normalization
   ├── URL normalization
   └── email normalization
   │
   ▼
NLP Preprocessing
   │
   ├── Tokenization
   ├── Stopword processing
   └── Lemmatization
   │
   ▼
Feature Engineering
   │
   ├───────────────┐
   ▼               ▼
 TF-IDF          URL Features
   │               │
   │          ┌────┴─────────────┐
   │          │ 9 engineered     │
   │          │ URL signals      │
   │          └────┬─────────────┘
   │               │
   └───────┬───────┘
           ▼
    Feature Fusion
           │
           ▼
      Linear SVM
           │
           ▼
    HAM / SPAM
```

---

# 🔬 NLP Processing

The text preprocessing pipeline handles several real-world email characteristics.

### Processing stages

* MIME-encoded subject decoding
* HTML removal
* whitespace normalization
* control-character removal
* email address normalization
* URL normalization
* lowercasing
* tokenization
* stopword processing
* lemmatization

Special signals are preserved:

```text
URL
EMAIL
numbers
punctuation
```

This is intentional because spam emails often rely on unusual formatting, numbers, symbols, URLs, and contact patterns.

---

# 🔗 URL Intelligence

MailShield does not simply check whether an email contains a URL.

It extracts **nine URL-related features**:

| Feature                | Purpose                 |
| ---------------------- | ----------------------- |
| `url_count_extracted`  | Number of URLs          |
| `http_count`           | HTTP link count         |
| `https_count`          | HTTPS link count        |
| `ip_url_count`         | IP-address based URLs   |
| `short_url_count`      | Known URL shorteners    |
| `suspicious_url_count` | Suspicious URL keywords |
| `avg_url_length`       | Average URL length      |
| `max_url_length`       | Maximum URL length      |
| `unique_domain_count`  | Unique domains          |

This allows the model to consider both:

> **What does the email say?**

and

> **What kind of links does the email contain?**

---

# 📊 Model Benchmark

Three classical machine-learning algorithms were evaluated.

<div align="center">

| Model                         |   Accuracy |  Precision |     Recall |         F1 |
| :---------------------------- | ---------: | ---------: | ---------: | ---------: |
| Multinomial Naive Bayes       |     97.18% |     98.93% |     95.61% |     97.24% |
| Logistic Regression           |     98.65% |     98.55% |     98.86% |     98.70% |
| Linear SVM                    |     99.23% |     99.27% |     99.25% |     99.26% |
| **Linear SVM + URL Features** | **99.24%** | **99.23%** | **99.30%** | **99.27%** |

</div>

### 🏆 Best Model

**Linear SVM + TF-IDF + URL Feature Engineering**

```text
Accuracy   → 99.24%
Precision  → 99.23%
Recall     → 99.30%
F1 Score   → 99.27%
```

---

# 🎯 Confusion Matrix

```text
                    PREDICTED
                 HAM       SPAM
              ┌────────┬────────┐
ACTUAL  HAM   │  7,853 │     66 │
              ├────────┼────────┤
        SPAM  │     60 │  8,519 │
              └────────┴────────┘
```

### Interpretation

* **7,853** legitimate emails correctly classified
* **8,519** spam emails correctly classified
* **66** legitimate emails incorrectly classified as spam
* **60** spam emails incorrectly classified as legitimate

---

# 🗃️ Dataset

The training corpus was constructed by combining multiple public email datasets.

### Sources

* SpamAssassin
* Nigerian Fraud
* Enron
* Ling
* CEAS 08
* Nazario

### Final Dataset

```text
Total Emails       : 82,486
HAM                : 39,595
SPAM               : 42,891
```

The consolidated `phishing_email.csv` file was not added as another training source because its records correspond to the combined source datasets.

> The raw dataset is intentionally excluded from the GitHub application repository.

---

# 🧩 Feature Representation

The final classifier receives:

```text
┌──────────────────────────────────────────────┐
│                 FEATURE SPACE                │
├──────────────────────────────────────────────┤
│                                              │
│   TF-IDF                     URL Features    │
│   100,000                   +      9         │
│                                              │
└──────────────────────┬───────────────────────┘
                       ▼
                100,009 FEATURES
                       │
                       ▼
                  Linear SVM
```

### TF-IDF Configuration

```python
TfidfVectorizer(
    lowercase=False,
    max_features=100000,
    ngram_range=(1, 2),
    min_df=2,
    sublinear_tf=True
)
```

---

# 🏗️ Project Architecture

```text
MailShield/
│
├── app/
│   └── app.py
│
├── src/
│   ├── __init__.py
│   ├── preprocessing.py
│   ├── features.py
│   └── predict.py
│
├── models/
│   ├── tfidf_vectorizer.pkl
│   ├── url_scaler.pkl
│   └── spam_classifier_svm.pkl
│
├── data/
│   └── README.md
│
├── requirements.txt
├── .gitignore
└── README.md
```

---

# ⚙️ Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=python,sklearn,pandas,numpy,streamlit,git,github,vscode&perline=8" />

</div>

### Core Technologies

| Technology       | Role                    |
| :--------------- | :---------------------- |
| 🐍 Python        | Core development        |
| 🧠 Scikit-learn  | Machine learning        |
| 📝 TF-IDF        | Text feature extraction |
| 🔤 NLTK          | NLP preprocessing       |
| 🧹 BeautifulSoup | HTML cleaning           |
| 📊 Pandas        | Data processing         |
| 🔢 NumPy         | Numerical computation   |
| ⚡ SciPy          | Sparse feature fusion   |
| 💾 Joblib        | Model serialization     |
| 🎨 Streamlit     | Web application         |
| 🐙 GitHub        | Version control         |
| 💻 VS Code       | Development environment |

---

# 📁 Repository Structure

```text
📦 MailShield
│
├── 📂 app
│   └── 🟦 app.py
│
├── 📂 src
│   ├── 🟦 preprocessing.py
│   ├── 🟦 features.py
│   ├── 🟦 predict.py
│   └── 🟦 __init__.py
│
├── 📂 models
│   ├── 🧠 tfidf_vectorizer.pkl
│   ├── 📐 url_scaler.pkl
│   └── 🧠 spam_classifier_svm.pkl
│
├── 📂 data
│   └── 📄 README.md
│
├── 📄 requirements.txt
├── 📄 .gitignore
└── 📄 README.md
```

---

# 🚀 Local Setup

Clone the repository:

```bash
git clone https://github.com/mukherjeesarbottam-gif/MailShield.git
```

Move into the project:

```bash
cd MailShield
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# ▶️ Run MailShield

Once the Streamlit interface is connected:

```bash
streamlit run app/app.py
```

The application will open in your browser.

---

# 🖥️ Application Concept

The planned user experience is intentionally simple.

```text
╭────────────────────────────────────────────╮
│                                            │
│             🛡️ MAILSHIELD                  │
│        AI Email Security Analysis           │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ Email Subject                              │
│ ┌────────────────────────────────────────┐ │
│ │ Enter your email subject...            │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ Email Body                                 │
│ ┌────────────────────────────────────────┐ │
│ │ Paste your email here...               │ │
│ │                                        │ │
│ │                                        │ │
│ └────────────────────────────────────────┘ │
│                                            │
│          🔍 ANALYZE EMAIL                  │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│       🚨 SPAM DETECTED                     │
│                                            │
│       URLs Detected: 2                     │
│       Decision Score: 4.82                 │
│                                            │
╰────────────────────────────────────────────╯
```

The user does **not** need to understand the underlying ML pipeline.

They simply:

**Paste email → Analyze → Receive result.**

---

# 🔄 Inference Pipeline

The deployed application will use the exact same feature pipeline as training.

```text
User Email
    │
    ▼
Subject + Body
    │
    ▼
Preprocessing
    │
    ├───────────────┐
    ▼               ▼
TF-IDF            URL Extraction
    │               │
    │               ▼
    │          URL Feature Engine
    │               │
    │               ▼
    │          URL Scaler
    │               │
    └───────┬───────┘
            ▼
      Feature Fusion
            │
            ▼
       Saved Linear SVM
            │
            ▼
      ┌─────┴─────┐
      ▼           ▼
    HAM         SPAM
```

---

# 🔐 Privacy & Security

MailShield is an educational and research-oriented spam classification system.

Users should **not submit passwords, authentication tokens, financial information, confidential business information, or other sensitive content** unless the deployed application has appropriate privacy protections.

The model should be treated as a classification aid rather than a replacement for enterprise email security systems.

---

# ⚠️ Limitations

The reported performance is based on a held-out test set and may not represent future real-world email traffic.

Potential limitations include:

* Dataset bias
* Distribution shift
* New spam campaigns
* Adversarial emails
* URL obfuscation
* Multilingual content
* HTML-heavy emails
* Previously unseen vocabulary
* Concept drift

A production deployment should therefore include monitoring and periodic model evaluation.

---

# 🔮 Future Roadmap

### Phase 1 — Completed

* [x] Dataset integration
* [x] Data quality analysis
* [x] Text cleaning
* [x] NLP preprocessing
* [x] TF-IDF feature extraction
* [x] Multiple ML models
* [x] URL feature engineering
* [x] Feature fusion
* [x] Model evaluation
* [x] Final model selection
* [x] Reusable prediction pipeline

### Phase 2 — In Progress

* [ ] Streamlit UI
* [ ] Interactive email analysis
* [ ] Modern dashboard
* [ ] GitHub project integration

### Phase 3 — Future

* [ ] Public deployment
* [ ] Explainable AI
* [ ] Transformer-based classifier
* [ ] Advanced URL reputation
* [ ] Sender/domain analysis
* [ ] Multilingual detection
* [ ] Continuous retraining
* [ ] Real-time monitoring

---

# 📚 Key Learning Outcomes

Through this project, the following concepts were implemented:

* Natural Language Processing
* Text normalization
* Tokenization
* Stopword processing
* Lemmatization
* TF-IDF
* N-gram features
* Sparse matrices
* URL feature engineering
* Feature scaling
* Naive Bayes
* Logistic Regression
* Linear SVM
* Model evaluation
* Confusion matrices
* Precision / Recall / F1
* Model serialization
* Reusable inference pipelines
* Streamlit deployment architecture

---

# 👨‍💻 Author

<div align="center">

### Sarbottam Mukherjee

**AI/ML • NLP • Machine Learning**

<br/>

<a href="https://github.com/mukherjeesarbottam-gif">
<img src="https://img.shields.io/badge/GitHub-Sarbottam%20Mukherjee-181717?style=for-the-badge&logo=github"/>
</a>

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,50:1e3a8a,100:0f172a&height=120&section=footer" width="100%"/>

### 🛡️ MAILSHIELD

**AI-powered protection against unwanted email.**

⭐ If you find this project useful, consider giving it a star.

</div>

