import { Compressor } from 'tone';
import Wad from 'web-audio-daw';
import {sounds} from '../object_sounds'

// from https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript
const varToString = varObj => Object.keys(varObj)[0];
// from  https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript/50756887
var soundArray = Object.keys(sounds).map((key) => [String(key), sounds[key]]);
// initial list to randomly pick from (sounds will be removed from list each time one is played)
var notVisited = soundArray; 
// list to add sounds that have already been played to
var visitedSounds = [];
// initial count 
var count = notVisited.length;


export function checkNumSounds(numSounds){
    if (numSounds > count) {
        console.log('Refresh sounds: Currently available sound count is: ' + count);
        return;
    }
    let soundStartTime = 0;
    for (var i = 0; i < numSounds; i++) {   
        setTimeout(playSound, soundStartTime);
        soundStartTime += 300;
    }
}

function playSound() {
     // Generate random index based on number of sounds to choose from
     const randIndex = Math.floor(Math.random() * count);
     // access sound from array
     console.log(notVisited)
     const randSound = notVisited[randIndex][1];
     // creating sound 
     const sound = new Wad({
         source: randSound
     })
     // playing sound
     sound.play();
     // adding sound to visited sound
     visitedSounds.push(notVisited[randIndex])
     // deleting sound that was just played
     notVisited.splice(randIndex, 1)
     // setting count to new count
     count = notVisited.length;
} 

export function getSoundNames(){
    
}

export function refreshSounds(){
    visitedSounds = [];
    notVisited = soundArray; 
}

checkNumSounds(13);