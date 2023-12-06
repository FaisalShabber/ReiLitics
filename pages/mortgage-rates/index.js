import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Script from "next/script";
import { axiosInstance } from "../_app";
import { Vortex } from "react-loader-spinner";
import NewNavbar from "../../Component/new.Navbar";
import NewSidebar from "../../Component/new.sidebar";
import Chart from "../../Component/Mortgage-rate/chart";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import GetData from "../../Api/GetData";

const MortgageRates = () => {
  const [data, setData] = useState([]);
  const [fifteenYearData, setFifteenYearData] = useState([]);
  const [isLoading, setIsLoading] = useState("idle");
  const [packageName, setPackageName] = useState("");

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const getUserProfileData = useCallback(async () => {
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const fetchData = async () => {
    setIsLoading("loading");
    await axiosInstance
      .post("/users/get_mortage_data", {
        series_id: "MORTGAGE30US",
        offset: 0,
        limit: 270,
        sort_order: "desc",
      })
      .then((resp) => {
        setData(
          resp.data.data.observations.sort((a, b) =>
            a.date.localeCompare(b.date)
          )
        );
      });
    await axiosInstance
      .post("/users/get_mortage_data", {
        series_id: "MORTGAGE15US",
        offset: 0,
        limit: 270,
        sort_order: "desc",
      })
      .then((resp) => {
        setFifteenYearData(
          resp.data.data.observations.sort((a, b) =>
            a.date.localeCompare(b.date)
          )
        );
      });
    setIsLoading("loaded");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Mortgage Rates - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
          <div className="container mx-auto mt-3 px-md-5 Table">
            <p className="fs-40 Gothic_3D fot-mon">Mortgage Rates</p>
          </div>
          {isLoading === "loaded" ? (
            <div className="container mx-auto mt-3 px-md-5 Table pb-3">
              <div
                style={{
                  padding: "24px",
                  background: "white",
                  borderRadius: "24px",
                  width: "100%",
                  maxWidth: "800px",
                }}
              >
                <h2>
                  30-Year and 15-Year Fixed Rate Mortgage Average in the United
                  States
                </h2>

                <div
                  style={{ height: "400px", width: "100%", maxWidth: "800px" }}
                >
                  <Chart data={data} fifteenYearData={fifteenYearData} packageName={packageName} />
                </div>
              </div>
            </div>
          ) : isLoading === "loading" ? (
            <div className="t-w-full lg:t-h-[544px] t-flex t-items-center t-justify-center">
              <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={["red", "green", "blue", "yellow", "orange", "purple"]}
              />
            </div>
          ) : null}
          <div className="container mx-auto mt-3 px-md-5 t-text-base t-w-full t-max-w-[800px]">
            <div>
              Data is provided "as is" Copyright, 2016, Freddie Mac. Reprinted
              with permission.
            </div>
            <div>
              Freddie Mac, 30-Year Fixed Rate Mortgage Average in the United
              States [MORTGAGE30US], retrieved from FRED, Federal Reserve Bank
              of St. Louis; https://fred.stlouisfed.org/series/MORTGAGE30US,
              September 7, 2022.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MortgageRates;
