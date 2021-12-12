import json
import os
import csv 

FOLDER_NAME = "./study_results/"

header = ['id']
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

for i in range(8):
  trialName = 'trialPan-' + str(i + 1)
  header.append(trialName)

header.append('NasaTLXPan_mental')
header.append('NasaTLXPan_physical')
header.append('NasaTLXPan_temporal')
header.append('NasaTLXPan_performance')
header.append('NasaTLXPan_effort')
header.append('NasaTLXPan_frustration')

for i in range(8):
  trialName = 'trialMonaural-' + str(i + 1)
  header.append(trialName)

header.append('NasaTLXMonaural_mental')
header.append('NasaTLXMonaural_physical')
header.append('NasaTLXMonaural_temporal')
header.append('NasaTLXMonaural_performance')
header.append('NasaTLXMonaural_effort')
header.append('NasaTLXMonaural_frustration')
header.append('Age')
header.append('Gender')
header.append('Nationality')
header.append('musical_ability')
header.append('anxiety_level')
header.append('hearing_level')

filenames = os.listdir(FOLDER_NAME)
for filename in filenames:
    rowData = []
    filename = os.path.join(FOLDER_NAME, filename)
    if not filename.endswith("json"):
      continue
    json_object = json.load(
        open(
            filename,
            "r"
        )
    )

    rowData.append(json_object['id'])
    trial1 = json_object["trial1"]["trials"] if json_object["trial1"]["condition"] == "pan" else json_object["trial2"]["trials"]
    trial2 = json_object["trial1"]["trials"] if json_object["trial1"]["condition"] == "monaural" else json_object["trial2"]["trials"]

    for i in range(8):
      if (i < len(trial1)):
        try:
          rowData.append(trial1[i]['accuracy'])
        except KeyError:
          correct = trial1[i]['actualSounds']
          answers = trial1[i]['selectedSounds']
          rowData.append(getAccuracy(correct, answers))
      else:
        rowData.append('empty') 

    NasaTLXPan = json_object["nasaTLX1"] if json_object["trial1"]["condition"] == "pan" else json_object["nasaTLX2"]
    NasaTLXMonaural = json_object["nasaTLX1"] if json_object["trial1"]["condition"] == "monaural" else json_object["nasaTLX2"]

    rowData.append(NasaTLXPan['mental'])
    rowData.append(NasaTLXPan['physical'])
    rowData.append(NasaTLXPan['temporal'])
    rowData.append(NasaTLXPan['performance'])
    rowData.append(NasaTLXPan['effort'])
    rowData.append(NasaTLXPan['frustration'])
    

    for i in range(8):
      if (i < len(trial2)):
        try:
          rowData.append(trial2[i]['accuracy'])
        except KeyError:
          correct = trial1[i]['actualSounds']
          answers = trial1[i]['selectedSounds']
          rowData.append(getAccuracy(correct, answers))
      else:
        rowData.append('empty')

    rowData.append(NasaTLXMonaural['mental'])
    rowData.append(NasaTLXMonaural['physical'])
    rowData.append(NasaTLXMonaural['temporal'])
    rowData.append(NasaTLXMonaural['performance'])
    rowData.append(NasaTLXMonaural['effort'])
    rowData.append(NasaTLXMonaural['frustration'])

    demographics = json_object["demographics"]
    rowData.append(demographics['age'])
    rowData.append(demographics['gender'])
    rowData.append(demographics['nationality'])
    rowData.append(demographics['musical_ability'])
    rowData.append(demographics['anxiety_level'])
    rowData.append(demographics['hearing_level'])

    data.append(rowData)

with open('results.csv', 'w', encoding='UTF8') as f:
    writer = csv.writer(f)

    # write the header
    writer.writerow(header)

    # write the data
    writer.writerows(data)

print("done")