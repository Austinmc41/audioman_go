import React from 'react'

import { playSounds, getSoundNames } from './panWads.js'

const Button = () => {
    const handleClick = ()=>{
        //some code here
        playSounds()
        alert("You clicked da button")
       }

    return  (
        <div>
            <button onClick={handleClick}>Click me!</button>
        </div>
    )
}

export default Button 
