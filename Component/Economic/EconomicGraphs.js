import React from "react";
import UnemploymentRateGraph from "./UnemploymentRateGraph";
import EmploymentSectorsGraph from "./EmploymentSectorsGraph";

export default function EconomicGraphs(props) {
  return (props.employmentDate.length > 0 &&
    props.unEmploymentData.length > 0) ||
    (props.sector.length > 0 && props.sectorDate.length > 0) ? (
    <>
      {props.employmentDate.length > 0 && props.unEmploymentData.length > 0 && (
        <div className="card p-3 bg_light">
          <div className="card my-4">
            <div className="w-100">
              <p className="fs_25 mb-0">Unemployment rate at city level</p>
            </div>
            <div style={props.packageName === 'Free' ? { filter: 'blur(40px)' } : {}}>
              <UnemploymentRateGraph
                employmentDate={props.employmentDate}
                unEmploymentData={props.unEmploymentData}
              />
            </div>
          </div>
        </div>
      )}
      {props.sector.length > 0 && props.sectorDate.length > 0 && (
        <div className="card p-3 bg_light mt-3">
          <div className="d-block col-6">
            <label className="orangetxt fs-13">Select State</label>
            <select
              className="form-control form-select form-control-sm"
              onChange={(e) => props.onChange(e.target.value)}
              value={props.sectorState}
            >
              {props?.states?.map((state) => {
                return (
                  <option value={state.name} key={state.name}>
                    {state.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="card my-4">
            <div className="d-lg-inline-flex w-100">
              <div className="w-100">
                <p className="fs_25 mb-0">Employment sectors at state level</p>
              </div>
            </div>
            <div style={ (props.packageName === "Free" || props.packageName === "" || props.packageName === undefined) ? { filter: 'blur(40px)' } : {}}>
              <EmploymentSectorsGraph
                sector={props.sector}
                sectorDate={props.sectorDate}
              />
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div
      style={{
        fontSize: "24px",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      Sorry, currently there is no information available for this location
    </div>
  );
}
