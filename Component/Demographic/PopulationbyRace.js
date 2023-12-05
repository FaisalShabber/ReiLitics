import React from "react";
import PopulationbyRaceGraph from "./PopulationbyRaceGraph";
import PopulationbyRaceTable from "./PopulationbyRaceTable";

export default function PopulationbyRace(props) {
  return (
    <div className="card">
      <p className="mb-0 fs_25 ">Population by race</p>
      {!isNaN(props.percent[0]) ? (
        <div className="row container gx-3 p-2 d-flex flex-wrap">
          <div className="col-12 my-auto">
            <div className="paginetion_none overflow-auto">
              {/* <div className="d-flex justify-content-between px-3 text-light">
                <p
                  className="fs-23 Gothic_3D mb-0"
                  style={{ color: "#464646" }}
                >
                  Population by race
                </p>
                <p className="fs-23 mb-0" style={{ color: "#464646" }}>
                  Hispanic Non-Hispanic
                </p>
              </div> */}
              <PopulationbyRaceTable table={props.table} />
            </div>
          </div>
          <div className="col-12 my-auto">
            <div className="">
              {props.percent.length > 0 &&
                (props.percent[0] !== 0 ? (
                  <PopulationbyRaceGraph
                    race={props.race}
                    percent={props.percent}
                  />
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
                ))}
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
