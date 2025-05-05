from flask import Flask, request, jsonify
from db import events_collection
from utils import generate_event_id

app = Flask(__name__)

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    data['event_id'] = generate_event_id()
    events_collection.insert_one(data)
    return jsonify({"message": "Event created", "event_id": data['event_id']}), 201

@app.route('/events', methods=['GET'])
def get_events():
    events = list(events_collection.find({}, {"_id": 0}))  # Exclude Mongo's _id
    return jsonify(events), 200

if __name__ == '__main__':
    app.run(debug=True)
