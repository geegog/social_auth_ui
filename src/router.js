import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';

import OAuth2RedirectHandler from './components/user/auth/OAuth2RedirectHandler';
import Logout from './components/user/Logout';
import Login from './components/user/Login';
import Signup from "./components/user/SignUp";
import Profile from './components/user/Profile';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/signup">Sign Up</NavLink>
                        </NavItem>
                        <Logout />
                    </Nav>

                    <hr />

                    <Route exact path="/" component={Profile} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                </div>
            </Router>
        );
    }
}

export default Routes;