import pickle
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from datetime import datetime
from twilio.rest import Client
from dotenv import load_dotenv
import os


load_dotenv()
twilio_sid = os.getenv("TWILIO_ACCOUNT_SID")
twilio_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

twilio_client = Client(twilio_sid, twilio_token)


# Flask app setup
app = Flask(__name__)
CORS(app)

# MongoDB configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/flood"
mongo = PyMongo(app)

# Model prediction function
def predictedData(Rainfall_mm, UpperCatchmentLevel_m, RiverLevel_m, SoilSaturationPercent):
    with open('./flood_predict_model_one.pkl', 'rb') as f:
        model_pkl = pickle.load(f)

    input_dataFrame = pd.DataFrame({
        'Rainfall_mm': [Rainfall_mm],
        'UpperCatchmentLevel_m': [UpperCatchmentLevel_m],
        'RiverLevel_m': [RiverLevel_m],
        'SoilSaturationPercent': [SoilSaturationPercent]
    })

    predicted_flood = model_pkl.predict(input_dataFrame)
    predicted_prob = model_pkl.predict_proba(input_dataFrame)

    return predicted_flood[0].item(), predicted_prob[0]

# Save prediction and input data
def full_pred_data(Rainfall_mm, UpperCatchmentLevel_m, RiverLevel_m, SoilSaturationPercent, location_area, prediction_data, pradiction_proba, timestamp):
    mongo.db.flood_loc_data.insert_one({
        "location_area": location_area,
        "Rainfall_mm": Rainfall_mm,
        "UpperCatchmentLevel_m": UpperCatchmentLevel_m,
        "RiverLevel_m": RiverLevel_m,
        "SoilSaturationPercent": SoilSaturationPercent,
        "prediction_data": prediction_data,
        "false_proba": pradiction_proba[0],
        "true_proba": pradiction_proba[1],
        "timestamp": timestamp
    })

# Prediction API route
@app.route('/predict', methods=['POST'])
def send_pred_data():
    data = request.json

    Rainfall_mm = float(data.get('Rainfall_mm'))
    UpperCatchmentLevel_m = float(data.get('UpperCatchmentLevel_m'))
    RiverLevel_m = float(data.get('RiverLevel_m'))
    SoilSaturationPercent = float(data.get('SoilSaturationPercent'))
    location_area = data.get('location_area')
    current_timestamp = datetime.now().isoformat()

    prediction_data = predictedData(
        Rainfall_mm=Rainfall_mm,
        UpperCatchmentLevel_m=UpperCatchmentLevel_m,
        RiverLevel_m=RiverLevel_m,
        SoilSaturationPercent=SoilSaturationPercent
    )

    full_pred_data(
        Rainfall_mm=Rainfall_mm,
        UpperCatchmentLevel_m=UpperCatchmentLevel_m,
        RiverLevel_m=RiverLevel_m,
        SoilSaturationPercent=SoilSaturationPercent,
        location_area=location_area,
        prediction_data=prediction_data[0],
        pradiction_proba=prediction_data[1].tolist(),
        timestamp=current_timestamp
    )

    return jsonify({
        'prediction': prediction_data[0],
        'predictionProba': prediction_data[1].tolist(),
        'message': 'Data saved successfully',
        'timestamp': current_timestamp
    })

# Save user registration data
@app.route('/save-users', methods=['POST'])
def saveUsers():
    data = request.json

    mongo.db.users.insert_one({
        'full_name': data.get('full_name'),
        'nic_number': data.get('nic_number'),
        'mobile_number': data.get('mobile_number'),
        'location': data.get('location'),
        'email': data.get('email'),
        'age': data.get('age')
    })

    return jsonify({
        "message": "User added successfully!",
        "user_data": data
    }), 201

# Get all registered users count
@app.route('/get-user', methods=['GET'])
def get_users():
    user_data = mongo.db.users.find()
    db_array = []

    for item in user_data:
        db_array.append({
            "full_name": item['full_name'],
            "nic_number": item['nic_number'],
            "mobile_number": item['mobile_number'],
            "location": item['location'],
            "email": item['email'],
            "age": item['age']
        })

    return jsonify({'message': 'Successfully loaded data', "data": db_array})

# Get all flood prediction records
@app.route('/get-all-data', methods=['GET'])
def get_all_data():
    #  Sort by timestamp descending (-1) so latest comes first
    all_data = mongo.db.flood_loc_data.find().sort("timestamp", -1)
    all_data_arr = []

    for item in all_data:
        all_data_arr.append({
            "location_area": item['location_area'],
            "Rainfall_mm": item['Rainfall_mm'],
            "UpperCatchmentLevel_m": item['UpperCatchmentLevel_m'],
            "RiverLevel_m": item['RiverLevel_m'],
            "SoilSaturationPercent": item['SoilSaturationPercent'],
            "prediction_data": item['prediction_data'],
            "false_proba": item['false_proba'],
            "true_proba": item['true_proba'],
            "timestamp": item.get('timestamp', 'N/A')
        })

    return jsonify(all_data_arr)

# SMS System

@app.route('/send-alerts', methods=['POST'])
def send_flood_alerts():
    try:
        alert_threshold = 0.45
        alert_message = "Flood Alert: There may be a risk of flooding in your area. Please be careful and stay updated."

        # Step 1: Get high-risk areas
        high_risk_predictions = mongo.db.flood_loc_data.find({
            "true_proba": { "$gte": alert_threshold }
        })

        high_risk_areas = {entry["location_area"] for entry in high_risk_predictions}

        # Step 2: Get users in those areas
        matched_users = mongo.db.users.find({
            "location": { "$in": list(high_risk_areas) }
        })

        alerted_users = []

        # Step 3: Send SMS
        for user in matched_users:
            mobile = user["mobile_number"]

            try:
                message = twilio_client.messages.create(
                    body=alert_message,
                    from_=twilio_number,
                    to=mobile
                )
                print(f"Alert sent to {mobile}")
                alerted_users.append({
                    "name": user["full_name"],
                    "mobile_number": mobile,
                    "location": user["location"]
                })
            except Exception as sms_error:
                print(f"Failed to send SMS to {mobile}: {sms_error}")

        return jsonify({
            "message": "SMS alerts sent successfully!",
            "risk_areas": list(high_risk_areas),
            "alerted_users": alerted_users
        })

    except Exception as e:
        return jsonify({ "error": str(e) }), 500




# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
