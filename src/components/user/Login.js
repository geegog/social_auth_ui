import React from 'react';
import { API_BASE_URL, GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../constants/index.js'

import axios from 'axios';
import cogoToast from 'cogo-toast';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
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
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
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

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                Alert.success("You're successfully logged in!");
                this.props.history.push("/");
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email"
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="password" name="password"
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
            </form>
        );
    }
}