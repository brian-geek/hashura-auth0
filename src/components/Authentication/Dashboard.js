import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const accessToken = localStorage.getItem("id_token");
    props.auth.setUserInfo();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Dashboard;
