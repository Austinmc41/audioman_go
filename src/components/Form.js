import React, { Component } from 'react';

import Question from './Question';


class Form extends Component {
    constructor(props){
		super(props);
        this.state = {}
	}

    render() {
        return (
            <form>
                <Question type="text" label="Age" choices={[]}/>
            </form>
        )
    }
}

export default Form;