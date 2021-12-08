import React, { Component } from 'react'
import Question   from './Question'
import { getAllSounds, checkNumSounds, stopSounds } from './panWads'


const trainingPassage =         {
            "passageName": "Shoveling Snow",
            "passage": "I want a new toy. Mom says toys cost money. How can I get money? I look outside. There is a lot of snow! Mom says I can earn money if I shovel our driveway. I do. It is fun! I do not have enough money for my new toy. I look around. Mrs. Jen has a shovel. Can I shovel her driveway? She says yes! I almost have enough money for my new toy. Mr. Tom has a shovel. Can I shovel his driveway? He says yes! I can get my new toy!",
            "questions": [
                {
                    "question": "Who are the characters?",
                    "choices": [
                        "Child, Mom, Mrs.Jen and Mr.Tom",
                        "Mr.Tom, Father, Child, Mrs.Jen",
                        "Mr.Jason, Father, Child, Mrs.Jen"
                    ],
                    "answer": "Child, Mom, Mrs.Jen and Mr.Tom"
                },
                {
                    "question": "Where is the setting?",
                    "choices": [
                        "At the playground",
                        "The driveways of mom, Mrs.Jen and Mr.Tom",
                        "The house of mom, Mrs.Jen and Mr.Tom"
                    ],
                    "answer": "The driveways of mom, Mrs.Jen and Mr.Tom"
                },
                {
                    "question": "What is the problem?",
                    "choices": [
                        "The child is lazy at his house",
                        "The child has money, but has no toy to buy",
                        "The child has a toy, but has no money to buy the toy"
                    ],
                    "answer": "The child has a toy, but has no money to buy the toy"
                },
                {
                    "question": "How does he solve the problem?",
                    "choices": [
                        "The child shovels his/her mom's, Mrs.Jen, and Mr.Tom's driveway so he/she can play at the playground later",
                        "The child shovels his/her mom's, Mrs.Jen, and Mr.Tom's driveway to earn money",
                        "The child goes to the store to get a toy"
                    ],
                    "answer": "The child shovels his/her mom's, Mrs.Jen, and Mr.Tom's driveway to earn money"
                }
            ]
        }

export default class Training extends Component {
	constructor(props){
		super(props)
		this.state = {
			numberOfSounds: 3,
			condition: "monaural"
		}
		this.sounds = getAllSounds(["training"])
		this.sound_list = Object.keys(this.sounds)
		this.startTrial = this.startTrial.bind(this)
		this.handleNext = this.handleNext.bind(this)
	}

	handleNext(){
		this.state.numberOfSounds === this.sound_list.length ?
			this.setState({numberOfSounds: 3})
		:
			this.setState({numberOfSounds: this.state.numberOfSounds+1})
	}

	startTrial(){
		checkNumSounds(this.state.numberOfSounds, this.state.condition, "training")
		this.props.spk(trainingPassage.passage)
			.then(stopSounds) // not working for some reason
	}

	render(){
		const soundChoices = this.sound_list.map((s, num)=>(
			<Question type="select" label={"sound" + (num+1)} key={num} choices={["---"].concat(this.sound_list)} />
		))
		const questions = trainingPassage["questions"].map(question=>(
			<Question label={question.question} type="radio" choices={question.choices} />
		))

		return(
			<div>
			<h1>Training Trial</h1>
			<h2>Configuration</h2>
			<p>One set of trials will be using the panning condition, and the other will be using the monaural condition. You should practice with both.</p>
			<Question type="radio" label="Condition" choices={["Monaural", "Panning"]} />
			<button onClick={()=>this.setState({numberOfSounds: 3})}>Reset sounds to 3 from {this.state.numberOfSounds}</button>

			<h2>trial {this.state.numberOfSounds -2}</h2>
			<p>Click the button to start the trial. Note that the trial will last about a minute, and you can't stop or pause the trial once it's started!</p>
			<button onClick={this.startTrial}>Start Trial</button>
			<h3>Sounds</h3>
			{soundChoices}
			<h3>Story Questions</h3>
			{questions}
			<button onClick={this.handleNext}>{this.state.numberOfSounds === this.sound_list.length ? "Reset to 3 sounds" : "Next"}</button>
			</div>
		)
	}
}