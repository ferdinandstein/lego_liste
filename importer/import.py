from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

auth_token = os.getenv("REBRICKABLE_AUTH_TOKEN")
if not auth_token:
    raise ValueError("Die Umgebungsvariable 'REBRICKABLE_AUTH_TOKEN' ist nicht gesetzt.")

set_list = ["10220", "6544", "6348"]

def get_set_parts(set_id):
    url = f"https://rebrickable.com/api/v3/lego/sets/{set_id}/parts/"
    params = {
        "page_size": 2_000,
        "inc_minifig_parts": 1,
        "inc_color_details": 0
    }
    headers = {
        "Authorization": f"key {auth_token}"
    }
    response = requests.get(url, headers=headers, params=params)

    return response.json()


def get_set_id(short_id):
    return f"{short_id}-1"


def save_to_file(set_parts, short_id):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    raw_dir = os.path.join(script_dir, "raw")
    os.makedirs(raw_dir, exist_ok=True)
    file_path = os.path.join(raw_dir, f"{short_id}.json")
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(set_parts, file, indent=2)


def main():
    for short_id in set_list:
        set_id = get_set_id(short_id)
        set_parts = get_set_parts(set_id)
        save_to_file(set_parts, short_id)
        print(f"Downloaded set parts for {short_id}")    


if __name__ == "__main__":
    main()
