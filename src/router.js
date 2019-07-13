import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OAuth2RedirectHandler from './components/user/auth/OAuth2RedirectHandler';

import Login from './components/user/Login'
import Signup from "./components/user/SignUp";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        {/* <li>
                            <Link to="/">Home</Link>
                        </li> */}
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        {/* <Logout /> */}
                    </ul>

                    <hr />

                    {/* <Route exact path="/" component={LoginForm} /> */}
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} /> 
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                </div>
            </Router>
        );
    }
}

export default Routes;