import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { API_BASE_URL, GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../constants/index'
import { Link, Redirect } from "react-router-dom";
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton  } from "react-social-login-buttons";
import auth from './auth/auth'

import axios from 'axios';
import cogoToast from 'cogo-toast';

export default class Signup extends React.Component {

    constructor(props){
        super(props);
        this.authObj = new auth();
    }

    render() {
        if(this.authObj.isAthenticated()) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup Page</h1>
                    <SocialSignup />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <SignupForm {...this.props} />
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        );
    }
}

class SocialSignup extends React.Component {
    render() {
        return (
            <div className="social-signup">
                <FacebookLoginButton onClick={() => window.location = FACEBOOK_AUTH_URL} />
                <GoogleLoginButton onClick={() => window.location = GOOGLE_AUTH_URL} />
                <GithubLoginButton onClick={() => window.location = GITHUB_AUTH_URL} />
            </div>
        );
    }
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = Object.assign({}, this.state);

        axios({
            method: 'post',
            url: API_BASE_URL + '/auth/signup',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(signUpRequest)
        })
            .then(response => {
                cogoToast.success("You're successfully registered. Please login to continue!");
                this.props.history.push("/login");
            })
            .catch((error) => {
                if (error.response) {
                    cogoToast.error(error.response.data.message);
                } else if (error.request) {
                    cogoToast.error("Network error!");
                } else {
                    cogoToast.error(error.message);
                }
            })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input required type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input required type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input required type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                </FormGroup>
                <Button type="submit" color="primary" className="btn btn-lg btn-block">Sign Up</Button>
            </Form>
        );
    }
}