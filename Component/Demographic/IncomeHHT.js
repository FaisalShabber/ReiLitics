import React from "react";
import IncomeHHTGraph from "./IncomeHHTGraph";
import IncomeHHTMMGraph from "./IncomeHHTMMGraph";
import IncomeHHTTable from "./IncomeHHTTable";

export default function IncomeHHT(props) {
  return (
    <div className="my-4 card">
      <div className="w-fit" style={{ width: "fit-content" }}>
        <p className="mb-0 fs_25 ">Income by household type</p>
      </div>
      {props.houseHolds[0] !== "" ||
      props.Married[0] !== "" ||
      props.nonFamlies[0] !== "" ||
      props.marriedFamilies[0] ? (
        <IncomeHHTGraph
          houseHolds={props.houseHolds}
          Married={props.Married}
          nonFamlies={props.nonFamlies}
          marriedFamilies={props.marriedFamilies}
          income={props.income}
        />
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "50px 0",
            fontSize: "20px",
          }}
        >
          Sorry, currently there is no information available for this location
        </div>
      )}
      {/* {(props.mean[0] !== "" || props.median[0] !== "") && (
        <div className="container p-5 my-5 row">
          <div
            className="my-auto col-sm-12 col-lg-5"
            style={{ width: "inherit" }}
          >
            <div className="overflow-auto paginetion_none Income_table">
              <IncomeHHTTable table={props.table} />
            </div>
          </div>
        </div>
      )} */}
      {/* {(props.mean[0] !== "" || props.median[0] !== "") && (
        <div
          className="my-auto col-sm-12 col-lg-7"
          style={{ width: "inherit" }}
        >
          <div>
            <IncomeHHTMMGraph
              mean={props.mean}
              name={props.name}
              median={props.median}
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
