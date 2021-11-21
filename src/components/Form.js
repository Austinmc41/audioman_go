import React, { Component } from 'react';

import Question from './Question';


class Form extends Component {
    constructor(props){
		super(props);
        this.state = {}
	}

    render() {
        return (
            <form class="center">
                {this.props.questions.map((item, index) => (
                    <Question type={item["type"]} label={item["label"]} choices={item["choices"]}/>
                ))}
            </form>
        )
    }
}

export default Form;