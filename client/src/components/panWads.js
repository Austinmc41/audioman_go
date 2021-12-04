import { Compressor } from 'tone';
import Wad from 'web-audio-daw';
import {sounds} from '../object_sounds'
import * as turf from '@turf/turf'

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
//preprocessed list for spatial audio 
var semiCircle = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]

// positions available for sounds to be played 
var positionLeft = [];

// positions where sounds have already been played
var positionGone = [];

setSemiCircle();

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
     const sound = new Wad({
        source: randSound,
        panning: spatialCoord,
        panningModel: 'HRTF',
        rolloffFactor: 1 })
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

export function setSemiCircle() {
    var r = 50;
    var step = Math.PI/20; 
    for (var i = 0; i < 20; i++) {
        var x = r*Math.cos(step*i);
        semiCircle[i][0] = x;
        var y = r * Math.sin(step*i);
        semiCircle[i][2] = y;
    }
}

checkNumSounds(13)