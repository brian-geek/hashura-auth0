import auth0 from "auth0-js";
import history from "./history";

const DB_CONNECTION = 'Username-Password-Authentication';

export default class Auth {
  constructor() {
    this.webAuth = new auth0.WebAuth({
      domain: 'nikopass.auth0.com',
      clientID: 'P3Qthgs32mtFjyy5wKXARZa0OtdkQM65',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://nikopass.auth0.com/api/v2/',
      responseType: "token id_token",
      scope: "openid profile email update:users read:current_user update:current_user_identities" +
      " create:current_user_metadata update:current_user_metadata delete:current_user_metadata"
    });
  }

  handleAuthentication = () => {
    this.webAuth.parseHash((err, authResult) => {
      console.log(authResult);
      if (
        authResult &&
        authResult.accessToken &&
        authResult.idToken
      ) {
        this.setSession(authResult);
        history.replace("/dashboard");
      } else if (err) {
        history.replace("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setUserInfo = () => {
    this.webAuth.client.userInfo(
      localStorage.getItem('access_token'),
      (err, user) => {
        if (err) {
          console.error(err);
          return;
        }
        console.error('user', user);
        localStorage.setItem('user', user);
      }
    );
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    console.log(expiresAt);
    return new Date().getTime() < expiresAt;
  }
  getAccessToken = () => {
    return this.accessToken;
  }
  getIdToken = () => {
    return this.idToken;
  }

  setSession = authResult => {
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;

    // Set user info and tokens in local storage.
    localStorage.setItem("user", authResult.idTokenPayload.sub);
    localStorage.setItem("id_token", this.idToken);
    localStorage.setItem("access_token", this.accessToken);
    localStorage.setItem("expires_at", expiresAt);

    this.expiresAt = expiresAt;
  }
  renewSession = () => {
    this.webAuth.checkSession({}, (err, authResult) => {
      if(
        authResult &&
        authResult.accessToken &&
        authResult.idToken
      ) {
        this.setSession(authResult);
      } else {
        this.logout();

        console.log(err);

        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();

    history.replace("/");
  }
  loginDefault = () => {
    this.webAuth.authorize();
  }
  login = values => {
    this.webAuth.login(
      {
        realm: DB_CONNECTION,
        username: values.email,
        password: values.password
      },
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  signup = values => {
    this.webAuth.redirect.signupAndLogin(
      {
        connection: DB_CONNECTION,
        email: values.email,
        password: values.password
      },
      err => {
        if(err) {
          console.log(err);
        }
      }
    );
  }
}
