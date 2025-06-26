from google.cloud import storage
import tensorflow as tf
from PIL import Image
import numpy as np
from flask import jsonify
import traceback

model = None
class_names = ["Early Blight", "Late Blight", "Healthy"]
BUCKET_NAME = "potato-disease-classify"


def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    try:
        print(
            f"📦 Downloading model: {source_blob_name} from bucket: {bucket_name}")
        storage_client = storage.Client()
        bucket = storage_client.get_bucket(bucket_name)
        blob = bucket.blob(source_blob_name)
        blob.download_to_filename(destination_file_name)
        print(f"✅ Model downloaded to {destination_file_name}")
    except Exception as e:
        print(f"❌ Failed to download model: {str(e)}")
        raise


def predict(request):
    global model

    # 🌐 Handle CORS preflight request
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)

    try:
        print("📥 Received a request")

        if request.method != "POST":
            print("⚠️ Invalid request method:", request.method)
            response = jsonify({"error": "Only POST requests are allowed"})
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 405

        if "file" not in request.files:
            print("⚠️ File not found in request")
            response = jsonify({"error": "No file provided"})
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400

        image_file = request.files["file"]

        if model is None:
            print("⬇️ Loading model from GCS...")
            download_blob(
                BUCKET_NAME,
                "models/model.keras",
                "/tmp/model.keras",
            )
            model = tf.keras.models.load_model("/tmp/model.keras")
            print("✅ Model loaded successfully")

        # Image processing
        print("🖼️ Processing image...")
        image = Image.open(image_file).convert("RGB").resize((256, 256))
        image = np.array(image) / 255.0
        print("✅ Image shape:", image.shape, "Dtype:", image.dtype)

        img_array = tf.expand_dims(image, 0)
        predictions = model.predict(img_array)
        print("🔮 Raw Predictions:", predictions)

        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = float(round(100 * np.max(predictions[0]), 2))

        print(
            f"✅ Predicted class: {predicted_class}, confidence: {confidence}%")

        response = jsonify({
            "class": predicted_class,
            "confidence": confidence
        })
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        print("❌ Exception occurred:", str(e))
        traceback.print_exc()
        error_response = jsonify({"error": str(e)})
        error_response.headers.add("Access-Control-Allow-Origin", "*")
        return error_response, 500
