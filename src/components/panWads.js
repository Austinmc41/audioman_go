import Wad from 'web-audio-daw';
import sound1_raw from '../sounds/AirplaneJet 2004_38.mp3'

// from https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript
const varToString = varObj => Object.keys(varObj)[0]

let sounds = []; 

const sound1 = new Wad({
    source: sound1_raw
})

export function playSounds(){
    sound1.play()
}

export function getSoundNames(){
    console.log(varToString(sound1))
}

playSounds()