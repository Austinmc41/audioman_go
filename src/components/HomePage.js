import React, { Component } from 'react';

import Button from './Button';
import Form from './Form';

class HomePage extends Component {
    constructor(props){
		super(props);
		this.state = {
            data: ''
        }
	}

    componentDidMount() {
        fetch("/passages.json").then(res => res.json()).then(x => {
          this.setState({ data: x });
        });
        console.log(this.state.data);
    }

    render() {
        //var data = JSON.parse(this.props.file);
        //console.log(data);
        return (
            <div className='container' style={{marginLeft: "40%"}}>
                <Button/>
            </div>
        )
    }
}

export default HomePage;