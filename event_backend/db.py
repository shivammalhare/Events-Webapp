from pymongo import MongoClient
import os

MONGO_URI = os.environ.get("MONGO_URI")  # ✅ Loads it from Render

client = MongoClient(MONGO_URI)
db = client["eventdb"]
events_collection = db["events"]
