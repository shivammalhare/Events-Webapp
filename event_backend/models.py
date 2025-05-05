def parse_event(data):
     return {
        "event_id": data.get("event_id"),
        "event_name": data.get("event_name"),
        "location": data.get("location"),
        "date": data.get("date"),
        "description": data.get("description"),
        "sponsorship": data.get("sponsorship"),
        "organizer": data.get("organizer"),
        "contact": data.get("contact")
    }
