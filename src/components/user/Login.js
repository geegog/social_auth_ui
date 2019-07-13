import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { API_BASE_URL, GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../constants/index'
import { Link, Redirect } from "react-router-dom";
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton  } from "react-social-login-buttons";
import auth from './auth/auth'

import axios from 'axios';
import cogoToast from 'cogo-toast';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.authObj = new auth();
    }

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                cogoToast.error(this.props.location.state.error, {
                    hideAfter: 5
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        if (this.authObj.isAthenticated()) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login Page</h1>
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <LoginForm {...this.props} />
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
                </div>
            </div>
        );
    }
}

class SocialLogin extends React.Component {
    render() {
        return (
            <div className="social-login">
                <FacebookLoginButton onClick={() => window.location = FACEBOOK_AUTH_URL} />
                <GoogleLoginButton onClick={() => window.location = GOOGLE_AUTH_URL} />
                <GithubLoginButton onClick={() => window.location = GITHUB_AUTH_URL} />
            </div>
        );
    }
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        
        this.authObj = new auth();
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

        const loginRequest = Object.assign({}, this.state);

        axios({
            method: 'post',
            url: API_BASE_URL + '/auth/login',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(loginRequest)
        })
            .then(response => {
                this.authObj.setToken(response.data.accessToken);
                cogoToast.success("Login successfully!");
                this.props.history.push("/");
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
                    <Input required type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input required type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                </FormGroup>
                <Button type="submit" color="primary" className="btn btn-lg btn-block">Login</Button>
            </Form>
        );
    }
}