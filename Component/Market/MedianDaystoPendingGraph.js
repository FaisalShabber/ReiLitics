import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MedianDaystoPendingGraph = (props) => {
  const [series, setSeries] = useState([
    {
      name: "Median Pending",
      data: props.pending,
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
      position: "top",
      horizontalAlign: "right",
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
      type: "datetime",
      categories: props.pendingDate,
      labels: {
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
        format: "MMM, yyyy",
      },
    },
  });

  useEffect(() => {
    if (
      props.pending !== series[0].data ||
      props.pendingDate !== options.xaxis.categories
    ) {
      var b = {
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: props.pendingDate,
        },
      };
      var c = [
        {
          name: "Median Pending",
          data: props.pending,
          color: "#EF6921",
        },
      ];
      setSeries(c);
      setOptions(b);
    }
  }, [props.pending, props.pendingDate, series, options]);

  return (
    <div id="chart">
      {!props.pending?.length ? (
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

export default MedianDaystoPendingGraph;
