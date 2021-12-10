import json
import os

FOLDER_NAME = "./study_results/"

filenames = os.listdir(FOLDER_NAME)

columns = [
    'userID',
    'condition',
    'correct_answers',
    'number_icons'
]

for filename in filenames:
    filename = os.path.join(FOLDER_NAME, filename)
    json_object = json.load(
        open(
            filename,
            "r"
        )
    )
    user_id = json_object['id']
    trial_1 = json_object['trial1']
    trial_2 = json_object['trial2']


    for trial in trial_1['trials']:
        




