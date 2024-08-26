from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import json
import numpy as np
import bz2file as bz2
import uvicorn
import tensorflow_hub
from dotenv import load_dotenv
from io import BytesIO
from PIL import Image
import tensorflow as tf
import base64
import os

load_dotenv()
app = FastAPI()
PORT = int(os.getenv('PORT'))
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class model_input(BaseModel):
    
    Crop : int
    Crop_Year : int
    Season : int
    State : int
    Area : float
    Production : int
    Annual_Rainfall :  float
    Fertilizer :  float
    Pesticide :  float
    

# loading the saved model
model = bz2.BZ2File("yield_model_cmp.pbz2", "rb")
model = pickle.load(model)

@app.post('/yield_prediction')
def yield_pred(input_parameters : model_input):
    
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    crop = input_dictionary['Crop']
    cy = input_dictionary['Crop_Year']
    season = input_dictionary['Season']
    state = input_dictionary['State']
    area = input_dictionary['Area']
    prod = input_dictionary['Production']
    ar = input_dictionary['Annual_Rainfall']
    fert = input_dictionary['Fertilizer']
    pest = input_dictionary['Pesticide']


    input_list = [crop,cy,season,state,area,prod,ar,fert,pest]
    
    a=np.array(input_list)
    a = a.reshape(1, -1)
    prediction = model.predict(a)
    print(prediction)
    return prediction[0]

MODEL = tf.keras.models.load_model("./models/model_1.h5")

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


unique_diseases = ['Healthy', 'Mosaic', 'RedRot', 'Rust', 'Yellow']
def get_pred_label(prediction_probabs):
    return unique_diseases[np.argmax(prediction_probabs)]

IMG_SIZE = 224
BATCH_SIZE = 32

def process_image(image_path, img_size=IMG_SIZE):
    image = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.convert_image_dtype(image,tf.float32)
    image = tf.image.resize(image, size=[IMG_SIZE, IMG_SIZE])
    return image

def create_data_batches(X):
    data = tf.data.Dataset.from_tensor_slices((tf.constant(X)))
    data_batch = data.map(process_image).batch(BATCH_SIZE)
    return data_batch

def load_model(model_path):
    model = tf.keras.models.load_model(model_path,
                                        custom_objects={"KerasLayer": tensorflow_hub.KerasLayer})
    return model

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_base64_image(data: str) -> np.ndarray:
    try:
        image_data = base64.b64decode(data)
        print(image_data)
        image = np.array(Image.open(BytesIO(image_data)))
        return image
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image data")

class ImageData(BaseModel):
    plant : str
    base64_image: str


@app.post("/predict-disease")
async def predict(image_data: ImageData):
    print('here')
    plant = image_data['plant']
    image = read_base64_image(image_data.base64_image)
    
    if plant=='Potato':
        img_batch = np.expand_dims(image, 0)
        predictions = MODEL.predict(img_batch)

        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        return {
            'class': predicted_class,
            'confidence': float(confidence)*100
        }
    if plant=='Sugarcane':
        loaded_model = load_model("models/20240825-04331724560420-Base_Sugarcane.h5")
        custom_img_path = ["decoded_image.jpg"]
        custom_data = create_data_batches(custom_img_path)
        custom_preds = loaded_model.predict(custom_data)
        confidence = np.max(custom_preds) * 100
        custom_pred_label = get_pred_label(custom_preds[0])
        response = {
            'Predicted': custom_pred_label,
            'Confidence': f"{confidence:2.0f}%"
        }

if __name__=="__main__":
    uvicorn.run(app, host='localhost', port=PORT)
    print("yield server listening")


