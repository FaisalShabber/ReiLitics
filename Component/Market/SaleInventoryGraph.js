import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SaleInventoryGraph = ({ inventry, inventryDate }) => {
  const [series, setSeries] = useState([
    {
      name: "Sales inventory",
      data: inventry,
      color: "#EF6921",
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
      show: true,
      position: "top",
      fontSize: "12px",
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      show: true,
      formatter: function(value) {
        return value;
      },
      labels: {
        formatter: function(val, index) {
          return val?.toLocaleString();
        },
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: inventryDate,
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
        name: "Sales inventory",
        data: inventry,
        color: "#EF6921",
      },
    ]);
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories: inventryDate,
      },
    }));
  }, [inventry, inventryDate]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <div id="chart">
      {!inventry?.length ? (
        <div className={"alert alert-info"}>
          Unfortunately data is not available from the actual resource!
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
};

export default SaleInventoryGraph;
