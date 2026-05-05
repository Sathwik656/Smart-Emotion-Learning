import base64
import numpy as np
import cv2
import os
from dotenv import load_dotenv

load_dotenv()

CASCADE_PATH = os.getenv("CASCADE_PATH")

# Use built-in OpenCV cascades if the configured path is invalid or empty
if not CASCADE_PATH or not os.path.exists(CASCADE_PATH) or os.path.getsize(CASCADE_PATH) == 0:
    CASCADE_PATH = os.path.join(cv2.data.haarcascades, 'haarcascade_frontalface_default.xml')

face_cascade = cv2.CascadeClassifier(CASCADE_PATH)

def decode_base64_image(base64_string):
    if "," in base64_string:
        base64_string = base64_string.split(",")[1]
    img_data = base64.b64decode(base64_string)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

def detect_face(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    if len(faces) == 0:
        return None

    x, y, w, h = faces[0]
    return gray[y:y+h, x:x+w]

def preprocess_face(face):
    face = cv2.resize(face, (48, 48))
    face = face / 255.0
    face = np.reshape(face, (1, 48, 48, 1))
    return face