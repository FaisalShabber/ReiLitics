import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const EmploymentSectorsGraph = ({ sector, sectorDate }) => {
  const [series, setSeries] = useState([
    {
      name: "Number of jobs",
      data: sector,
      color: "#EF6921",
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: "110",
      },
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 3,
      lineCap: "round",
      colors: ["#fff"],
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
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
        rotate: 330,
      },
    },
    xaxis: {
      categories: sectorDate,
      labels: {
        formatter: function(val, index) {
          return val?.toLocaleString();
        },
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
        rotate: 330,
      },
    },
  });

  useEffect(() => {
    if (sector) {
      setSeries([
        {
          name: "Number of jobs",
          data: sector,
          color: "#EF6921",
        },
      ]);
      setOptions((options) => ({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: sectorDate,
        },
      }));
    }
  }, [sector, sectorDate]);

  return (
    <div id="chart">
      {!sector?.length ? (
        <div className={"alert alert-info"}>
          Unfortunately data is not available from the actual resource!
        </div>
      ) : null}
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={550}
      />
    </div>
  );
};

export default EmploymentSectorsGraph;
