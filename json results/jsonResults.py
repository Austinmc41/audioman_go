import json
import os
import csv 

FOLDER_NAME = "./study_results/"

header = ['id']
data = []

for i in range(8):
  trialName = 'trial1-' + str(i + 1)
  header.append(trialName)

header.append('NasaTLX1_mental')
header.append('NasaTLX1_physical')
header.append('NasaTLX1_temporal')
header.append('NasaTLX1_performance')
header.append('NasaTLX1_effort')
header.append('NasaTLX1_frustration')

for i in range(8):
  trialName = 'trial2-' + str(i + 1)
  header.append(trialName)

header.append('NasaTLX2_mental')
header.append('NasaTLX2_physical')
header.append('NasaTLX2_temporal')
header.append('NasaTLX2_performance')
header.append('NasaTLX2_effort')
header.append('NasaTLX2_frustration')
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
    json_object = json.load(
        open(
            filename,
            "r"
        )
    )

    rowData.append(json_object['id'])
    trial1 = json_object["trial1"]["trials"]
    trial2 = json_object["trial2"]["trials"]

    for i in range(8):
      if (i < len(trial1)):
        rowData.append(trial1[i]['accuracy'])
      else:
        rowData.append('empty') 

    nasaTlx1 = json_object["nasaTLX1"]
    nasaTlx2 = json_object["nasaTLX2"]

    rowData.append(nasaTlx1['NasaTLX1_mental'])
    rowData.append(nasaTlx1['NasaTLX1_physical'])
    rowData.append(nasaTlx1['NasaTLX1_temporal'])
    rowData.append(nasaTlx1['NasaTLX1_performance'])
    rowData.append(nasaTlx1['NasaTLX1_effort'])
    rowData.append(nasaTlx1['NasaTLX1_frustration'])
    

    for i in range(8):
      if (i < len(trial2)):
        rowData.append(trial2[i]['accuracy'])
      else:
        rowData.append('empty')

    rowData.append(nasaTlx2['NasaTLX2_mental'])
    rowData.append(nasaTlx2['NasaTLX2_physical'])
    rowData.append(nasaTlx2['NasaTLX2_temporal'])
    rowData.append(nasaTlx2['NasaTLX2_performance'])
    rowData.append(nasaTlx2['NasaTLX2_effort'])
    rowData.append(nasaTlx2['NasaTLX2_frustration'])

    demographics = json_object["demographics"]
    rowData.append(demographics['age'])
    rowData.append(demographics['gender'])
    rowData.append(demographics['nationality'])
    rowData.append(demographics['musical_ability'])
    rowData.append(demographics['anxiety_level'])
    rowData.append(demographics['hearing_level'])

    data.append(rowData)

with open('countries.csv', 'w', encoding='UTF8') as f:
    writer = csv.writer(f)

    # write the header
    writer.writerow(header)

    # write the data
    for i in range(len(data)):
      writer.writerow(data[i])
