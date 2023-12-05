import React from "react";
import IncomeHHByTypeGraph from "./IncomeHHByTypeGraph";
import IncomeHHByTypeTable from "./IncomeHHByTypeTable";
import { getItemFromSessionStorage } from "../../helpers/session-storage";

export default function IncomeHHByType(props) {
  const region = getItemFromSessionStorage("region");

  return (
    <div className="card">
      <p className="mb-0 fs_25 mx-3">Households by type</p>
      {props.AvgHouseHold.length > 0 &&
      props.label.length > 0 &&
      !isNaN(props.AvgHouseHold[0]) ? (
        <div className="container p-2 row gx-2 d-flex flex-wrap">
          <div className="my-auto col-12 p-0">
            <div className="overflow-auto paginetion_none" style={(props.packageName === "Free" || props.packageName === "" || props.packageName === undefined) ? { filter: "blur(40px)" } : {}}>
              <IncomeHHByTypeTable table={props.table} />
            </div>
          </div>
        </div>
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
      <div className="w-100">
        <div
          className="mx-1 bg-white brdr"
          style={{ padding: "1rem 1rem 0 1rem" }}
        >
          <div className="d-flex justify-content-between">
            <p className="fs_16">
              <span className="fs_16 Bold">
                {props.avgSize.AverageFamilySize}
              </span>{" "}
              Average Family Size
            </p>
            <p className="fs_16">
              <span className="fs_16 Bold">
                {props.avgSize.AverageHouseholdSize}
              </span>{" "}
              Average Household Size
            </p>
          </div>

          <IncomeHHByTypeGraph
            AvgHouseHold={props.AvgHouseHold}
            label={props.label}
            region={region}
          />
        </div>
      </div>
    </div>
  );
}
