import tensorflow as tf
import os
from dotenv import load_dotenv

load_dotenv()

MODEL_PATH = os.getenv("MODEL_PATH")

_model = None

def get_model():
    global _model
    if _model is None:
        print(f"Loading model from: {MODEL_PATH}")
        _model = tf.keras.models.load_model(MODEL_PATH)
        print("Model loaded successfully")
    return _model