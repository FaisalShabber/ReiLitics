import React from "react";
import "antd/dist/antd.css";
import { Table, Button, Space, Select, message } from "antd";
import GetData from "../../Api/GetData";
import { Spin } from "antd";

class EduAttainmentTable extends React.Component {
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Count",
        dataIndex: "count",
      },
      {
        title: "Percentage",
        dataIndex: "percentage",
      },
    ];
    return (
      <>
        <div>
          <Table
            columns={columns}
            size="middle"
            pagination="false"
            dataSource={this.props.eduTableData}
          />
        </div>
      </>
    );
  }
}
export default EduAttainmentTable;
