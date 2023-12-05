import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const IncomeHHByTypeGraph = ({ AvgHouseHold, label, region }) => {
  const [chatData, setChartData] = useState({
    series: AvgHouseHold,
    options: {
      labels: label,
      colors: [
        "#EC8A88",
        "#FBCAC9",
        "#C3E9FF",
        "#5FB6E9",
        "#A1E9C4",
        "#DBFDEB",
        "#F7D680",
      ],
      chart: {
        width: 300,
        type: "donut",
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        // horizontalAlign: "left",
        fontSize: "14",
      },
      responsive: [
        {
          breakpoint: 750,
          options: {
            plotOptions: {
              pie: {
                expandOnClick: false,
                dataLabels: {
                  minAngleToShowLabel: 360,
                },
                donut: {
                  size: "35%",
                  background: "transparent",
                  labels: {
                    show: false,
                  },
                },
              },
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          customScale: 1.5,
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: "60",
          },
          donut: {
            size: "55%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "15px",
                color: "black",
                fontWeight: 600,
              },
              value: {
                show: true,
                fontSize: "15px",
                fontWeight: 400,
              },
              total: {
                show: true,
                label: "Households by type",
                fontSize: "11px",
                textWrap: true,
                fontWeight: 300,
                color: "black",
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    setChartData((prev) => {
      return {
        series: AvgHouseHold,
        options: {
          ...prev.options,
          labels: label,
        },
      };
    });
  }, [AvgHouseHold, label, region]);
  return chatData.series.includes(NaN) ? (
    <div className="text-center d-flex align-items-center justify-content-center mt-5">
      Sorry, currently there is no information available for this location
    </div>
  ) : (
    <div
      id="chart"
      className="mx-auto donout"
      style={{
        maxWidth: "400px",
        textAlign: "center",
        height: "300px",
      }}
    >
      <ReactApexChart
        options={chatData.options}
        series={chatData.series}
        type="donut"
        width={"100%"}
      />
    </div>
  );
};

export default IncomeHHByTypeGraph;
