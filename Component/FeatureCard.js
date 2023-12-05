import React from "react";
import HomeFeature from "./FeatureData";

const FeatureCard = () => {
  return (
    <>
      {HomeFeature.map((data) => {
        return (
          <div
            className="col-lg-3 col-md-6 my-3 d-flex flex-column "
            key={data.id}
          >
            <div
              className="card-bg py-5 px-5 zoom text-center w-100"
              style={{ flex: "1 1 auto" }}
            >
              {data.img}
              <p className="my-3 fs-16 semi-bold">{data.Feature}</p>
              <p className="fs-14">{data.Deatail}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeatureCard;
