import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const IncomeHHTMMGraph = ({ mean, median, name }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Mean",
        data: mean,
        color: "#FF8486",
      },
      {
        name: "Median",
        data: median,
        color: "#FFAC7E",
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
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        horizontalAlign: "left",
        fontSize: "14",
        offsetY: 10,
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
            fontSize: "14px",
          },
        },
      },
      xaxis: {
        show: true,
        categories: name,
        labels: {
          style: {
            colors: ["#555555"],
            fontSize: "10px",
          },
          rotate: 330,
        },
      },
    },
  });

  useEffect(() => {
    setChartData((prev) => {
      return {
        series: [
          {
            name: "Mean",
            data: mean,
            color: "#FF8486",
          },
          {
            name: "Median",
            data: median,
            color: "#FFAC7E",
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            show: true,
            categories: name,
            labels: {
              style: {
                colors: ["#555555"],
                fontSize: "10px",
              },
              rotate: 330,
            },
          },
        },
      };
    });
  }, [mean, median, name]);

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

export default IncomeHHTMMGraph;
