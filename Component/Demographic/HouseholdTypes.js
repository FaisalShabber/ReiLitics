import React from "react";
import HouseholdTypesGraph from "./HouseholdTypesGraph";
import HouseholdTypesTable from "./HouseholdTypesTable";

export default function HouseholdTypes(props) {
  return (
    <div className="my-4 row card">
      <p className="mb-0 fs_25">Household types</p>
      {props.owner[0] !== "" && props.renter[0] !== "" ? (
        <>
          <div className="row">
            <div className="col-sm-12 col-md-5" style={{ width: "inherit" }}>
              <div className="">
                <span className="d-inline-flex">
                  <p className="my-auto fs-30 me-3">{props.owner[0]}</p>
                  <p className="my-auto fs-15">Rate of Home Ownership</p>
                </span>
                <div className="paginetion_none" style={ (props.packageName === "Free" || props.packageName === "" || props.packageName === undefined) ? { filter: 'blur(40px)' } : {}}>
                  <HouseholdTypesTable
                    table={props.data}
                    owner={props.owner}
                    renter={props.renter}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-7"
            style={{ width: "inherit", marginTop: "3rem" }}
          >
            <div>
              <p className="mb-0 fs_24">
                Renter vs Owner Occupied by Household Type
              </p>

              <div style={ (props.packageName === "Free" || props.packageName === "" || props.packageName === undefined) ? { filter: 'blur(40px)', width: "inherit" } : {}}>
                <HouseholdTypesGraph
                  owner={props.owner}
                  type={props.type}
                  renter={props.renter}
                />
              </div>
            </div>
          </div>
        </>
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
