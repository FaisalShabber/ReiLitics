import React from "react";
import "antd/dist/antd.css";
import { Table, Button, Space, Select, message } from "antd";
import GetData from "../../Api/GetData";
import { Spin } from "antd";

const PopulationbyRaceTable = ({ table }) => {
  // state = {
  //   loading: true,
  // };
  // componentDidMount() {
  //   this.tableData(1);
  // }

  // tableData = (pageNo) => {
  //   const response = GetData.RentalGrowth(pageNo);

  //   response.then((value) => {
  //     this.setState({
  //       data: value?.data?.rentalGrowth,
  //       totalPages: value?.data?.pages,
  //       loading: false,
  //     });
  //   });
  // };

  const columns = [
    {
      title: "Race",
      dataIndex: "race",
    },
    {
      title: "Population",
      dataIndex: "population",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="middle"
        pagination="false"
        dataSource={table}
      />
    </div>
  );
};
export default PopulationbyRaceTable;
