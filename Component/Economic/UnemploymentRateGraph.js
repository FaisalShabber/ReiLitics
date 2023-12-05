import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const UnemploymentRateGraph = ({ unEmploymentData, employmentDate }) => {
  console.log(employmentDate);
  const [series, setSeries] = useState([
    {
      name: "% of Population",
      data: unEmploymentData,
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
      labels: {
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
    xaxis: {
      type: "",
      categories: employmentDate,
      labels: {
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
  });

  useEffect(() => {
    setSeries([
      {
        name: "% of Population",
        data: unEmploymentData,
        color: "#EF6921",
      },
    ]);
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: employmentDate,
      },
    }));
  }, [unEmploymentData, employmentDate]);

  return (
    <div id="chart">
      {!unEmploymentData?.length ? (
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

export default UnemploymentRateGraph;
