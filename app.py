from flask import Flask,render_template,url_for,request,jsonify
from flask_cors import cross_origin
import pandas as pd
import numpy as np
import datetime
import pickle

app = Flask(__name__, template_folder="template")
model = pickle.load(open("C:/Users/KIIT/Downloads/Rain-Prediction-main (2)/Rain-Prediction-main/Rain-Prediction-main/models/cat.pkl", "rb"))
print("Model Loaded")
#localhost:5000/predict
@app.route("/predict",methods=['POST'])
@cross_origin()#cors cross orgin resourse sharing 
def predict():
	
	if request.method == "POST":
		# DATE
		content = request.get_json()
		day = float(content['day'])
		month = float(content['month'])
		# MinTemp
		minTemp = float(content['mintemp'])
		# MaxTemp
		maxTemp = float(content['maxtemp'])
		# Rainfall
		rainfall = float(content['rainfall'])
		# Evaporation
		evaporation = float(content['evaporation'])
		# Sunshine
		sunshine = float(content['sunshine'])
		# Wind Gust Speed
		windGustSpeed = float(content['windgustspeed'])
		# Wind Speed 9am
		windSpeed9am = float(content['windspeed9am'])
		# Wind Speed 3pm
		windSpeed3pm = float(content['windspeed3pm'])
		# Humidity 9am
		humidity9am = float(content['humidity9am'])
		# Humidity 3pm
		humidity3pm = float(content['humidity3pm'])
		# Pressure 9am
		pressure9am = float(content['pressure9am'])
		# Pressure 3pm
		pressure3pm = float(content['pressure3pm'])
		# Temperature 9am
		temp9am = float(content['temp9am'])
		# Temperature 3pm
		temp3pm = float(content['temp3pm'])
		# Cloud 9am
		cloud9am = float(content['cloud9am'])
		# Cloud 3pm
		cloud3pm = float(content['cloud3pm'])
		# Cloud 3pm
		location = float(content['location'])
		# Wind Dir 9am
		winddDir9am = float(content['winddir9am'])
		# Wind Dir 3pm
		winddDir3pm = float(content['winddir3pm'])
		# Wind Gust Dir
		windGustDir = float(content['windgustdir'])
		# Rain Today
		rainToday = float(content['raintoday'])

		input_lst = [location , minTemp , maxTemp , rainfall , evaporation , sunshine ,
					 windGustDir , windGustSpeed , winddDir9am , winddDir3pm , windSpeed9am , windSpeed3pm ,
					 humidity9am , humidity3pm , pressure9am , pressure3pm , cloud9am , cloud3pm , temp9am , temp3pm ,
					 rainToday , month , day]
		pred = model.predict(input_lst)
		return {'rain':int(pred)}
if __name__=='__main__':
	app.run(debug=True)