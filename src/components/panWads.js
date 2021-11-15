import Wad from 'web-audio-daw';
import sound_AirplaneJet from '../sounds/AirplaneJet 2004_38.mp3'
import sound_Baby from '../sounds/Baby 2012_49.mp3'
import sound_BathtubDrain  from '../sounds/BathtubDrain TE035401.mp3'
import sound_BellChurch  from '../sounds/BellChurch 2007_06.mp3'
import sound_BubblesJacuzziCaul  from '../sounds/BubblesJacuzziCaul TE019301.mp3'
import sound_Camera from '../sounds/Camera 2007_37.mp3'
import sound_CarShortSlowSpeedS from '../sounds/CarShortSlowSpeedS TE046603.mp3'
import sound_Chicken from '../sounds/Chicken 2004_63.mp3'
import sound_CrowCawing  from '../sounds/CrowCawing TE013001.mp3'
import sound_DogGrowlsViciously  from '../sounds/DogGrowlsViciously TE015601.mp3'
import sound_FireFireplace  from '../sounds/FireFireplace 2010_36.mp3'
import sound_FireworksFireworks  from '../sounds/FireworksFireworks TE028001.mp3'
import sound_FlyBuzzesAgainstWi  from '../sounds/FlyBuzzesAgainstWi TE016601.mp3'
import sound_FootstepsGiantTake  from '../sounds/FootstepsGiantTake TE028601.mp3'
import sound_FootstepsGravel  from '../sounds/FootstepsGravel 2011_14_2.mp3'
import sound_FootstepsLeaves  from '../sounds/FootstepsLeaves 2011_19_2.mp3'
import sound_FootstepsMetal  from '../sounds/FootstepsMetal 2011_25_2.mp3'
import sound_FootstepsSand  from '../sounds/FootstepsSand 2011_29_1.mp3'
import sound_FootstepsSnow  from '../sounds/FootstepsSnow 2012_02_1.mp3'
import sound_FootstepsStone  from '../sounds/FootstepsStone 2011_02_2.mp3'
import sound_FootstepsWater  from '../sounds/FootstepsWater 2012_03_3.mp3'
import sound_FootstepsWood from '../sounds/FootstepsWood 2012_04_2.mp3'
import sound_Garbage  from '../sounds/Garbage 2010_66.mp3'
import sound_KnifeSharpen  from '../sounds/KnifeSharpen 2014_47.mp3'
import sound_LionGrowlsSnarls  from '../sounds/LionGrowlsSnarls TE016701.mp3'
import sound_NutCrackers  from '../sounds/NutCrackers 2014_54.mp3'
import sound_PlasticZipperClosi  from '../sounds/PlasticZipperClosi TE034603.mp3'
import sound_SprayCan  from '../sounds/SprayCan 2014_60.mp3'
import sound_SprinklerAutomatic  from '../sounds/SprinklerAutomatic TE049101.mp3'
import sound_StadiumCrowdCheers  from '../sounds/StadiumCrowdCheers TE017302.mp3'
import sound_TelephoneEuropean  from '../sounds/TelephoneEuropean 2003_06.mp3'
import sound_Thunder_Boom_Fienup_005 from '../sounds/Thunder_Boom_Fienup_005.mp3'
import sound_Toilet  from '../sounds/Toilet 2014_68.mp3'
import sound_Waterfall1MediumSi  from '../sounds/Waterfall1MediumSi TE048701.mp3'
import sound_saw4 from '../sounds/saw4.mp3'


// from https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript
const varToString = varObj => Object.keys(varObj)[0]

// sounds.array.forEach(element => {
//     console.log(element);
// });

const sound1 = new Wad({
    source: sound_AirplaneJet
})

export function playSounds(){
    sound1.play()
}

export function getSoundNames(){
    console.log(varToString(sound1))
}

playSounds()