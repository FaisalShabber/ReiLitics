import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const EduAttainmentGraph = ({ feMale, male, grade }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Female",
        data: feMale,
        color: "#F7D680",
      },
      {
        name: "Male",
        data: male,
        color: "#EC8A88",
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          height: "2",
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        // horizontalAlign: "right",
        fontSize: "14",
        offsetY: 10,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "80%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      grid: {
        show: false,
      },
      yaxis: {
        show: true,
        labels: {
          rotate: 330,
          style: {
            colors: ["#555555"],
            fontSize: "13px",
          },
        },
      },
      xaxis: {
        show: true,
        categories: grade,
        labels: {
          formatter: function(val, _) {
            return val?.toLocaleString();
          },
          style: {
            colors: ["#555555"],
            fontSize: "13px",
          },
          rotate: 330,
        },
      },
    },
  });

  useEffect(() => {
    setChartData((prev) => {
      return {
        ...prev,
        series: [
          {
            name: "Female",
            data: feMale,
            color: "#F7D680",
          },
          {
            name: "Male",
            data: male,
            color: "#EC8A88",
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: grade,
          },
        },
      };
    });
  }, [grade, feMale, male]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default EduAttainmentGraph;
