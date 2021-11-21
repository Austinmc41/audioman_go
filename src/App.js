import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Button from './components/Button';
import Form from './components/Form';

import * as ROUTES from "./constants/routes";
import nextPages from './constants/nextPages';
import HomePage from "./components/HomePage";
import SoundPage from "./components/SoundPage";


class App extends React.Component {
  constructor(){
		super();
		this.state = {
      data: null
    }
	}

  componentDidMount() {
    fetch("/passages.json", { 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
       }).then(res => res.json()).then(x => {
      this.setState({ data: x["passages"] });
    });  
  }

  render() {
    if (!this.state.data) return "Loading...";

    var i = 0;
    return (
      <Router basename='/'>
        <div className="App">
          <Routes>
            <Route exact path={ROUTES.PAGE1} element={<HomePage/>}/>
            {Object.entries(nextPages).map(([key, value]) => (
              <Route exact path={key} element={<SoundPage nextPage={value} data={this.state.data[i++]}/>}/>
            ))}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App; 
