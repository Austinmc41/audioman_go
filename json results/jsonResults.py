import json
import os

FOLDER_NAME = "./study_results/"

filenames = os.listdir(FOLDER_NAME)

for filename in filenames:
    filename = os.path.join(FOLDER_NAME, filename)
    json_object = json.load(
        open(
            filename,
            "r"
        )
    )

    trial1 = json_object["trial1"]["trials"]
    print(trial1)
    

