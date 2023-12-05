import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function ApexMedianChart({ list, sales, listDate }) {
  const [series, setSeries] = useState([
    {
      name: "List price",
      data: list,
      color: "#EF6921",
    },
    {
      name: "Sales price",
      data: sales,
      color: "#5FB6E9",
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    legend: {
      position: "top",
      fontSize: "12px",
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      show: true,
      formatter: function(value) {
        return "$" + value;
      },
      labels: {
        formatter: function(val, index) {
          return "$" + val?.toLocaleString();
        },
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: listDate,
      labels: {
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
        format: "MMM, yyyy",
      },
    },
  });

  const updateData = useCallback(() => {
    setSeries([
      {
        name: "List price",
        data: list,
        color: "#EF6921",
      },
      {
        name: "Sales price",
        data: sales,
        color: "#5FB6E9",
      },
    ]);
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories: listDate,
      },
    }));
  }, [list, sales, listDate]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <div id="chart">
      {!list?.length && !sales?.length ? (
        <div className={"alert alert-info"}>
          Unfortunately this data is not available for this selected region.
        </div>
      ) : null}
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default ApexMedianChart;
