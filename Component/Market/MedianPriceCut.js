import { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MedianPriceCut = ({ priceCut, priceCutDate, packageName, loading }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Median Price Cut",
        data: loading ? [] : priceCut,
        color: "#EF6921",
      },
    ],
    options: {
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
          formatter: function(value) {
            return Math.round(value.toFixed(3) * 100) + "%";
          },
          style: {
            colors: ["#555555"],
            fontSize: "10px",
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: priceCutDate,
        labels: {
          style: {
            colors: ["#555555"],
            fontSize: "10px",
          },
          format: "MMM, yyyy",
        },
      },
    },
  });

  useEffect(() => {
    setChartData((prev) => {
      return {
        series: [
          {
            name: "Median Price Cut",
            data: priceCut,
            color: "#EF6921",
          },
        ],
        options: {
          ...prev.options,

          xaxis: {
            ...prev.options.xaxis,
            categories: priceCutDate,
          },
        },
      };
    });
  }, [priceCut, priceCutDate]);

  return (
    <>
      <div
        id="chart"
        style={((packageName === "Free" || packageName === "" || packageName === undefined) || loading ) ? { filter: "blur(40px)" } : {}}
      >
        {!priceCut?.length ? (
          <div className={"alert alert-info"}>
            Unfortunately data is not available from the actual resource!
          </div>
        ) : null}
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      {((packageName === "Free" || packageName === "" || packageName === undefined) || loading) && (
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              borderRadius: "20px",
              marginLeft: "5px",
              padding: "0.5rem 2.5rem",
            }}
            className="no_brdr fs-15 btnYelow"
            onClick={() => {
              window.location.href = `/#Prices`;
            }}
          >
            Unlock
          </button>
        </div>
      )}
    </>
  );
};

export default MedianPriceCut;
