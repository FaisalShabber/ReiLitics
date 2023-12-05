import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PopulationByAgeGraph = ({ feMale, male, lowest, highest, age }) => {
  const arr = age
    .slice(6, 25)
    .filter((props) => props !== "Total" && props !== "85+")
    .sort((a, b) => a - b);
  arr.push("85+");

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
      type: "bar",
      stacked: true,
      stackedType: "100%",
      height: 450,
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
      // horizontalAlign: "right",
      fontSize: "16",
      offsetY: 0,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        // columnWidth: "80%",
        // endingShape: "rounded",
        // borderRadius: 15,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      lineCap: "round",
      colors: ["#fff"],
    },
    grid: {
      show: false,
    },
    yaxis: {
      // min: lowest,
      max: highest,
      labels: {
        formatter: function(val, _) {
          const value = val < 0 ? val.toFixed() * -1 : val;
          return value?.toLocaleString();
        },
        rotate: 330,
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
    xaxis: {
      min: lowest,
      max: highest,
      title: {
        text: "Age",
      },
      categories: arr,
      labels: {
        style: {
          colors: ["#555555"],
          fontSize: "10px",
        },
      },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function(val) {
          return val;
        },
      },
      y: {
        formatter: function(val, _) {
          const value = val < 0 ? val.toFixed() * -1 : val;
          return value?.toLocaleString();
        },
      },
    },
    labels: {
      formatter: function(val) {
        return Math.abs(Math.round(val)) + "%";
      },
    },
  });

  useEffect(() => {
    if (male && feMale) {
      const newSeries = [
        {
          name: "Males",
          data: male.slice(6, 25).filter((props) => props !== male[7]),
          color: "#EC8A88",
        },
        {
          name: "Females",
          data: feMale.slice(6, 25).filter((props) => props !== feMale[7]),
          color: "#F7D680",
        },
      ];
      setSeries(newSeries);
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          min: lowest,
          max: highest,
          title: {
            text: "Age",
          },
          categories: arr,
        },
        yaxis: {
          // min: lowest,
          max: highest,
          labels: {
            formatter: function(val, _) {
              const value = val < 0 ? val.toFixed() * -1 : val;
              return value?.toLocaleString();
            },
            rotate: 330,
            style: {
              colors: ["#555555"],
              fontSize: "10px",
            },
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [male, feMale]);

  return (
    <div id="chart" className="p-5">
      {!feMale?.length && !male?.length ? (
        <div className={"alert alert-info"}>
          Unfortunately this data is not available for this selected region.
        </div>
      ) : null}
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
    </div>
  );
};

export default PopulationByAgeGraph;
