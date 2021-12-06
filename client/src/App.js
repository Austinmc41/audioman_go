import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import Button from './components/Button';
import Form from './components/Form';

import * as ROUTES from "./constants/routes";
import nextPages from './constants/nextPages';
import HomePage from "./components/HomePage";
import SoundPage from "./components/SoundPage";

import passageJSON from './passages.json'


class App extends React.Component {
  constructor(){
		super();
		this.state = {
      data: passageJSON.passages,
      id: uuidv4()
    }
	}

  componentDidMount() {
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
              <Route exact path={key} element={<SoundPage idProp={this.state.id} nextPage={value} data={this.state.data[i++]}/>}/>
            ))}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App; 
