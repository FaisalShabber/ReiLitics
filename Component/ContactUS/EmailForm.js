/* eslint-disable @next/next/no-img-element */
import React from "react";

const EmailForm = () => {
  return (
    <>
      <p className="fs-40 Gothic_3D greyBlack">Send Email</p>
      <p className="text-nowrap mb-0 fs-18" subHeading>
        You can also contact us at:
      </p>
      <div className="d-inline-flex my-5">
        <div className=" d-flex">
          <a href="mailto:hello@reilitics.com" target="_blank" rel="noreferrer">
            <img src={"email_2.svg"} alt="" className="me-4 my-auto hover" />
          </a>
        </div>
        <div>
          <p className="fs-17 mb-0 Bold greyBlack">Email</p>
          <p className="fs-19 mb-0 greyBlack">hello@reilitics.com</p>
        </div>
      </div>
      <p className=" fs-21 mb-1 Boldest greyBlack">Find us on social</p>
      <div className="d-flex linksDiv mt-0">
        <img
          className="links hover"
          style={{ width: "44px", height: "44px" }}
          src={"Facebook.svg"}
          alt=""
          onClick={() => {
            window.open("https://www.facebook.com/reilitics");
          }}
        />
        <img
          className="links hover"
          style={{ width: "44px", height: "44px" }}
          src={"/instagram_square.png"}
          alt=""
          onClick={() => {
            window.open("https://www.instagram.com/rei_litics/");
          }}
        />
        <img
          className="links hover"
          style={{ width: "44px", height: "44px" }}
          src={"Twitter.svg"}
          alt=""
          onClick={() => {
            window.open("https://twitter.com/Reilitics");
          }}
        />
        {/* <img
          className="links hover"
          style={{ width: "44px", height: "44px" }}
          src={"Instagram.svg"}
          alt=""
        />
        <img
          className="links hover"
          style={{ width: "44px", height: "44px" }}
          src={"pinterest-square.svg"}
          alt=""
        /> */}
      </div>
    </>
  );
};
export default EmailForm;
