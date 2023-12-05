import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const EduAttainmentPieGraph = (props) => {
  const [series, setSeries] = useState(props.percentage);
  const [options, setOptions] = useState({
    labels: props.grade,
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
      fontSize: "12px",
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
                size: "55%",
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
              label: "Education attainment",
              fontSize: "11px",
              textWrap: true,
              fontWeight: 300,
              color: "black",
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    setSeries(props.percentage);
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: props.grade,
      },
    }));
  }, [props]);

  return (
    <div
      id="chart"
      className="mx-auto my-5 donout"
      style={{
        breakWord: "break-word",
        fontSize: "14px",
        maxWidth: "450px",
        textAlign: "center",
        height: "300px",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={"100%"}
      />
    </div>
  );
};

export default EduAttainmentPieGraph;
