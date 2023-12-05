/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import GetData from "../Api/GetData";
import Link from "next/link";
import Image from "next/image";
import PostData from "../Api/PostData";
import classes from "./Footer.module.css";

function Foter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [categoriesVisible] = useState(3);

  const [settingErrors, setSettingErrors] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const response = GetData.BlogCatagory();
    response.then((value) => {
      //
      if (value) {
        setData(value?.data?.categories);
      }
    });
  }, []);

  const NewsLetter = (e) => {
    e.preventDefault();
    // nextStep();
    const res = PostData.CreateNewsLetter(email, settingErrors);
    res
      .then((value) => {
        setSuccess(value.data.message);
      })
      .catch((error) => {});
  };
  return (
    <div>
      <div className="container-fluid p-0">
        <div
          className={`row position-relative ${classes["footer-background"]}`}
        >
          {/* <div
            className="position-absolute"
            style={{ top: "-20rem", padding: 0 }}
          >
            <svg
              style={{ width: "100%", objecFit: "cover" }}
              // width="1912"
              height="300"
              viewBox="0 0 1912 266"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-8 669H1912V72.8846C1912 72.8846 1757.18 -1.6523 1515.79 22.0759C1350.47 38.3173 1136.16 72.8846 941.279 72.8846C757.439 72.8846 587.865 19.0121 433.093 4.0038C183.988 -20.1517 -8 72.8846 -8 72.8846V669Z"
                fill="#F3F1ED"
              />
            </svg>
          </div> */}
          <div className="container" style={{ zIndex: "30" }}>
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <p
                  className={`${classes.fontbold} fot-mon ${classes["font-16"]} fs-16`}
                >
                  Pages
                </p>
                <Link href="/Dashboard">
                  <a className={`${classes.fontline} fs-16`}>
                    <p className="fs-16 catagory1">Dashboard</p>
                  </a>
                </Link>
                <Link href="/About">
                  <a className={` ${classes.fontline} fs-16`}>
                    <p className="fs-16 catagory1">About</p>
                  </a>
                </Link>
                <Link href="/Contact">
                  <a className={`${classes.fontline} fs-16`}>
                    <p className="fs-16 catagory1">Contact</p>
                  </a>
                </Link>
              </div>
              <div className="col-md-4 col-sm-6">
                <p className={`${classes.fontbold}  ${classes["font-16"]} fs-16`}>
                  <span className="fot-mon">General Info</span>
                </p>
                <Link href="/About">
                  <a className={`${classes.fontline} fs-16`}>
                    <p className="fs-16 catagory1">About Us</p>
                  </a>
                </Link>
                <Link href="/Terms">
                  <a className={`${classes.fontline} fs-16`}>
                    <p className="fs-16 catagory1">Terms of Use</p>
                  </a>
                </Link>
                <Link href="/Privacy">
                  <a className={`${classes.fontline} fs-16`}>
                    <p className="fs-16 catagory1">Privacy Policy</p>
                  </a>
                </Link>
                <Link href="/CokiePolicy">
                  <a className={`${classes.fontline} fs-16`}>
                    <p className="fs-16 catagory1">Cookie Policy</p>
                  </a>
                </Link>
              </div>
              <div className="col-md-4 col-sm-6 text-white">
                <p
                  className={`${classes.fontbold} fot-mon ${classes["font-16"]} fs-16 `}
                >
                  Subscribe to our newsletter
                </p>
                <form onSubmit={NewsLetter}>
                  <input
                    type="email"
                    value={email}
                    name="email"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderRadius: "24px ",
                      padding: "15px",
                      width: "100%",
                      border: 0,
                      color: "black",
                    }}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  {settingErrors}
                  <button
                    type="submit"
                    className="btn t-w-full btn-orange zoom buy-color mt-3"
                    style={{ padding: "15px", fontSize: "14px" }}
                  >
                    Subscribe
                  </button>
                  <p className="fs-19 mt-2 text-success">{success}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#000",
            height: "72px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              className="fs-15 Footer m-0"
              style={{
                color: "#F3F1ED",
              }}
            >
              © 2022 REI Litics
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                className=""
                style={{ cursor: "pointer" }}
                src={"/CircleFb.svg"}
                alt="facebook"
                onClick={() => {
                  window.open("https://www.facebook.com/reilitics");
                }}
              />
              <img
                className=""
                style={{ cursor: "pointer" }}
                src={"/instagram.png"}
                alt="facebook"
                onClick={() => {
                  window.open("https://www.instagram.com/rei_litics/");
                }}
              />
              <img
                style={{ cursor: "pointer" }}
                src={"/circleTwitter.svg"}
                alt="facebook"
                onClick={() => {
                  window.open("https://twitter.com/Reilitics");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foter;
