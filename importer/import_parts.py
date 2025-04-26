from dotenv import load_dotenv
import os
import requests
import json
import time

load_dotenv()

auth_token = os.getenv("REBRICKABLE_AUTH_TOKEN")
if not auth_token:
    raise ValueError(
        "Die Umgebungsvariable 'REBRICKABLE_AUTH_TOKEN' ist nicht gesetzt."
    )

set_list_test = ["10220", "6544", "6348"]

set_list = [
    60238,
    6007,
    6731,
    1183,
    6009,
    6235,
    60205,
    7953,
    2585,
    6503,
    5017,
    4592,
    6245,
    6712,
    8359,
    6232,
    71402,
    6522,
    4805,
    5918,
    6503,
    60011,
    3557,
    6234,
    6833,
    6016,
    6512,
    6832,
    6832,
    6832,
    1127,
    6515,
    3559,
    3559,
    6810,
    6103,
    6103,
    6236,
    6257,
    6534,
    6579,
    6530,
    60032,
    4618,
    6849,
    70739,
    6034,
    31028,
    6259,
    6648,
    6645,
    6645,
    60065,
    6037,
    6642,
    6678,
    6678,
    6646,
    6877,
    10733,
    60105,
    6658,
    8418,
    6644,
    6716,
    6687,
    40010,
    6663,
    10666,
    30666,
    6039,
    6039,
    6665,
    6661,
    30655,
    8810,
    6641,
    6735,
    60120,
    30641,
    60224,
    6662,
    10757,
    30556,
    6038,
    8290,
    4011,
    60106,
    8808,
    60239,
    6875,
    6592,
    6693,
    4200,
    31057,
    8260,
    6042,
    6668,
    8270,
    6886,
    31071,
    31071,
    70606,
    6670,
    8024,
    6041,
    31092,
    6057,
    6057,
    7890,
    31017,
    5930,
    6480,
    31056,
    40110,
    41738,
    6593,
    7248,
    60012,
    6342,
    4201,
    4201,
    60019,
    40252,
    5929,
    42020,
    60078,
    6356,
    6440,
    40125,
    6370,
    6381,
    60121,
    6270,
    6357,
    42148,
    7141,
    6048,
    6267,
    6351,
    60057,
    8046,
    7044,
    60107,
    3843,
    60058,
    6956,
    31075,
    42103,
    60059,
    4124,
    6748,
    6552,
    42135,
    60118,
    31033,
    7140,
    4202,
    76916,
    40518,
    60133,
    76906,
    6271,
    3825,
    4203,
    6380,
    6380,
    6348,
    6544,
    6388,
    6345,
    6274,
    6274,
    70623,
    6335,
    60454,
    31053,
    6074,
    6346,
    70005,
    6278,
    70625,
    6081,
    6397,
    6086,
    31038,
    6277,
    6398,
    6769,
    10216,
    6085,
    4204,
    60337,
    4886,
    17101,
    31084,
    41935,
    4954,
    71834,
    10220,
    10193,
    42128,
]


def get_set_parts(set_id):
    url = f"https://rebrickable.com/api/v3/lego/sets/{set_id}/parts/"
    params = {"page_size": 2_000, "inc_minifig_parts": 1, "inc_color_details": 0}
    headers = {"Authorization": f"key {auth_token}"}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        raise Exception(
            f"Error fetching data: {response.status_code} - {response.text}"
        )

    return response.json()


def get_set_id(short_id):
    return f"{short_id}-1"


def get_raw_dir():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(script_dir, "raw")


def get_filepath(short_id):
    raw_dir = get_raw_dir()
    return os.path.join(raw_dir, f"{short_id}_parts.json")


def save_to_file(set_parts, short_id):
    file_path = get_filepath(short_id)
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(set_parts, file, indent=2)


def setup():
    raw_dir = get_raw_dir()
    if not os.path.exists(raw_dir):
        os.makedirs(raw_dir)


def main():
    setup()
    for short_id in set_list:
        file_path = get_filepath(short_id)
        if os.path.exists(file_path):
            print(f"File for {short_id} already exists. Skipping download.")
            continue
        set_id = get_set_id(short_id)
        set_parts = get_set_parts(set_id)
        save_to_file(set_parts, short_id)
        print(f"Downloaded set parts for {short_id}")
        time.sleep(0.1)


if __name__ == "__main__":
    main()
