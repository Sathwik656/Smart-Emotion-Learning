from fastapi import APIRouter
from app.schemas.predict_schema import PredictRequest
from app.utils.image import decode_base64_image, detect_face, preprocess_face
from app.services.inference import predict_emotion
from app.utils.model_loader import get_model

# Ensure model is loaded at startup
get_model()

router = APIRouter()

@router.post("/predict")
async def predict(data: PredictRequest):
    image = decode_base64_image(data.image)

    face = detect_face(image)
    if face is None:
        return {
            "success": False,
            "message": "No face detected"
        }

    processed = preprocess_face(face)

    emotion, confidence = predict_emotion(processed)

    return {
        "success": True,
        "emotion": emotion,
        "confidence": confidence
    }