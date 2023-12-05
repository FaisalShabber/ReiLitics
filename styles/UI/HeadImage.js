import React from "react";
import classes from "./HeadImage.module.css";
import Image from "next/future/image";

const HeadImage = (props) => {
  return (
    <div className={`${classes.head}`}>
      {props.children}
      <div className={classes.layer}>
        <div className="container">
          <div
            className={`Gothic_3D py-auto`}
            style={{ fontSize: "3.5rem", color: "white", paddingTop: "4rem" }}
          >
            {props.header}
          </div>
        </div>
      </div>
      <div className="position-relative">
        <Image
          src={"/curved.png"}
          alt={"Vector"}
          layout="responsive"
          className="position-absolute bottom-0 objectCover"
          style={{ top: "-65px", width: "100%" }}
          width={100}
          height={110}
        />
        {/* <svg
          className="position-absolute bottom-0"
          style={{ top: "-100px" }}
          width="100%"
          height="200"
          viewBox="0 0 1920 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_2)">
            <path
              d="M0 0.0550028C0 0.0550028 53.374 43.585 294.279 65.42C512.014 77.855 652.554 -1.555 994.839 0.0550028C1166.62 -1.916 1456.88 49.721 1606.45 52.788C1804.43 56.847 1920 0.0550028 1920 0.0550028V110.055H0V0.0550028Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_2">
              <rect width="1920" height="110.055" fill="white" />
            </clipPath>
          </defs>
        </svg> */}
      </div>
    </div>
  );
};
export default HeadImage;
