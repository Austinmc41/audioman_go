import json
import os
import csv 

FOLDER_NAME = "./study_results/"

header = ['id', 'section', 'condition', 'trial', 'value', 'answer', 'Sound Scape', 'Trial Number']
data = []

def getAccuracy(correct, answers):
  correctSet = set(correct)
  correctAnswers = correctSet.intersection(answers)
  answerAccuracy = len(correctAnswers) / len(correct)
  howManyAccurate = 0
  if len(answers):
    h = abs(len(correct) - len(answers)) / len(correct)
    howManyAccurate = h if h else 1
  accuracy = howManyAccurate * answerAccuracy
  return accuracy

filenames = os.listdir(FOLDER_NAME)
for filename in filenames:
    filename = os.path.join(FOLDER_NAME, filename)
    if not filename.endswith("json"):
      continue
    json_object = json.load(
        open(
            filename,
            "r"
        )
    )

    id = json_object['id']
    
    for section in json_object:
      if section in ['id']:
        continue
      elif section == "demographics":
        for question in json_object[section]:
          if question == "_id":
            continue
          data.append({
            "section": "demographics",
            "trial": question,
            "answer": json_object[section][question],
            "id": id
          })
      elif section in ["trial1", "trial2"]:
        condition = json_object[section]["condition"]
        soundScape = json_object[section]["soundScape"]
        trialNum = json_object[section]["trialNum"]
        for trial in json_object[section]['trials']:
          correct = trial['actualSounds']

          try:
            accuracy = trial['accuracy']
          except KeyError:
            answers = trial['selectedSounds']
            accuracy = getAccuracy(correct, answers)

          data.append({
            "section": "trial",
            "id": id,
            "condition": condition,
            "Trial Number": trialNum,
            "Sound Scape": soundScape,
            "value": accuracy,
            "trial": len(correct)
          })
      elif section == "nasaTLX1":
        condition = json_object["trial1"]["condition"]
        soundScape = json_object["trial1"]["soundScape"]
        for category in json_object[section]:
          data.append({
            "id": id,
            "section": "NasaTLX",
            "condition": condition,
            "Sound Scape": soundScape,
            "trial": category,
            "value": json_object[section][category]
          })

      elif section == "nasaTLX2":
        condition = json_object["trial2"]["condition"]
        soundScape = json_object["trial2"]["soundScape"]
        for category in json_object[section]:
          data.append({
            "id": id,
            "section": "NasaTLX",
            "condition": condition,
            "Sound Scape": soundScape,
            "trial": category,
            "value": json_object[section][category]
          })

with open('results.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=header)

    # Write the header
    writer.writeheader()
    # write the data
    writer.writerows(data)

print("done")