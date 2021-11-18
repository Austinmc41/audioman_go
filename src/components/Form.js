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
                <Question type="text" label="Age" choices={[]}/>
                <Question type="text" label="Gender" choices={[]}/>
                <Question type="radio" label="Race" choices={["White", "Hispanic or Latino", "Black or African American", "Native American or American Indian", "Asian/Pacific Islander", "Other"]}/>
                <Question type="text" label="Musical Ability" choices={[]}/>
                <Question type="text" label="Anxiety Level on Tests" choices={[]}/>
                <Question type="text" label="Hearing Level" choices={[]}/>
            </form>
        )
    }
}

export default Form;