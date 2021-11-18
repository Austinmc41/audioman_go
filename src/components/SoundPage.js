import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import Question from './Question';
import Form from './Form';

class SoundPage extends Component {
    constructor(props){
		super(props);
		this.state = {
            data: ''
        }
	}

    componentDidMount() {
        fetch("/passages.json", { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
           }).then(res => res.json()).then(x => {
          this.setState({ data: x });
        });
        
    }

    render() {
        return (
            <div className='container' style={{marginLeft: "40%"}}>
                <Button/>
                {(this.props.nextPage) &&
                    <NavLink exact activeClassName="active" to={this.props.nextPage}>Next Page</NavLink>
                }  
            </div>
        )
    }
}

export default SoundPage;