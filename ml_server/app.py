from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import tensorflow_hub
import tf_keras
import io
import base64

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    image_base64 = data["image_base64"]
    image_data = base64.b64decode(image_base64)
    with open("decoded_image.jpg", "wb") as file:
        file.write(image_data) 
    crop = data['crop']

    if crop == "Potato":
        # Load your trained model
        model = load_model('models/model_1.h5')

        # Define the IMAGE_SIZE
        IMAGE_SIZE = 256
        img = img.resize((IMAGE_SIZE, IMAGE_SIZE))
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0) 
        img_array = img_array / 255.0 

        predictions = model.predict(img_array)
        predicted_class_index = np.argmax(predictions, axis=1)[0]
        predicted_class_name = class_names[predicted_class_index]
        confidence = float(np.max(predictions)) * 100 

        response = {
            'Actual': predicted_class_name.split('__')[0],
            'Predicted': predicted_class_name,
            'Confidence': f"{confidence:.2f}%"
        }
    elif crop == "Sugarcane":
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
    return jsonify(response)

class_names = [
    'Potato__Healthy',
    'Potato__Early_blight',
    'Potato__Late_blight',
]

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
    model = tf_keras.models.load_model(model_path,
                                        custom_objects={"KerasLayer": tensorflow_hub.KerasLayer})
    return model

if __name__ == '__main__':
    app.run(debug=True)