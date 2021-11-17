import React from 'react'

import { playSounds, getSoundNames, checkNumSound } from './panWads.js'

const Button = () => {
    const handleClick = ()=>{
        //some code here
        checkNumSound()
        alert("You clicked da button")
       }

    return  (
        <div>
            <button onClick={handleClick}>Click me!</button>
        </div>
    )
}

export default Button