import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";

const HouseholdTypesTable = (props) => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Owner",
      dataIndex: "owner",
    },
    {
      title: "Renter",
      dataIndex: "renter",
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <div>
      <Table
        columns={columns}
        size="middle"
        pagination="false"
        dataSource={props.table}
        rowClassName={rowClassName}
      />
    </div>
  );
};

export default HouseholdTypesTable;
