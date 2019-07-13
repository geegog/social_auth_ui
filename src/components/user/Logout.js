import React from 'react';
import auth from './auth/auth'
import { withRouter } from "react-router-dom";

const authObj = new auth();

class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.authObj = new auth();

    }

    handleLogout() {
        authObj.logout();
        this.props.history.push('/login');
    }
    render() {
        if (this.authObj.isAthenticated()) {
            return (
                <li>
                    <div className="btn-link" onClick={this.handleLogout.bind(this)}>Logout</div>
                </li>
            );
        } else {
            return null;
        }
    }
}

export default withRouter(Logout);