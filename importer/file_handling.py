import os


def get_set_id(short_id):
    return f"{short_id}-1"


def get_database_dir():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(script_dir, "database")


def get_database_info_dir():
    return os.path.join(get_database_dir(), "info")


def get_database_parts_dir():
    return os.path.join(get_database_dir(), "parts")


def get_database_set_info_filepath(short_id):
    return os.path.join(get_database_info_dir(), f"{short_id}.json")


def get_database_part_info_filepath(part_id):
    return os.path.join(get_database_parts_dir(), f"{part_id}.json")


def get_database_colors_filepath():
    return os.path.join(get_database_dir(), f"colors.json")


def get_raw_dir():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(script_dir, "raw")


def get_set_info_filepath(short_id):
    raw_dir = get_raw_dir()
    return os.path.join(raw_dir, f"{short_id}_info.json")


def get_set_parts_filepath(short_id):
    raw_dir = get_raw_dir()
    return os.path.join(raw_dir, f"{short_id}_parts.json")


def create_raw_dir():
    raw_dir = get_raw_dir()
    if not os.path.exists(raw_dir):
        os.makedirs(raw_dir)


def create_database_info_dir():
    database_info_dir = get_database_info_dir()
    if not os.path.exists(database_info_dir):
        os.makedirs(database_info_dir)


def create_database_parts_dir():
    database_parts_dir = get_database_parts_dir()
    if not os.path.exists(database_parts_dir):
        os.makedirs(database_parts_dir)
