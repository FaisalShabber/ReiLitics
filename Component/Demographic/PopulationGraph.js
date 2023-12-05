import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PopulationGraph = ({ population, populationDate }) => {
  const [series, setSeries] = useState([
    {
      name: "Population",
      data: population,
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
    fill: {
      opacity: 1,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      // horizontalAlign: "right",
      fontSize: "16",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    yaxis: {
      show: true,
      formatter: function(value) {
        return value;
      },
      title: {
        text: "Population",
      },
      labels: {
        formatter: function(val, _) {
          return val?.toLocaleString();
        },
        rotate: 330,
        style: {
          colors: ["#555555"],
          fontSize: "10px"
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: populationDate,
      labels: {
        show: true,
        rotate: 30,
        style: {
          colors: ["#555555"],
          fontSize: "10px"
        },
      },
    },
  });

  useEffect(() => {
    if (population) {
      setSeries([
        {
          name: "Population",
          data: population,
          color: "#EF6921",
        },
      ]);
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: populationDate,
        },
      }));
    }
  }, [population, populationDate]);

  return (
    <div id="chart">
      {!population?.length ? (
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
};

export default PopulationGraph;
