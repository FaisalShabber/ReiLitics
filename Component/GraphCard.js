import { React, useState } from "react";

export default function GraphComponent(props) {
  if (props.heading === "Median list price vs median sale price") {
    return (
      <div className="  my-4 ">
        <div className="card">
          <div className="d-lg-inline-flex w-100">
            <div className="w-100">
              <p className="fs_25 mb-0">{props.heading}</p>
            </div>
            {/* <div className="ms-auto d-lg-inline-flex d-md-inline-flex d-sm-block">
            <p className="fs-12 my-auto greyBlack">
              Provided via the Zillow Public Records API
            </p>
            <img src="/ZilowLogo.svg" className="w-25 ms-auto" />
          </div> */}
          </div>
          {/* <div className="d-block w-25">
            <div className="d-inline-flex w-100">
              <label className='fs-14 w-25 my-auto me-3'>Year</label>
            </div>
          </div> */}
          <div>{props.children}</div>
        </div>
      </div>
    );
  } else if (props.heading === "Median price cut") {
    return (
      <div className="  my-4">
        <div className="card">
          <div className="d-lg-inline-flex w-100">
            <div className="w-100">
              <p className="fs_25 mb-0">{props.heading}</p>
            </div>
            {/* <div className="ms-auto d-lg-inline-flex d-md-inline-flex d-sm-block">
            <p className="fs-12 my-auto greyBlack">
              Provided via the Zillow Public Records API
            </p>
            <img src="/ZilowLogo.svg" className="w-25 ms-auto" />
          </div> */}
          </div>
          {/* <div className="d-block w-25">
            <div className="d-inline-flex w-100">
              <label className='fs-14 w-25 my-auto me-3'>Year</label>
            </div>
          </div> */}
          <div>{props.children}</div>
        </div>
      </div>
    );
  } else if (props.heading === "Median rental") {
    return (
      <div className="  my-4 ">
        <div className="card">
          <div className="d-lg-inline-flex w-100">
            <div className="w-100">
              <p className="fs_25 mb-0">{props.heading}</p>
            </div>
            {/* <div className="ms-auto d-lg-inline-flex d-md-inline-flex d-sm-block">
            <p className="fs-12 my-auto greyBlack">
              Provided via the Zillow Public Records API
            </p>
            <img src="/ZilowLogo.svg" className="w-25 ms-auto" />
          </div> */}
          </div>
          {/* <div className="d-block w-25">
            <div className="d-inline-flex w-100">
              <label className='fs-14 w-25 my-auto me-3'>Year</label>
            </div>
          </div> */}
          <div>{props.children}</div>
        </div>
      </div>
    );
  } else if (props.heading === "For sale inventory") {
    return (
      <div className="  my-4">
        <div className="card">
          <div className="d-lg-inline-flex w-100">
            <div className="w-100">
              <p className="fs_25 mb-0">{props.heading}</p>
            </div>
            {/* <div className="ms-auto d-lg-inline-flex d-md-inline-flex d-sm-block">
            <p className="fs-12 my-auto greyBlack">
              Provided via the Zillow Public Records API
            </p>
            <img src="/ZilowLogo.svg" className="w-25 ms-auto" />
          </div> */}
          </div>
          {/* <div className="d-block w-25">
            <div className="d-inline-flex w-100">
              <label className='fs-14 w-25 my-auto me-3'>Year</label>
            </div>
          </div> */}
          <div>{props.children}</div>
        </div>
      </div>
    );
  } else if (props.heading === "Median days to pending") {
    return (
      <div className="  my-4 ">
        <div className="card">
          <div className="d-lg-inline-flex w-100">
            <div className="w-100">
              <p className="fs_25 mb-0">{props.heading}</p>
            </div>
            {/* <div className="ms-auto d-lg-inline-flex d-md-inline-flex d-sm-block">
            <p className="fs-12 my-auto greyBlack">
              Provided via the Zillow Public Records API
            </p>
            <img src="/ZilowLogo.svg" className="w-25 ms-auto" />
          </div> */}
          </div>
          {/* <div className="d-block w-25">
            <div className="d-inline-flex w-100">
              <label className='fs-14 w-25 my-auto me-3'>Year</label>
            </div>
          </div> */}
          <div>{props.children}</div>
        </div>
      </div>
    );
  } else if (props.heading === "Share of listings with price cut") {
    return (
      <div className="  my-4 ">
        <div className="card">
          <div className="d-lg-inline-flex w-100">
            <div className="w-100">
              <p className="fs_25 mb-0">{props.heading}</p>
            </div>
            {/* <div className="ms-auto d-lg-inline-flex d-md-inline-flex d-sm-block">
            <p className="fs-12 my-auto greyBlack">
              Provided via the Zillow Public Records API
            </p>
            <img src="/ZilowLogo.svg" className="w-25 ms-auto" />
          </div> */}
          </div>
          {/* <div className="d-block w-25">
            <div className="d-inline-flex w-100">
              <label className='fs-14 w-25 my-auto me-3'>Year</label>
            </div>
          </div> */}
          <div>{props.children}</div>
        </div>
      </div>
    );
  } else {
    return (
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
}
