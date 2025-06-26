# 🥔 Potato Disease Classification

This project uses deep learning to detect and classify diseases in potato leaves from images. It's an end-to-end machine learning pipeline that includes data preprocessing, model training, evaluation, and prediction.

---

## 🔍 Problem Statement

Diseases in crops like potatoes can severely affect yield and quality. This project aims to automate the identification of three common potato leaf diseases using image classification:

- **Early Blight**
- **Late Blight**
- **Healthy Leaves**

---

## 🚀 Features

- 📸 Image upload and disease prediction
- 🧠 Trained deep learning model (CNN-based using Keras or PyTorch)
- 📊 Accuracy, loss charts, and confusion matrix
- 💾 Model saving and loading
- 🖼️ Real-time or batch inference support

---

## 🛠️ Tech Stack

- **Backend:** Python, TensorFlow / Keras, OpenCV
- **Frontend:** React.js
- **Environment:** Jupyter Notebook, VSCode
- **Tools:** Matplotlib, scikit-learn, NumPy, Pandas

---

## 🧪 Dataset

- **Source:** [PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)
- **Classes:** `Early Blight`, `Late Blight`, `Healthy`
- **Format:** JPEG/PNG leaf images

---

## 🧠 Model Summary

- CNN with convolutional, pooling, and dense layers
- Trained using categorical crossentropy loss
- Optimizer: Adam
- Validation accuracy ~90%+

---

## 🧾 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/devmistry27/Potato-Disease-Classification.git
cd Potato-Disease-Classification

# Create a virtual environment
python -m venv myenv
source myenv/bin/activate  # For Windows: .\myenv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

## 📷 How to Use

1. Run the training notebook or script to train the model.
2. Save the model to the `models/` directory.
3. Use `app.py` to start the API for predictions.
4. Optionally, launch the frontend for image upload.

---

## 🙋‍♂️ Author

**Dev Mistry**  
GitHub • [LinkedIn](https://www.linkedin.com/in/devm27/) 

---

⭐️ *Star this repo if you find it useful!*
