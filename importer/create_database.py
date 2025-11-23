from collections import defaultdict
import json

from file_handling import (
    create_database_info_dir,
    create_database_parts_dir,
    get_set_info_filepath,
    get_set_parts_filepath,
    get_database_set_info_filepath,
    get_database_colors_filepath,
    get_database_part_info_filepath,
    get_database_statistics_filepath,
)
from set_list import set_list


def load_set_info(short_id):
    set_info_filepath = get_set_info_filepath(short_id)
    with open(set_info_filepath, "r", encoding="utf-8") as set_info_file:
        return json.load(set_info_file)


def load_set_parts(short_id):
    set_parts_filepath = get_set_parts_filepath(short_id)
    with open(set_parts_filepath, "r", encoding="utf-8") as set_parts_file:
        return json.load(set_parts_file)


def populate_set_info(lego_set, set_info, set_parts):
    all_parts = defaultdict(list)
    for part in set_parts["results"]:
        all_parts[part["part"]["part_num"]].append(
            {"colorId": part["color"]["id"], "quantity": part["quantity"]}
        )

    return {
        "quantity": lego_set["quantity"],
        "name": set_info["name"],
        "year": set_info["year"],
        "imageUrl": set_info["set_img_url"],
        "parts": all_parts,
    }


def setup():
    create_database_info_dir()
    create_database_parts_dir()


def write_set_info_for_all_sets():
    for lego_set in set_list:
        short_id = lego_set["id"]
        set_info = load_set_info(short_id)
        set_parts = load_set_parts(short_id)

        lego_set = populate_set_info(lego_set, set_info, set_parts)

        set_info_filepath = get_database_set_info_filepath(short_id)
        with open(set_info_filepath, "w", encoding="utf-8") as set_info_file:
            json.dump(lego_set, set_info_file, indent=None, separators=(",", ":"))


def write_colors_info():
    colors = {}

    for lego_set in set_list:
        short_id = lego_set["id"]
        set_parts = load_set_parts(short_id)

        for part in set_parts["results"]:
            color_id = part["color"]["id"]
            if color_id in colors:
                continue

            colors[color_id] = {
                "name": part["color"]["name"],
                "rgb": part["color"]["rgb"],
                "isTransparent": part["color"]["is_trans"],
            }

        sorted_colors = dict(sorted(colors.items()))
        with open(get_database_colors_filepath(), "w", encoding="utf-8") as colors_file:
            json.dump(sorted_colors, colors_file, indent=None, separators=(",", ":"))


def write_parts_info():
    parts = {}

    for lego_set in set_list:
        short_id = lego_set["id"]
        set_parts = load_set_parts(short_id)

        for part in set_parts["results"]:
            part_num = part["part"]["part_num"]
            if part_num in parts:
                parts[part_num]["setIds"].add(short_id)
                continue

            parts[part_num] = {
                "name": part["part"]["name"],
                "imageUrl": part["part"]["part_img_url"],
                "setIds": {short_id},
            }

    for part_num, part in parts.items():
        part["setIds"] = sorted(list(part["setIds"]))

        part_info_filepath = get_database_part_info_filepath(part_num)
        with open(part_info_filepath, "w", encoding="utf-8") as part_info_file:
            json.dump(part, part_info_file, indent=None, separators=(",", ":"))


def write_statistics():
    # Werte in neue Statistik Datei schreiben
    statistics = {}
    total_sets = 0
    unique_sets = 0
    total_database_parts = 0
    total_lego_parts = 0
    nonmodel_parts = 150 + 318 + 24  # 150=Lego Blätter 318=Zauberwürfel 24=Schienen
    nonlego_parts = (
        3321 + 888
    )  # 3321= BluebrBR623 Cadfic51001 QL0936 MouldFanMei19 LightStaxSystemBuilder, PlaxsoonSc004
    total_parts = 0

    for lego_set in set_list:
        short_id = lego_set["id"]
        total_sets += lego_set["quantity"]
        unique_sets += 1
        set_info = load_set_info(short_id)
        total_database_parts += set_info["num_parts"] * lego_set["quantity"]
    total_lego_parts = total_database_parts + nonmodel_parts
    total_parts = total_lego_parts + nonlego_parts

    statistics = {
        "uniqueSets": unique_sets,
        "totalSets": total_sets,
        "nonModelParts": nonmodel_parts,
        "nonLegoParts": nonlego_parts,
        "totalDatabaseParts": total_database_parts,
        "totalLegoParts": total_lego_parts,
        "totalParts": total_parts,
    }

    statistics_filepath = get_database_statistics_filepath()
    with open(statistics_filepath, "w", encoding="utf-8") as statistics_file:
        json.dump(statistics, statistics_file, indent=None, separators=(",", ":"))


def main():
    write_set_info_for_all_sets()
    write_colors_info()
    write_parts_info()
    write_statistics()


if __name__ == "__main__":
    setup()
    main()
