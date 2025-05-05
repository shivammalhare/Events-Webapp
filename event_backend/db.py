from pymongo import MongoClient
import os

MONGO_URI = "mongodb+srv://<db_username>:<db_password>@rexcluster.jp4vrde.mongodb.net/?retryWrites=true&w=majority&appName=RexCluster"
client = MongoClient(MONGO_URI)
db = client["eventdb"]
events_collection = db["events"]
