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
import Training from './components/training'
import LearningSounds from './components/learning_sounds'
import Controll from './components/controllCondition'
import SoundPage from "./components/SoundPage";
import NasaTLXForm from './components/NasaTLXForm';

import Speech from './speech'

import passageJSON from './passages.json'


class App extends React.Component {
  constructor(){
		super();
		this.state = {
      data: passageJSON.passages,
      id: uuidv4()
    }
    this.speechContext = new Speech()
    this.passedProps = {
      spk: this.speechContext.speak
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
            <Route exact path={ROUTES.PAGE1} element={<Consent {...this.passedProps} />}/>
            <Route exact path={ROUTES.PAGE2} element={<HomePage idProp={this.state.id} {...this.passedProps} />}/>
            <Route exact path="/learning_sounds" element={<LearningSounds/>} {...this.passedProps} />
            <Route exact path="/controll" element={<Controll />} {...this.passedProps} />
            <Route exact path="/training" element={<Training {...this.passedProps} />}/>
            {Object.entries(nextPages).map(([key, value]) => {
              return (key === "/page11") || (key === "/page19") ?
                <Route key={key} exact path={key} element={<NasaTLXForm idProp={this.state.id} nextPage={value} data={this.state.data[i++]}/>} {...this.passedProps} /> 
                :
                <Route key={key} exact path={key} element={<SoundPage idProp={this.state.id} nextPage={value} data={this.state.data[i++]}/>} {...this.passedProps} />
            })}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App; 
