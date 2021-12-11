const path = require('path')
const fs = require('fs')
const promisify = require('util.promisify')

const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

const output_file = 'new_object_sounds.js'

async function importer(file_path, initial_text, folder_path){
	//returns a string with import statements of the files
	let text = ''
	const import_string = `import ${initial_text}%name from './${folder_path ? folder_path + '/' : ''}%name%ending'`
	const files = await readdir(file_path)
	files.forEach(file=>{
		const split_text = file.split('.')
		const file_ending = "." + split_text[split_text.length-1]
		const file_name = split_text.slice(0, split_text.length-1).join('.')
		const filled_import_string = import_string.replace(/%name/g, file_name).replace(/%ending/g, file_ending)
		text += filled_import_string + "\n"
	})
	return text
}

async function get_name_obj(file_path, initial_text){
	let text = "{\n"
	const files = await readdir(file_path)
	files.forEach(file =>{
		const split_text = file.split('.')
		const file_name = split_text.slice(0, split_text.length-1).join('.')
		const import_name = initial_text + file_name
		text += `\t'${file_name}': ${import_name},\n`
})
	text = text.trim() + "\n}"
	return text
}

async function main(output_file, folders){
	let final_text = ""
	let export_names = []
for(folder of folders){
	const folderName = folder['name']
const sounds_path = path.join(__dirname, folder['current_path'])
const path_too_sounds = folder['target_path'] // this is for rellitive imports to the object_sounds file when it is done
export_names.push(folderName)
const contents = `// ${folderName} sound imports
${await importer(sounds_path, '', path_too_sounds)}

`

final_text += contents
}

for(folder of folders){
	const folderName = folder['name']
const sounds_path = path.join(__dirname, folder['current_path'])
const path_too_sounds = folder['target_path'] // this is for rellitive imports to the object_sounds file when it is done

const contents = `// ${folderName} sound objects
//creating the objects
const ${folderName} = ${await get_name_obj(sounds_path, '')}

`

final_text += contents
}

final_text += `export { ${export_names.join(", ")} }`

	await writeFile(output_file, final_text)
	console.log("done")
}

const folders = [
{"current_path": "training_sounds", "target_path": "training_sounds", "name": "training_sounds"},
{"current_path": "soundscape1", "target_path": "soundscape1", "name": "soundscape1"},
{"current_path": "soundscape2", "target_path": "soundscape2", "name": "soundscape2"}
]

main(output_file, folders)