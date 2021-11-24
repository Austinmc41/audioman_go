import React from 'react'

import {playSound, getSoundNames, checkNumSounds } from './panWads.js'

const Button = () => {
    const handleClick = ()=>{
        //some code here
        //
        checkNumSounds();
        alert("You clicked da button")
       }

    return  (
        <div>
            <button onClick={handleClick}>Click me!</button>
        </div>
    )
}

export default Button