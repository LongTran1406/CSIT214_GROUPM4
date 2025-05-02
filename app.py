from flask import Flask, jsonify, render_template, request
import os
import mysql.connector
from dotenv import load_dotenv

app = Flask(__name__) 
app.config['SECRET_KEY'] = 'ascbsajcbjs'
load_dotenv()

conn = None
cursor = None
user_id = None

try:
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        autocommit=True
    )
    cursor = conn.cursor(buffered=True)
    print("Success")
except mysql.connector.Error as err:
    print(f"Failed to connect: {err}")  


@app.route('/') 
def welcome(): 
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/api/user_flight_search', methods=['POST'])
def user_flight_search():
    if request.method == 'POST':
        data = request.get_json()
        print(data['bnumber'])
        booking_number = data['bnumber']
        fullname = data['surname']
        print(booking_number, fullname)
        cursor.execute("SELECT * FROM booking WHERE booking_number = '{}' " \
        "AND fullname = '{}'".format(booking_number, fullname))
        result = cursor.fetchall()

        (booking_number, depart_place, arrive_place, depart_time, arrive_time,
        airline, flight_number, passenger_num, flight_class, user_id, fullname
        ) = result[0]

        return jsonify({
            "booking_number": booking_number,
            "depart_place": depart_place,
            "arrive_place": arrive_place,
            "depart_time": depart_time,
            "arrive_time": arrive_time,
            "airline": airline,
            "flight_number": flight_number,
            "passenger_num": passenger_num,
            "flight_class": flight_class,
            "user_id": user_id,
            "fullname": fullname
        })

    return jsonify({})


if(__name__ == "__main__"): 
    app.run(debug=True) 