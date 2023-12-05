import React from "react";
import EduAttainmentGraph from "./EduAttainmentGraph";
import EduAttainmentPieGraph from "./EduAttainmentPieGraph";
import EduAttainmentTable from "./EduAttainmentTable";

export default function EduAttainment(props) {
  return (
    <div className="my-4 card">
      <p className="mb-0 fs_25 ">Educational attainment by sex (over 25)</p>
      {!isNaN(props.percentage[0]) ? (
        <div style={ props.packageName === 'Free' ? {filter: 'blur(40px)'} : {}}>
          <div>
            <EduAttainmentGraph
              male={props.male}
              feMale={props.feMale}
              grade={props.grade}
            />
          </div>
          <div className="container my-5 row gx-3 d-flex flex-wrap">
            <div className="my-auto col-12">
              <div className="overflow-auto paginetion_none ">
                <EduAttainmentTable
                  grade={props.grade}
                  eduTableData={props.eduTableData}
                  percentage={props.percentage}
                />
              </div>
            </div>
            <div className="my-auto col-12 ">
              {props.grade.length > 0 && props.percentage.length > 0 && (
                <EduAttainmentPieGraph
                  percentage={props.percentage}
                  grade={props.grade}
                />
              )}
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
    </div>
  );
}
