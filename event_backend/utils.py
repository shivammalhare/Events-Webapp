import random, string

def generate_event_id():
    prefix = "EVT"
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"{prefix}{suffix}"
