import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";

const IncomeHHByTypeTable = (props) => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Average Size",
      dataIndex: "avgSize",
    },
    {
      title: "Owned",
      dataIndex: "owned",
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
        dataSource={props.table.filter(
          (props) => props.count && props.avgSize && props.owned
        )}
        rowClassName={rowClassName}
      />
    </div>
  );
};

export default IncomeHHByTypeTable;
