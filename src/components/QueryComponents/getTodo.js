import React from "react";
import { Query } from "react-apollo";
import { getIncompleteTodos } from "../queries";
import { Table, Button } from 'antd';

const getData = () => (
  <Query query={getIncompleteTodos}>
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) console.log('Loading...');
      if (error) {
        console.log(`Error! fetching todos.`);
        return false;
      }else {
        return data.profile;
      }
    }}
  </Query>
);

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age'
}];

var gettedData = [];

class GetTodos extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  componentDidMount() {
    gettedData = getData();
    console.log('console data');
    console.log(gettedData);
  }
  
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Add user
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={gettedData} />
      </div>
    );
  }
}

export default GetTodos;