import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import * as ROUTES from "./constants/routes";
import nextPages from './constants/nextPages';
import HomePage from "./components/HomePage";
import Consent from './components/consent'
import TestSounds from './components/test_sounds'
import SoundPage from "./components/SoundPage";
import NasaTLXForm from './components/NasaTLXForm';

import passageJSON from './passages.json'


class App extends React.Component {
  constructor(){
		super();
		this.state = {
      data: passageJSON.passages,
      id: uuidv4()
    }
	}

  function

  render() {
    if (!this.state.data) return "Loading...";

    var i = 1;
    return (
      <Router basename='/'>
        <div className="App">
          <Routes>
            <Route exact path={ROUTES.PAGE1} element={<Consent/>}/>
            <Route exact path={ROUTES.PAGE2} element={<HomePage/>}/>
            <Route exact path="/test_sounds" element={<TestSounds/>}/>
            {Object.entries(nextPages).map(([key, value]) => {
              return (key === "/page12") || (key === "/page22") ?
                <Route exact path={key} element={<NasaTLXForm idProp={this.state.id} nextPage={value} data={this.state.data[i++]}/>}/> 
                :
                <Route exact path={key} element={<SoundPage idProp={this.state.id} nextPage={value} data={this.state.data[i++]}/>}/>
            })}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App; 
