import { Compressor } from 'tone';
import Wad from 'web-audio-daw';
// import {sounds} from '../object_sounds'
import {soundscape1} from '../object_sounds'
import {soundscape2} from '../object_sounds'
import {training_sounds} from '../object_sounds'
import * as turf from '@turf/turf'

// from https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript
const varToString = varObj => Object.keys(varObj)[0];
// from  https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript/50756887
var soundArray1 = Object.keys(soundscape1).map((key) => [String(key), soundscape1[key]]);

var soundArray2 = Object.keys(soundscape2).map((key) => [String(key), soundscape2[key]]);

var trainingSoundArray = Object.keys(training_sounds).map((key) => [String(key), training_sounds[key]]);

// 2 array of sounds with sounds path
var allSounds = soundArray1.concat(soundArray2);

// call back for converting allsounds array to array with only the first entry in each array
const arrayColumn = (arr, n) => arr.map(x => x[n]);

// all of the names of the sounds from both soundscapes 
const allSoundsNames = arrayColumn(allSounds, 0)



// initial list to randomly pick from (sounds will be removed from list each time one is played)
var notVisited; 
// list to add sounds that have already been played to
var visitedSounds = [];
// initial count 
var count;
//preprocessed list for spatial audio 
var semiCircle = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]

// positions available for sounds to be played 
var positionLeft = [];

// positions where sounds have already been played
var positionGone = [];

setSemiCircle();

export function checkNumSounds(numSounds, panOrMonaural, soundScape){

    if (soundScape === "soundscape1") {
        notVisited = soundArray1
    } else if (soundScape === "soundscape2") {
        notVisited = soundArray2
    }    else if (soundScape === "training") {
        notVisited = trainingSoundArray
}

    count = notVisited.length;

    if (numSounds > count) {
        console.log('Refresh sounds: Currently available sound count is: ' + count);
        return;
    }
    let soundStartTime = 0;
    for (var i = 0; i < numSounds; i++) {   
        setTimeout(playSound(panOrMonaural), soundStartTime);
        soundStartTime += 300;
    }
}

export function stopSounds(){
	visitedSounds.forEach(sound=>sound.stop())
}

function playSound(panOrMonaural) {
    // @todo pull random position from semicircle and use for
    //  panning in WAD creation 
    const panPosit = Math.floor(Math.random() * semiCircle.length)

    const spatialCoord = semiCircle[panPosit]; 
    console.log(spatialCoord)
    // Generate random index based on number of sounds to choose from
    const randIndex = Math.floor(Math.random() * count);
    // access sound from array
    console.log(notVisited)
    const randSound = notVisited[randIndex][1];
    // creating sound 
    var sound;

     // if the token is for panning create using hrtf model and randomly selected spatial coordinate

    if (panOrMonaural === "pan") {
        sound = new Wad({
        source: randSound,
        panning: spatialCoord,
        panningModel: 'HRTF',
        rolloffFactor: 1 })
        } else {
     // otherwise play directly in front 
        sound = new Wad({
        source: randSound,
        panning: [0,0,0],
        panningModel: 'HRTF',
        rolloffFactor: 1 })
        }


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
    return allSoundsNames;
}

export function getAllSounds(soundScapes=["soundscape1", "soundscape2"]) {
	const soundScapeList = []
	if(soundScapes.includes("soundscape1")) soundScapeList.push(soundscape1)
	if(soundScapes.includes("soundscape2")) soundScapeList.push(soundscape2)
	if(soundScapes.includes("training")) soundScapeList.push(training_sounds)
	
	let allSounds = {}
	const allRawSounds = Object.assign({}, ...soundScapeList)
	for(const key in allRawSounds){
		allSounds[key] = new Wad({
			source: allRawSounds[key]
		})
	}
	return allSounds
}

export function refreshSoundScape(soundScape){
    if (soundScape === "soundscape1") {
        notVisited = soundArray1
    } else if (soundScape === "soundscape2") {
        notVisited = soundArray2
    } else if(soundScape === "training"){
      notVisited =  trainingSoundArray
    }
}

export function setSemiCircle() {
    var r = 25;
    var step = Math.PI/20; 
    for (var i = 0; i < 20; i++) {
        var x = r*Math.cos(step*i);
        semiCircle[i][0] = x;
        var y = r * Math.sin(step*i);
        semiCircle[i][2] = y;
    }
}

// checkNumSounds(20)
