from pydantic import BaseModel

class PredictRequest(BaseModel):
    image: str   # base64 string