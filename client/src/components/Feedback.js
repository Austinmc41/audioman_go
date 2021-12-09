import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Feedback(props){
	const [ text, setText ] = useState("")
	const [ redirect, setRedirect ] = useState(false)
	
	function handleClick(){
		props.handleDataChange("feedback", text)
		setRedirect(true)
	}
	
	return(
		<div>
		{redirect ? <Navigate to={props.nextPage} /> : null}
		<h1>Feedback</h1>
		<label htmlFor="txt">Now all the trials are complete, please write any thoughts you had about the experiment. Are there any mental or sensory processing attributes that may have influenced your results?</label>
		<textarea onChange={e=>setText(e.target.value)} id="txt" maxLength={2000} />
		<button onClick={handleClick}>Save and next</button>
	</div>
	)
}