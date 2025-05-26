 # Flood Sense – Flood Prediction System

## Project Overview
Flood Sense is a web-based system developed as part of the final year project to predict and visualize potential flood risks in flood-prone areas of Sri Lanka. The system collects real-time weather data (rainfall, river levels, etc.), uses machine learning for flood prediction, and visualizes results through interactive dashboards and maps.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, Recharts, Leaflet.js
- **Backend**: Flask (Python)
- **Database**: MongoDB (MongoDB Compass)
- **Machine Learning**: Random Forest Classifier
- **APIs**: Custom endpoints for flood prediction and data collection

## Features
- Admin dashboard for entering environmental data (rainfall, humidity, etc.)

- Interactive map displaying flood risk areas with probability percentages
- Registration form for local residents to receive flood alerts
- Secure admin login
- Dynamic charts showing rainfall and river level trends

## How to Run
1. **Frontend Setup**
   - Run `npm install` inside the frontend directory
   - Then run `npm run dev` to launch the frontend

2. **Backend Setup**
   - Navigate to the backend folder
   - Ensure Python and Flask are installed
   - Install dependencies with `pip install -r requirements.txt`
   - Run the server: `python main.py` (or similar based on your file)

3. **Database**
   - Set up MongoDB Compass
   - Update MongoDB URI in the backend script (Flask) to connect properly

4. **Machine Learning Model**
   - Ensure the trained model `flood_predict_model_one.pkl` is in the backend directory
