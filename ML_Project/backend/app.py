from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# --------------------------------------------------
# Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Red Wine Quality Prediction API",
    description="Random Forest based Wine Quality Prediction",
    version="1.0"
)


# --------------------------------------------------
# Allow frontend to communicate with backend
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load trained Random Forest model
# --------------------------------------------------

model = joblib.load("../model/wine_quality_model.pkl")


# --------------------------------------------------
# Input data structure
# --------------------------------------------------

class WineData(BaseModel):

    fixed_acidity: float
    volatile_acidity: float
    citric_acid: float
    residual_sugar: float
    chlorides: float
    free_sulfur_dioxide: float
    total_sulfur_dioxide: float
    density: float
    pH: float
    sulphates: float
    alcohol: float


# --------------------------------------------------
# Home API
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "Red Wine Quality Prediction API is running"
    }


# --------------------------------------------------
# Prediction API
# --------------------------------------------------

@app.post("/predict")
def predict_wine(data: WineData):

    # Arrange input values in the SAME ORDER
    # used while training the Random Forest model

    input_data = [[
        data.fixed_acidity,
        data.volatile_acidity,
        data.citric_acid,
        data.residual_sugar,
        data.chlorides,
        data.free_sulfur_dioxide,
        data.total_sulfur_dioxide,
        data.density,
        data.pH,
        data.sulphates,
        data.alcohol
    ]]

    # Make prediction
    prediction = model.predict(input_data)

    quality = int(prediction[0])


    # Give a simple interpretation
    if quality <= 4:
        category = "Low Quality"

    elif quality <= 6:
        category = "Average / Good Quality"

    else:
        category = "High Quality"


    return {
        "predicted_quality": quality,
        "category": category
    }