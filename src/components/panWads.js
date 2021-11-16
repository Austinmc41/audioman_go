import Wad from 'web-audio-daw';
import {sounds} from '../object_sounds'


// from https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript

const varToString = varObj => Object.keys(varObj)[0];

// initial list to randomly pick from (sounds will be removed from list each time one is played)
var notVisited = sounds; 

// list to add sounds that have already been played to
var visitedSounds = [];

// initial count 
var count = Object.keys(notVisited).length;




export function playSounds(){
   
    while (count !== 0) {
        
        // creating array of object keys for sounds to choose from
        const keys = Object.keys(notVisited);
        // Generate random index based on number of sounds to choose from
        const randIndex = Math.floor(Math.random() * keys.length);
        // use random index to get key random key for random sound
        const randKey = keys[randIndex];
         // use the random key to get the random sound
        const randSound = notVisited[randKey]
        // creating sound 
        const sound = new Wad({
            source: randSound
        })
        // playing sound
        sound.play()
        // adding key to visited sound
        visitedSounds.push(randKey)

        // deleting sound that was just played
        delete notVisited.randKey;
        // setting count to new count
        count = Object.keys(notVisited).length;

    }

    
    

   
    
}

export function getSoundNames(){
    
}

playSounds();