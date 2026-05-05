import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
import os

# =========================
# CONFIG
# =========================
CSV_PATH = "D:/Smart-Emotion/emotion-training/fer2013.csv"
IMG_SIZE = 48
BATCH_SIZE = 64
EPOCHS = 30
MODEL_SAVE_PATH = "models/emotion_model.h5"

# =========================
# LOAD DATA
# =========================
def load_fer2013(csv_path):
    data = pd.read_csv(csv_path)

    pixels = data['pixels'].tolist()
    emotions = data['emotion'].values

    images = []
    for pixel_seq in pixels:
        img = np.fromstring(pixel_seq, dtype=int, sep=' ')
        img = img.reshape(48, 48)
        images.append(img)

    images = np.array(images)
    images = images / 255.0  # normalize
    images = np.expand_dims(images, -1)  # (N,48,48,1)

    return images, emotions


# =========================
# MODEL
# =========================
def build_model():
    model = models.Sequential([
        layers.Input(shape=(48, 48, 1)),

        layers.Conv2D(64, (3,3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(2,2),

        layers.Conv2D(128, (3,3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(2,2),

        layers.Conv2D(256, (3,3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(2,2),

        layers.Flatten(),

        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),

        layers.Dense(7, activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    return model


# =========================
# MAIN TRAINING PIPELINE
# =========================
def main():
    print("Loading dataset...")
    X, y = load_fer2013(CSV_PATH)

    print("Splitting dataset...")
    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    print("Setting up data augmentation...")
    datagen = ImageDataGenerator(
        rotation_range=10,
        width_shift_range=0.1,
        height_shift_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True
    )

    datagen.fit(X_train)

    print("Building model...")
    model = build_model()
    model.summary()

    print("Setting callbacks...")
    callbacks = [
        tf.keras.callbacks.ModelCheckpoint(
            MODEL_SAVE_PATH,
            monitor='val_accuracy',
            save_best_only=True,
            verbose=1
        ),
        tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True
        ),
        tf.keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.2,
            patience=3,
            min_lr=1e-6
        )
    ]

    print("Training started...")
    history = model.fit(
        datagen.flow(X_train, y_train, batch_size=BATCH_SIZE),
        validation_data=(X_val, y_val),
        epochs=EPOCHS,
        callbacks=callbacks
    )

    print("Evaluating...")
    val_loss, val_acc = model.evaluate(X_val, y_val)
    print(f"Validation Accuracy: {val_acc:.4f}")

    print(f"Saving model to {MODEL_SAVE_PATH}")
    os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
    model.save(MODEL_SAVE_PATH)

    print("Training complete.")


if __name__ == "__main__":
    main()