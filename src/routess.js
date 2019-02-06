import React, { Component } from "react";
import { Route, Router, Link, Redirect, Switch } from "react-router-dom";
import Login from './pages/login';
import Dashboard from "./pages/dashboard";
import Auth from "./services/Auth";
import history from "./services/history";

const auth = new Auth();
const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        {/* <div className="container">
          <Route path="/" render={props => <App auth={auth} {...props} />} />
          <Route
            exact
            path="/dashboard"
            render={props => <Dashboard auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              console.log(props);
              handleAuthentication(props);
              return <div>loading</div>;
            }}
          />
        </div> */}
        <div className="firstPg">
          <div className="navbar navbar-default navbar-inverse container-fluid">
            <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><h3>MavrikCRM</h3></a>
            </div>
            <div className="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  {auth.isAuthenticated() ? (
                    <Link to="/" onClick={auth.logout}>
                      Sign out
                    </Link>
                  ) : (
                    <Link to="/login">Sign in</Link>
                  )}
                </li>
              </ul>
            </div>
            </div>
          </div>
          <Switch>
            <Route
              path="/login"
              render={props => (auth.isAuthenticated() ? <Redirect to="/dashboard" /> : <Login auth={auth} />)}
            />
            <Route
            exact
            path="/dashboard"
            render={props => <Dashboard auth={auth} {...props} />}
            />
            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props);
                return <div>loading</div>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;
