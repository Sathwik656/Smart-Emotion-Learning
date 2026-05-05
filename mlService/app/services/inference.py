import numpy as np
from app.utils.model_loader import get_model

EMOTION_LABELS = [
    "angry",
    "disgust",
    "fear",
    "happy",
    "sad",
    "surprise",
    "neutral"
]

def predict_emotion(processed_face):
    model = get_model()

    predictions = model.predict(processed_face)
    confidence = float(np.max(predictions))
    emotion_index = int(np.argmax(predictions))

    return EMOTION_LABELS[emotion_index], confidence