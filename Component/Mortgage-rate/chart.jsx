import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function Chart({ data, fifteenYearData, packageName }) {
  const chartRef = useRef(null);


  const [series, setSeries] = useState([
    {
      name: "30-Year Mortgage Rate",
      data: data?.map((obs) => obs.value),
      color: "#EF6921",
    },
    {
      name: "15-Year Mortgage Rate",
      data: fifteenYearData?.map((obs) => obs.value),
      color: "#5FB6E9",
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: packageName !== 'Free',
        zoom: true, // enable zoom
        offsetY: window.innerWidth <= 768 ? -15 : 0,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "12px",
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      show: true,
      title: {
        text: "Rate (%)",
      },
      labels: {
        formatter: function(val, index) {
          return val?.toLocaleString() + "%";
        },
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: data?.map((obs) => obs.date),
      labels: {
        hideOverlappingLabels:false,
        style: {
          colors: ["#555555"],
          fontSize: window.innerWidth <= 768 ? "6px" : "10px",
        },
        format: "MMM, yyyy",
      },
    },
  });

  const updateData = useCallback(() => {
    setSeries([
      {
        name: "30-Year Mortgage Rate",
        data: data?.map((obs) => obs.value),
        color: "#EF6921",
      },
      {
        name: "15-Year Mortgage Rate",
        data: fifteenYearData?.map((obs) => obs.value),
        color: "#5FB6E9",
      },
    ]);
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories: data.map((obs) => obs.date),
      },
    }));
  }, [data, fifteenYearData]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <div id="chart">
      {!data?.length && !fifteenYearData?.length ? (
        <div className={"alert alert-info"}>
          Unfortunately this data is not available for this selected region.
        </div>
      ) : null}
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
        ref={chartRef}
      />
    </div>
  );
}

export default Chart;
