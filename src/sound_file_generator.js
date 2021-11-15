const path = require('path')
const fs = require('fs')
const promisify = require('util.promisify')

const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

const output_file = 'object_sounds.js'

const sounds_path = path.join(__dirname, 'sounds')

async function importer(file_path, initial_text, folder_path){
	//returns a string with import statements of the files
	let text = ''
	const import_string = `import ${initial_text}%name from './${folder_path}/%name%ending'`
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

async function main(){
const contents = `
//imports
${await importer(sounds_path, 'sound_', 'sound')}

//creating the objects
const sounds = ${await get_name_obj(sounds_path, 'sounds_')}

export { sounds }
`

	await writeFile(output_file, contents)
	console.log("done")
}

main()