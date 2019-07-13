import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { API_BASE_URL } from '../constants/index'
import auth from './auth/auth'

import axios from 'axios';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.authObj = new auth();
    }

    
    componentDidMount() {
        axios({
            method: 'get',
            url: API_BASE_URL + '/api/user/me',
            headers: this.authObj.getAuthHeader()
        })
            .then(res => {
                console.log(res.data)
                const user = res !== undefined ? res.data : [];
                this.setState({ user: user });
            })
    }

    render() {

        if (!this.authObj.isAthenticated()) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.state.user.imageUrl ? (
                                    <img src={this.state.user.imageUrl} alt={this.state.user.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.state.user.name && this.state.user.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.state.user.name}</h2>
                           <p className="profile-email">{this.state.user.email}</p>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}