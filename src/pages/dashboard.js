import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import GetTodos from "../components/getTodo";

export var client;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const ACCESS_TOKEN = localStorage.getItem("id_token");
    console.log(ACCESS_TOKEN);
    client = new ApolloClient({
      uri: "https://mavrik-crm.herokuapp.com/v1alpha1/graphql",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
  }

  render() {
    return (
      <div>
        {
          <ApolloProvider client={client}>
            <GetTodos />
          </ApolloProvider>
        }
      </div>
    );
  }
}

export default Dashboard;
