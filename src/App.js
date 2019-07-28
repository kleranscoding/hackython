import React, { Component } from 'react';
// import logo from './logo.svg';
import inlogo from './In-logo.png';
import { Link } from 'react-router-dom';
// import LoginPage from '../../components/LoginPage/LoginPage';

import './App.css';
import { Button } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  constructor() {
    super();
    this.state = {

  
    };
  }

  render() {
    return (
      <div className="App">
        <section className="one-fourth" id="html">
          <img src={inlogo} height={75} width={250} bottom={10}/><br></br>
          {/* <img src={signinbutton} height={60} width={200}/><br></br> */}
        </section>
        <div>

        </div>
          <Link to="/login"><Button variant="primary" size="lg">
            Sign In with LinkedIn
          </Button></Link><br></br>

          <Button variant="secondary" size="lg">
            Join now
          </Button>
      </div>
      );
    }
  }
  
  export default App;
      
       
    
