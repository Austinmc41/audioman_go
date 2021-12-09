import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

import * as ROUTES from "./constants/routes";
import nextPages from './constants/nextPages';
import HomePage from "./components/HomePage";
import Consent from './components/consent'
import Training from './components/training'
import LearningSounds from './components/learning_sounds'
import Controll from './components/controllCondition'
import SoundPage from "./components/SoundPage";
import NasaTLXForm from './components/NasaTLXForm';
import FinalPage from './components/finalPage';

import Speech from './speech'

import passageJSON from './passages.json'


class App extends React.Component {
  constructor(){
		super();
		this.state = {
      data: passageJSON.passages,
      id: uuidv4(),
      condition: "pan",
      soundScape: "soundscape" + _.random(1,2),
      data: {}, // this is data like: "trial1": {"trials": [...]}
    }
    this.speechContext = new Speech()
    this.passedProps = {
      spk: this.speechContext.speak
    }
    this.handleConditionChange = this.handleConditionChange.bind(this)
    this.handleDataChange = this.handleDataChange.bind(this)
  }

	handleDataChange(trial, data){
		this.setState({data: Object.assign({}, this.state.data, {trial: data})})
	}

	handleConditionChange(value){
		this.setState({condition:value})
	}

  function

  render() {
    if (!this.state.data) return "Loading...";

    var i = 1;
    return (
      <Router basename='/'>
        <div className="App">
          <Routes>
            <Route exact path={ROUTES.PAGE1} element={<Consent nextPage="/demographics" {...this.passedProps} handleConditionChange={this.handleConditionChange} />}/>
            <Route exact path={ROUTES.PAGE2} element={<HomePage nextPage="/training" idProp={this.state.id} {...this.passedProps} />}/>
            <Route exact path="/learning_sounds" element={<LearningSounds nextPage="/trial1" handleDataChange={this.handleDataChange} {...this.passedProps} />} />
            <Route exact path="/controll" element={<Controll />} {...this.passedProps} />
            <Route exact path="/trial1" element={<SoundPage nextPage="/nasaTLX1" condition={this.state.condition} soundScape={this.state.soundScape} trialNum={1} handleDataChange={this.handleDataChange} {...this.passedProps} />} />
            <Route exact path="/trial2" element={<SoundPage nextPage="/nasaTLX2" condition={this.state.condition === "pan" ? "monaural" : "pan"} soundScape={this.state.soundScape === "soundscape1" ? "soundscape2" : "soundscape1"} trialNum={1} handleDataChange={this.handleDataChange} {...this.passedProps} />} />
            <Route exact path="/training" element={<Training nextPage="/learning_sounds" handleDataChange={this.handleDataChange} {...this.passedProps} />}/>
            <Route exact path="/nasaTLX1" element={<NasaTLXForm nextPage="/trial2" handleDataChange={this.handleDataChange} {...this.passedProps} />}/>
            <Route exact path="/nasaTLX2" element={<NasaTLXForm nextPage="/finalPage" handleDataChange={this.handleDataChange} {...this.passedProps} />}/>
            <Route exact path="/finalPage" element={<FinalPage {...this.passedProps} />}/>

{/*
            {Object.entries(nextPages).map(([key, value]) => {
              return (key === "/page11") || (key === "/page19") ?
                <Route key={key} exact path={key} element={<NasaTLXForm idProp={this.state.id} nextPage={value} data={this.state.data[i++]}/>} {...this.passedProps} /> 
                :
                <Route key={key} exact path={key} element={<SoundPage idProp={this.state.id} nextPage={value} data={this.state.data[i++]}/>} {...this.passedProps} />
            })}
*/}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App; 
