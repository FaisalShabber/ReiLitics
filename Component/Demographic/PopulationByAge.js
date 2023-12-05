/* eslint-disable @next/next/no-img-element */
import React from "react";
import PopulationByAgeGraph from "./PopulationByAgeGraph";

export default function PopulationByAge(props) {
  const sliced = Object.keys(props.totalFullArray)
    .slice(12, 18)
    .reduce((result, key) => {
      if (key === "Region") {
        key = "85+";
      }

      result[key] = parseFloat(props.totalFullArray[key].replace(/,/g, ""));

      return result;
    }, {});

  const values = Object.values(sliced);
  const Seniorsum = values.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const male = parseFloat(props.sexMaleRatioTotal.toString().replace(/,/g, ""));
  const Total = parseFloat(props.totalSexRaitio.toString().replace(/,/g, ""));

  const maxmaleArr = props.male.filter((val) => val !== props.male[7]);
  const mminfemaleArr = props.feMale.filter((val) => val !== props.feMale[7]);

  const maxNumber = Math.max(...maxmaleArr);
  const minNumber = Math.min(...mminfemaleArr);

  const FemaleTotal = Total - male;
  const MaleSexRaitio = (male / Total) * 100;
  const FemaleSexRaitio = (FemaleTotal / Total) * 100;

  return (
    <div>
      <div className="p-0 my-4 card">
        <div className="p-5 w-50">
          <p className="mb-0 fs_25">Population by age</p>
        </div>
        {props.male.length > 0 && props.age.length && (
          <div style={ (props.packageName === "Free" || props.packageName === "" || props.packageName === undefined) ? { filter: "blur(40px)" } : {}}>
            <PopulationByAgeGraph
              male={props.male}
              feMale={props.feMale}
              age={props.age}
              lowest={minNumber}
              highest={maxNumber}
            />
          </div>
        )}
      </div>
      {props.totalMedian.length &&
      props.maleMedian.length &&
      props.femaleMedian ? (
        <div className="m-1 mt-3 brdr" style={{ background: "white" }}>
          <div className="container my-4 row g-5">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <p className="fs_25">Median Age</p>
              <div className="text-center d-flex justify-content-between">
                <div className="">
                  <img src={"/people.svg"} alt="" />
                  <p className="fs_16">Total</p>
                  <p className="fs-29">{props.totalMedian}</p>
                </div>
                <div className="">
                  <img src={"/people.svg"} alt="" />
                  <p className="fs_16">Male</p>
                  <p className="fs-29">{props.maleMedian}</p>
                </div>
                <div className="">
                  <img src={"/people.svg"} alt="" />
                  <p className="fs_16">Female</p>
                  <p className="fs-29">{props.femaleMedian}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <p className="fs_25">Age Dependency</p>
              <div className="d-flex flex-column">
                <span className="d-inline-flex">
                  <p className="my-auto fs_16">Age Dependency Ratio</p>
                  <p className="my-auto fs_25 ms-auto">{props.AgeDepend}</p>
                </span>
                <span className="d-inline-flex">
                  <p className="my-auto fs_16">Old Age Dependency Ratio</p>
                  <p className="my-auto fs_25 ms-auto">{props.OldAgeDepend}</p>
                </span>
                <span className="d-inline-flex">
                  <p className="my-auto fs_16">Child Dependency Ratio</p>
                  <p className="my-auto fs_25 ms-auto">
                    {props.ChildAgeDepend}
                  </p>
                </span>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-12">
                  <p className="fs_25">Sex Ratio</p>
                  <div>
                    <div className="d-flex justify-content-between">
                      <p className="fs_16 Bold">Female</p>
                      <p className="fs_16">{FemaleTotal?.toLocaleString()}</p>
                      <p className="fs_16">{FemaleSexRaitio.toFixed(2)}%</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fs_16 Bold">Male</p>
                      <p className="fs_16">{male?.toLocaleString()}</p>
                      <p className="fs_16">{MaleSexRaitio.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-12">
                  <p className="fs_25">Adults</p>
                  {/* <p className='fs-15'>There are 651,238 adults, (105,185 of whom are seniors) in Indianapolis.</p> */}
                  <p className="fs-15">
                    There are {Number(props.tltAdlt)?.toLocaleString()} adults,
                    ({Seniorsum?.toLocaleString()} of whom are seniors).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontSize: "20px",
          }}
        >
          Sorry, currently there is no information available for this location
        </div>
      )}
    </div>
  );
}
