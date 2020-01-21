import auth0 from "auth0-js";
import history from "./history";

const DB_CONNECTION = 'Username-Password-Authentication';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "mavrik.auth0.com",
    clientID: "mC0waT1JvCfxFuTxvNvmi3AMq1bmjCKT",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
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
    this.auth0.checkSession({}, (err, authResult) => {
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
    this.auth0.authorize();
  }
  login = values => {
    this.auth0.login(
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
    this.auth0.redirect.signupAndLogin(
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
