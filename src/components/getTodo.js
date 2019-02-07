import React from "react";
import { Query } from "react-apollo";
import { getIncompleteTodos } from "../queries";
import { Input, Card } from "antd";
import "antd/dist/antd.css";

const GetTodos = () => (
  <Query query={getIncompleteTodos}>
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) return <h2>Loading... </h2>;
      if (error) return `Error! fetching todos.`;
      if (data.profile.length === 0)
        return (
          <div>
            <h3>No Todos Created Yet</h3>
          </div>
        );
      return (
        <div>
          <Card title="This is the testing example.">
            <h4>Datas from PostgresDB by using Hasura.</h4>
            {data.profile.map((todo, _id) => (
              <ul key={_id}>
                <li>{todo.name}</li>
              </ul>
            ))}
            <Input placeholder="Add the info" />
          </Card>
        </div>
      );
    }}
  </Query>
);

export default GetTodos;
