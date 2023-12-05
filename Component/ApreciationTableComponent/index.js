import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";

const columns = [
  {
    title: "Average appreciation",
    render: (record) => (
      <p className="mb-0">{Math.round(record?.avgGrowth * 100) / 100}%</p>
    ),
    width: "20%",
    bordered: true,
  },
  {
    title: "2018",
    width: "10%",
    render: (record) => <>{Math.round(record?.y2018 * 100) / 100}%</>,
  },
  {
    title: "2019",
    width: "10%",
    render: (record) => <>{Math.round(record?.y2019 * 100) / 100}%</>,
  },
  {
    title: "2020",
    width: "10%",
    render: (record) => <>{Math.round(record?.y2020 * 100) / 100}%</>,
  },
  {
    title: "2021",
    width: "10%",
    render: (record) => <>{Math.round(record?.y2021 * 100) / 100}%</>,
  },
  {
    title: "2022",
    width: "10%",
    render: (record) => <>{Math.round(record?.y2022 * 100) / 100}%</>,
  },
  {
    title: "2023",
    width: "10%",
    render: (record) => <>{Math.round(record?.Y2023 * 100) / 100}%</>,
  },
  {
    title: "Current Median Sale",
    width: "20%",
    dataIndex: "median",
    render: (record) => <>${Number(record)?.toLocaleString()}</>,
  },
];
export default function ApreciationTableComponent(props) {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.AppreciationData}
        size="small"
        className={"average-appreciation"}
        scroll={{ x: true }}
        responsive={true}
      />
    </div>
  );
}
