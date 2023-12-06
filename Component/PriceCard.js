import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "./pictureCard.module.css";

const PriceCard = ({ data, userPackageId, handleFreeSubscription, userEmail }) => {
  return data.map((each) => (
    <div
      className="col-lg-4 col-md-6 mt-5 mx-auto"
      // className="!t-w-full !t-max-w-[381px] mt-5 mx-auto"
      style={{ marginBottom: "8rem" }}
      key={Math.random()}
    >
      <div
        className="price-card-zoom d-flex text-center h-100 Card-color flex-column shadow brdr"
        style={{ borderRadius: "23px" }}
      >
        <div className="" style={{ flex: "1 1 auto" }}>
          <p
            className="fs-30-normal my-auto t-pt-[52px]"
            style={{ paddingTop: "52px", fontFamily:  "'Poppins', sans-serif !important" }}
          >
            {each.name}
          </p>
          <div className="text-center w-75 price-border div-color edge px-4  mx-auto">
            <p className="Gothic_3D fs-40 font-weight-900">${each.price}</p>
            {each.name !== "Free" && (<p style={{ fontSize: '10px', marginTop: '0px' }}>Cancel Anytime</p>)}
            {each.options
              .filter((item) => item)
              .map((eachOption) => {
                return (
                  <div
                    className="d-flex mt-3 align-items-center"
                    key={eachOption}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} color="#EF6921" />
                    <p
                      className="my-auto ms-2"
                      style={{
                        fontSize: "1.4rem",
                      }}
                    >
                      {eachOption}
                    </p>
                  </div>
                );
              })}
          </div>
          {userPackageId === each._id ? (
            <button
              type="button"
              className={`btn btn_width brdr_2 py-3 mt-5 flex items-center ${styled.button}`}
              style={{ backgroundColor: "#2169ef", color: "#fff" }}
            >
              Currently Subscribed
            </button>
          ) : each.name === "Free" ? (
            <button
              type="button"
              className="btn btn_width btn-orange zoom buy-color mb-5 fs-15 mt-5"
              onClick={() => handleFreeSubscription(each._id)}
            >
              Join
            </button>
          ) : (
            <Link
              href={
                (userEmail === undefined || userEmail === '') ? `/SignUp` : 
                userPackageId === undefined
                  ? `/SignUp/payments?id=${each._id}`
                  : `/SignUp/payments?id=${each._id}`
              }
              passHref
            >
              <button
                type="button"
                className="btn btn_width btn-orange zoom buy-color mb-5 fs-15 mt-5"
              >
                Join
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  ));
};

export default PriceCard;
