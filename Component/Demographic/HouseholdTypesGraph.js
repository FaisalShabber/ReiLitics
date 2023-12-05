import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const HouseholdTypesGraph = ({ owner, type, renter }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Owner",
        data: owner,
        color: "#F7D680",
      },
      {
        name: "Renter",
        data: renter,
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
        stacked: true,
        stackType: "100%",
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
          // columnWidth: "50%",
          // endingShape: "rounded",
          // borderRadius: 25,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
        lineCap: "round",
      },
      grid: {
        show: false,
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function(value) {
            return value?.toFixed(0) + "%";
          },
          rotate: 330,
          style: {
            colors: ["#555555"],
            fontSize: "10px",
          },
        },
      },
      xaxis: {
        show: true,
        categories: type,
        labels: {
          style: {
            colors: ["#555555"],
            fontSize: "10px",
          },
          // rotate: 330,
        },
      },
    },
  });

  useEffect(() => {
    setChartData((prev) => {
      return {
        series: [
          {
            name: "Owner",
            data: owner,
            color: "#F7D680",
          },
          {
            name: "Renter",
            data: renter,
            color: "#EC8A88",
          },
        ],
        options: {
          ...prev.options,
          yaxis: {
            show: true,
            labels: {
              formatter: function(value) {
                return value?.toFixed(0) + "%";
              },
              rotate: 330,
              style: {
                colors: ["#555555"],
                fontSize: "10px",
              },
            },
          },
          xaxis: {
            show: true,
            categories: type,
            labels: {
              style: {
                colors: ["#555555"],
                fontSize: "10px",
              },
              // rotate: 330,
            },
          },
        },
      };
    });
  }, [owner, renter, type]);

  return (
    <div id="chart" className="my-5">
      {!owner?.length && !renter?.length ? (
        <div className={"alert alert-info"}>
          Unfortunately data is not available from the actual resource!
        </div>
      ) : null}
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};
export default HouseholdTypesGraph;
