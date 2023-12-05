import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const IncomeHHTGraph = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Households",
        color: "#F7D680",
        data: props.houseHolds.slice(0, 10),
      },
      {
        name: "Families",
        color: "#5FB6E9",
        data: props.Married.slice(0, 10),
      },
      {
        name: "MarriedFamilies",
        color: "#EC8A88",
        data: props.marriedFamilies.slice(0, 10),
      },
      {
        name: "NonFamilies",
        color: "#A1E9C4",
        data: props.nonFamlies.slice(0, 10),
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        type: "bar",
        height: 550,
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
        // horizontalAlign: "left",
        fontSize: "14",
        offsetY: 10,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
          borderRadius: 10,
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
      xaxis: {
        labels: {
          rotate: 330,
          style: {
            colors: ["#555555"],
            fontSize: "10px",
          },
        },
        categories: props.income.slice(0, 10),
      },
      yaxis: {
        show: "true",
        labels: {
          rotate: 330,
          formatter: function(value) {
            return value?.toFixed(0) + "%";
          },
          style: {
            colors: ["#555"],
            fontSize: "10px",
          },
        },
        categories: props.income.slice(0, 10),
      },
    },
  });

  useEffect(() => {
    setChartData((prev) => {
      return {
        series: [
          {
            name: "Households",
            color: "#F7D680",
            data: props.houseHolds.slice(0, 10),
          },
          {
            name: "Families",
            color: "#5FB6E9",
            data: props.Married.slice(0, 10),
          },
          {
            name: "MarriedFamilies",
            color: "#EC8A88",
            data: props.marriedFamilies.slice(0, 10),
          },
          {
            name: "NonFamilies",
            color: "#A1E9C4",
            data: props.nonFamlies.slice(0, 10),
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: props.income.slice(0, 10),
          },
          yaxis: {
            ...prev.options.yaxis,
            categories: props.income.slice(0, 10),
          },
        },
      };
    });
  }, [
    props.Married,
    props.houseHolds,
    props.income,
    props.marriedFamilies,
    props.nonFamlies,
  ]);

  return (
    <div id="chart" className="">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={550}
      />
    </div>
  );
};

export default IncomeHHTGraph;
