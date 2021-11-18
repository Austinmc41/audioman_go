import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Button from './components/Button';
import Form from './components/Form';

import * as ROUTES from "./constants/routes";
import HomePage from "./components/HomePage";
import SoundPage from "./components/SoundPage";

//import passage1 from "./passages/passages.json"

/*
const App = () => {
  return (
    <div className='container' style={{marginLeft: "40%"}}>
      <Button/>
      <Form/>
    </div>
  )
}
*/

class App extends React.Component {
  render() {
    return (
      <Router basename='/'>
        <div className="App">
          <Routes>
            <Route exact path={ROUTES.PAGE1} element={<HomePage/>}/>
            <Route exact path={ROUTES.PAGE2} element={<SoundPage/>}/>
            <Route exact path={ROUTES.PAGE3} />
            <Route exact path={ROUTES.PAGE4} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App; 
