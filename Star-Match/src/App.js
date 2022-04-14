
import React from "react";
import {
  BrowserRouter as Router,  
  Routes,
  Route
} from "react-router-dom";
import './App.scss';

import Layout from "./pages/shared/Layout";
import Home from "./pages/shared/Home";
import StarMatch from './pages/star-game/game';

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/star-match" element={<StarMatch />} />
            </Route>
          </Routes> 
        </Router>
  );
}
export default App;


/**
 * 
 * // import logo from './logo.svg';
 * 
 *       <header className="App-header">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/starmatch">Star Match</Link>
                </li>
              </ul>
            </nav>
          </div>
        </Router>
      </header>

    <div className="App">      
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/star-match" element={<StarMatch />} />
            </Route>
          </Routes> 
        </Router>
      </header>      
    </div>

 *       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
 * 
 */