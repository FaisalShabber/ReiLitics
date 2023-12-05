import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SharePriceCutGraph = ({ shareList, shareDate, packageName, loading }) => {
  const [series, setSeries] = useState([
    {
      name: "List Price Cut",
      data: loading ? [] : shareList,
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
      categories: shareDate,
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
    if (shareList && shareDate) {
      setSeries([
        {
          name: "List Price Cut",
          data: shareList,
          color: "#EF6921",
        },
      ]);
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: shareDate,
        },
      }));
    }
  }, [shareList, shareDate]);

  return (
    <>
      <div
        id="chart"
        style={((packageName === "Free" || packageName === "" || packageName === undefined) || loading) ? { filter: "blur(40px)" } : {}}
      >
        {!shareList?.length ? (
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

export default SharePriceCutGraph;
