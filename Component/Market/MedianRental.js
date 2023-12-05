import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MedianRental = (props) => {
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
          return "$" + value;
        },
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: props.loading ? [] : props.medianDate,
      labels: {
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
        format: "MMM, yyyy",
      },
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Median Rental",
      data: props.median,
      color: "#EF6921",
    },
  ]);

  useEffect(() => {
    if (props.median !== [] && props.medianDate !== []) {
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: props.medianDate,
        },
      });
      setSeries([
        {
          name: "Median Rental",
          data: props.median,
          color: "#EF6921",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.median, props.medianDate]);

  return (
    <>
      <div
        id="chart"
        style={((props.packageName === "Free" || props.packageName === "" || props.packageName === undefined) || props.loading) ? { filter: "blur(40px)" } : {}}
      >
        {!props.median?.length ? (
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
      {((props.packageName === "Free" || props.packageName === "" || props.packageName === undefined) || props.loading) && (
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

export default MedianRental;
