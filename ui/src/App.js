import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import Documentation from "./components/Documentation";
import Examples from "./components/Examples";


function App() {

  return (
    
    <div className="App">
      
      <Router>
        <Switch> 
          <Route exact path="/">
            <Home/> 
          </Route> 

          <Route exact path="/example">
            <Examples/> 
          </Route> 
          
          <Route exact path="/documentation">
            <Documentation/> 
          </Route> 
        </Switch> 
      </Router> 

      <div className="App-footer"> 
        Made by Joshua Chua 
      </div> 
    </div>

  );
}

export default App;
