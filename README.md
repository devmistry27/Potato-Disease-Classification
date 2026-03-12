# AgriScan AI — Potato Disease Detection

<div align="center">

![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![React](https://img.shields.io/badge/React-17.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

**An end-to-end deep learning application for automated potato leaf disease detection using Convolutional Neural Networks.**

[Report a Bug](https://github.com/devmistry27/Potato-Disease-Classification/issues) · [Request Feature](https://github.com/devmistry27/Potato-Disease-Classification/issues)

</div>

---

## Overview

Potato crop diseases — primarily **Early Blight** and **Late Blight** — are responsible for significant agricultural losses worldwide. Manual, field-level identification is slow, error-prone, and requires specialist knowledge that is often unavailable to smallholder farmers.

This project provides a full-stack AI tool that can diagnose a potato leaf disease from a single photograph in seconds. A farmer or agronomist can upload a photo of a leaf to the web interface and immediately receive a diagnosis with a confidence score, requiring no technical expertise.

The system is built as a complete pipeline — from raw dataset ingestion and CNN model training, to a REST API and a polished, mobile-friendly React frontend — with a serverless Google Cloud deployment path for production use.

---

## Features

- Drag-and-drop image upload with support for any standard image format
- CNN-powered inference trained on the PlantVillage dataset, achieving ~90%+ validation accuracy
- Real-time predictions returned within seconds via a FastAPI REST endpoint
- Color-coded confidence scores for instant visual feedback (High / Medium / Low)
- Dual deployment support — runs locally via FastAPI or fully serverlessly on Google Cloud Functions
- Data augmentation experimentation via a dedicated `ImageDataGenerator` notebook
- Premium dark-themed UI (AgriScan AI) with glassmorphism card, skeleton loading states, bento-box result layout, and animated confidence progress bar

---

## Tech Stack

| Layer | Technology |
|---|---|
| ML Framework | TensorFlow 2.x / Keras |
| Backend API | FastAPI, Uvicorn |
| Frontend | React 17, Material-UI v4 |
| UI Typography | Inter (Google Fonts) |
| Image Upload Widget | `material-ui-dropzone` |
| HTTP Client | Axios |
| Image Processing | Pillow (PIL), NumPy |
| Cloud Storage | Google Cloud Storage (GCS) |
| Cloud Compute | Google Cloud Functions |
| Backend Deployment | Vercel (Python Serverless Runtime) |
| Development Environment | Jupyter Notebook, Python `venv` |

---

## Project Structure

```
Potato_Disease_Classification/
│
├── training.ipynb               # Main model training & evaluation notebook
│
├── dataset/                     # PlantVillage dataset (3 class subdirectories)
│   ├── Potato___Early_blight/
│   ├── Potato___Late_blight/
│   └── Potato___healthy/
│
├── backend/                     # FastAPI prediction server
│   ├── main.py                  # API entrypoint (/ping, /predict)
│   ├── models/                  # Saved Keras model weights (.keras)
│   ├── requirements.txt
│   └── vercel.json              # Vercel serverless deployment config
│
├── frontend/                    # React web application
│   ├── public/
│   └── src/
│       ├── App.js               # Root component
│       ├── home.js              # Main ImageUpload UI component
│       ├── bg.png               # Original background image (superseded by CSS gradient)
│       ├── index.css
│       └── .env                 # API URL environment variable (not committed)
│
├── gcp/                         # Google Cloud Function for serverless inference
│   ├── main.py                  # Cloud Function entrypoint (predict)
│   └── requirements.txt
│
└── ImageDataGenerator/          # Augmentation experiments (standalone)
    ├── imageDataGenerator.ipynb
    ├── dataset/
    └── models/
```

### Architectural Flow

```
[User Browser]
      |  (drag & drop leaf image)
      v
[React Frontend :3000]
      |  POST /predict (multipart/form-data)
      v
[FastAPI Backend :8000]  --OR--  [GCP Cloud Function]
      |                                   |
      |  (loads model.keras from disk)    |  (lazy-loads from GCS bucket)
      v                                   v
[TensorFlow / Keras CNN Model]
      |  returns { "class": "...", "confidence": 0.97 }
      v
[React UI renders result + color-coded confidence badge]
```

---

## Getting Started

### Prerequisites

Ensure the following are installed on your system before proceeding.

| Tool | Version | Download |
|---|---|---|
| Python | 3.9 or higher | [python.org](https://www.python.org/downloads/) |
| Node.js | 16 or higher | [nodejs.org](https://nodejs.org/) |
| npm | Comes with Node.js | — |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/devmistry27/Potato-Disease-Classification.git
cd Potato-Disease-Classification
```

**2. Set up the Python backend**

```bash
# Create and activate a virtual environment
python -m venv myenv

# macOS / Linux
source myenv/bin/activate

# Windows
.\myenv\Scripts\activate

# Install backend dependencies
pip install -r backend/requirements.txt
```

**3. Set up the React frontend**

```bash
cd frontend
npm install
```

**4. Configure environment variables**

Create a `.env` file inside the `frontend/` directory. A template is provided:

```bash
cp frontend/.env.example frontend/.env
```

Open `frontend/.env` and set the API URL:

```env
# For local development
REACT_APP_API_URL=http://localhost:8000/predict
```

---

## Usage

### Step 1 — Train the Model

Open and run all cells in the Jupyter notebook to train the CNN and save the model:

```bash
# From the project root (with myenv activated)
jupyter notebook training.ipynb
```

After training completes, the model is saved to:

```
backend/models/model.keras
```

### Step 2 — Start the Backend API

```bash
# Ensure myenv is activated, then from the backend/ directory:
cd backend
uvicorn main:app --host localhost --port 8000 --reload
```

Verify the server is running by visiting [http://localhost:8000/ping](http://localhost:8000/ping). You should see:

```html
<h1>Hello, I am alive!</h1>
```

**API Endpoints**

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/ping` | Health check |
| `POST` | `/predict` | Accepts a leaf image, returns class and confidence |

**Example request using `curl`:**

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/leaf.jpg"
```

**Example response:**

```json
{
  "class": "Early Blight",
  "confidence": 0.9731
}
```

### Step 3 — Start the React Frontend

Open a new terminal window:

```bash
cd frontend
npm start
```

The application will open automatically at [http://localhost:3000](http://localhost:3000).

**Using the application:**

1. Drag and drop a potato leaf image onto the upload area, or click to browse.
2. The image is automatically sent to the backend for analysis.
3. The predicted disease class and confidence score are displayed on screen.
4. Click **"Analyse Another Image"** to reset and classify a new image.

---

## Cloud Deployment (Google Cloud Functions)

The `gcp/` directory contains a standalone Cloud Function that loads the trained model from a Google Cloud Storage bucket, enabling fully serverless inference.

**Prerequisites:** A GCP project with the Cloud Functions and Cloud Storage APIs enabled.

**1. Upload the trained model to GCS:**

```bash
gsutil cp backend/models/model.keras gs://potato-disease-classify/models/model.keras
```

**2. Deploy the Cloud Function:**

```bash
gcloud functions deploy predict \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --source gcp/ \
  --entry-point predict
```

**3. Update the frontend `.env` with your Cloud Function URL:**

```env
REACT_APP_API_URL=https://REGION-PROJECT_ID.cloudfunctions.net/predict
```

> **Note:** The first request will incur a cold-start delay while the model is downloaded from GCS. Subsequent requests use the globally cached model and respond significantly faster.

---

## Contributing

Contributions are welcome. Please follow the steps below.

1. Fork the repository on GitHub.

2. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit with a descriptive message:
   ```bash
   git commit -m "feat: add support for tomato disease classification"
   ```

4. Push the branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request against the `main` branch of this repository with a clear description of the changes and their purpose.

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Please prefix commit messages with `feat:`, `fix:`, `docs:`, `refactor:`, etc.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.

---

## Author

**Dev Mistry**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/devm27/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/devmistry27)
