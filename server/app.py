from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import joblib
from PIL import Image
import io
import pandas as pd
import warnings
from flask_cors import CORS  # Import the CORS library

warnings.filterwarnings('ignore')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Apply CORS globally to all routes

# Load your trained models
plant_model = tf.keras.models.load_model("Plant_Model.h5")  # Plant disease prediction model
crop_model = joblib.load("crop_recommand.pkl")  # Crop recommendation model

# Define class names for plant disease prediction
class_names = [
    'Apple - Apple Scab', 'Apple - Black Rot', 'Apple - Cedar Apple Rust', 
    'Apple - Healthy', 'Blueberry - Healthy', 'Cherry (Including Sour) - Powdery Mildew', 
    'Cherry (Including Sour) - Healthy', 'Corn (Maize) - Cercospora Leaf Spot (Gray Leaf Spot)', 
    'Corn (Maize) - Common Rust', 'Corn (Maize) - Northern Leaf Blight', 'Corn (Maize) - Healthy', 
    'Grape - Black Rot', 'Grape - Esca (Black Measles)', 'Grape - Leaf Blight (Isariopsis Leaf Spot)', 
    'Grape - Healthy', 'Orange - Huanglongbing (Citrus Greening)', 'Peach - Bacterial Spot', 
    'Peach - Healthy', 'Bell Pepper - Bacterial Spot', 'Bell Pepper - Healthy', 
    'Potato - Early Blight', 'Potato - Late Blight', 'Potato - Healthy', 'Raspberry - Healthy', 
    'Soybean - Healthy', 'Squash - Powdery Mildew', 'Strawberry - Leaf Scorch', 
    'Strawberry - Healthy', 'Tomato - Bacterial Spot', 'Tomato - Early Blight', 
    'Tomato - Late Blight', 'Tomato - Leaf Mold', 'Tomato - Septoria Leaf Spot', 
    'Tomato - Spider Mites (Two-Spotted Spider Mite)', 'Tomato - Target Spot', 
    'Tomato - Tomato Yellow Leaf Curl Virus', 'Tomato - Tomato Mosaic Virus', 'Tomato - Healthy'
]

# Import disease and supplement data
disease_info = pd.read_csv("disease_info.csv", encoding='cp1252')
supplement_info = pd.read_csv("supplement_info.csv")

# Route for plant disease prediction
@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    # Get the image from the request
    file = request.files['image'].read()
    image = Image.open(io.BytesIO(file)).resize((128, 128))

    # Preprocess the image
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)

    # Predict using the plant disease model
    prediction = plant_model.predict(img_array)
    result_index = np.argmax(prediction)
    predicted_class = class_names[result_index]

    # Fetch disease description and possible steps
    disease_name = disease_info.loc[result_index, 'description']
    possible_steps = disease_info.loc[result_index, 'Possible Steps']

    # Fetch supplement information
    supp_name = supplement_info.loc[result_index, 'supplement name']
    supp_img = supplement_info.loc[result_index, 'supplement image']

    # Return the prediction and additional information as JSON
    return jsonify({
        'disease': predicted_class,
        'description': disease_name,
        'possible_steps': possible_steps,
        'supplement_name': supp_name,
        'supplement_image': supp_img
    })

# Route for crop recommendation
@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    # Get form data from the frontend
    data = request.json
    nitrogen = float(data['nitrogen'])
    phosphorus = float(data['phosphorus'])
    potassium = float(data['potassium'])
    moisture = float(data['moisture'])
    temperature = float(data['temperature'])

    # Prepare the input for the crop recommendation model
    input_features = np.array([[nitrogen, phosphorus, potassium, temperature, moisture]])

    # Get probability predictions for all crops
    prob_predictions = crop_model.predict_proba(input_features)
    
    # Get indices of the top 3 crops with the highest probabilities
    top_3_indices = np.argsort(prob_predictions[0])[-3:][::-1]
    
    # Convert the indices back to crop names
    top_3_crops = [crop_model.classes_[i] for i in top_3_indices]

    # Return the top 3 predicted crops as a JSON response
    return jsonify({
        'top_3_crops': top_3_crops
    })

if __name__ == '__main__':
    app.run(debug=True)
