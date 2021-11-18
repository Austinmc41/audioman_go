import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Button from './components/Button';
import Form from './components/Form';

import * as ROUTES from "./constants/routes";
import Page1 from "./pages/page1";

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
            <Route exact path={ROUTES.PAGE1} element={<Page1/>}/>
            <Route exact path={ROUTES.PAGE2} />
            <Route exact path={ROUTES.PAGE3}  />
            <Route exact path={ROUTES.PAGE4} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App; 
