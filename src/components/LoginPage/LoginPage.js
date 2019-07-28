import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loginblue from '../../mainbackgroundblue@3x.png';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import inlogo from '../../In-logo.png';




let sectionStyle = {
    backgroundImage: 'url(' + {loginblue} + ')'
};

class LoginPage extends Component {
  
  state = {

  };
  

  render() {
    return (
        <div className="LoginPage">
            <h1>Login Page</h1>
            <section style={ sectionStyle } className="one-fourth" id="html">
                <img src={inlogo} height={75} width={250}  /><br></br>
            </section>

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
        </div>
    );
  }
}

export default LoginPage;
        
        
        