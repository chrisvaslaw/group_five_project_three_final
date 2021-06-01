from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from config import API_KEY
import requests

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/weather_app"
mongo = PyMongo(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/locations")
def locations():
    location = mongo.db.locations
    output = []
    for l in location.find():
        print(l)
        output.append({'name':f"{l['City']}, {l['State']}", "lat": l["Lat"], \
            "lon": l["Lng"], "price": l["Price"]})

    return jsonify({'result': output})

@app.route("/api/weather.json")
def weather():
    locations = mongo.db.locations.find().limit(100)
    weather_data = []
   
    for location in locations:
       
        url = "https://api.openweathermap.org/data/2.5/onecall?"

        units = "imperial"

        query_url = f"{url}appid={API_KEY}&units={units}"
        print(location)
        lat = location["lat"]
        lon = location["lon"]

        try: 
            weather_url = f"{query_url}&lat={lat}&lon={lon}"  
            print(weather_url)
            weather = requests.get(weather_url).json()
            name = location["name"]
            price = location["price"]
            temp = weather["current"]["temp"]
            hum = weather["current"]["humidity"]
            cld = weather["current"]["clouds"]
            press = weather["current"]["pressure"]
            weather_data.append({
                "name": name,
                "lat": lat,
                "lon": lon,
                "price": price,
                "temp": temp,
                "hum": hum,
                "cld": cld,
                "press": press
            })

        except requests.exceptions.RequestException as e: 
            raise SystemExit(e)
    
    return jsonify({'result': weather_data})

if __name__ == '__main__':
    app.run(debug=True)