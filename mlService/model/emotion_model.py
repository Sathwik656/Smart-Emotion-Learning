import tensorflow as tf
from tensorflow.keras import layers, models
import os

def create_dummy_model():
    model = models.Sequential([
        layers.Input(shape=(48, 48, 1)),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(7, activation='softmax') # 7 emotion classes
    ])

    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    
    # Save to the path expected by .env
    model_path = os.path.join(os.path.dirname(__file__), 'emotion_model.h5')
    model.save(model_path)
    print(f"Dummy model created at {model_path}")

if __name__ == "__main__":
    create_dummy_model()
