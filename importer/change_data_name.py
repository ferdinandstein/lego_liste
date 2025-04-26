import os


def add_parts_to_filenames():
    # Pfad zum Ordner "raw" relativ zum Skript
    script_dir = os.path.dirname(os.path.abspath(__file__))
    raw_dir = os.path.join(script_dir, "raw")

    # Überprüfen, ob der Ordner "raw" existiert
    if not os.path.exists(raw_dir):
        print(f"Der Ordner '{raw_dir}' existiert nicht.")
        return

    # Iteriere durch alle Dateien im Ordner "raw"
    for filename in os.listdir(raw_dir):
        old_path = os.path.join(raw_dir, filename)

        # Überspringe, wenn es kein regulärer Dateiname ist
        if not os.path.isfile(old_path):
            continue

        # Neuen Dateinamen erstellen
        name, ext = os.path.splitext(filename)
        new_filename = f"{name}_parts{ext}"
        new_path = os.path.join(raw_dir, new_filename)

        # Datei umbenennen
        os.rename(old_path, new_path)
        print(f"Umbenannt: {filename} -> {new_filename}")


if __name__ == "__main__":
    add_parts_to_filenames()
