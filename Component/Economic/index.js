/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import EconomicGraphs from "./EconomicGraphs";
import GraphData from "../../Api/Grapgh";
import GetData from "../../Api/GetData";
import GraphComponent from "../GraphCard";
import BlurGraphComponent from "../BlurGraphComponent";
import Link from "next/link";
import { axiosInstance } from "../../pages/_app";
import PostData from "../../Api/PostData";
import { message } from "antd";
import DeleteData from "../../Api/DeleteData";

import {
  getItemFromSessionStorage,
  setItemToSessionStorage,
  removeItemFromSessionStorage,
} from "../../helpers/session-storage";
import { LoadingOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const csvFilePath = "/uurl.csv";
export default function Economic(props) {
  const selectedRegion =
    getItemFromSessionStorage("region")?.split(", ")?.[1] ?? "AL";
  const extractIsoSplit = selectedRegion?.split("-");
  const extracted =
    extractIsoSplit.length > 1 ? extractIsoSplit?.[1] : extractIsoSplit?.[0];
  let selectedState =
    getItemFromSessionStorage("state")?.split(", ")?.[0] ?? "Alabama";
  const [, /* regionName */ setRegionName] = useState(
    getItemFromSessionStorage("region")?.split(", ")?.[1]
  );
  const [updatedRegionName, setUpdatedRegionName] = useState(
    getItemFromSessionStorage("region")?.split(", ")?.[1]
  );
  const [region, setRegion] = useState("");
  const [updatedRegion, setUpdatedRegion] = useState([]);
  const [sectorState, setSectorState] = useState([]);
  const [unEmploymentData, setUnEmploymentData] = useState([]);
  const [employmentDate, setEmploymentDate] = useState([]);
  const [sector, setSector] = useState([]);
  const [sectorDate, setSectorDate] = useState([]);
  const [user, setUser] = useState("");
  const [states, setstates] = useState([]);
  const [area, setarea] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [favouriteId, setFavouriteId] = useState([]);
  const [favorite, setFavourite] = useState("");
  const [regionlst, setRegionlist] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [sltdRegion, setSlectdRegion] = useState("");
  const [zillowLink, setZillowLink] = useState();

  useEffect(() => {
    setFilteredRegions(
      regionlst.filter((item) => item.RegionName.includes(selectedState))
    );
  }, [region, regionlst]);

  const getUserProfileData = useCallback(async () => {
    setLoading(true);
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const [selectedArea, setSelectedArea] = useState(
    getItemFromSessionStorage("region")
  );
  const [gotOnce, setGotOnce] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    RegionGet();
    getStates();
    setRegion(selectedState);
    setUpdatedRegion(selectedState);
    setSectorState(selectedState);
    unEmployment(selectedArea ?? selectedState);
    industry(selectedState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  const getFavourite = () => {
    const response = GetData.Favourite();

    response.then((value) => {
      if (value) {
        const localId = getItemFromSessionStorage("region_id");
        setFavourite(value?.data?.favoriteRegions);
        setFavouriteId(value?.data?.favoriteRegions);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvFilePath);
      const text = await response.text();
      const result = Papa.parse(text, { header: true });
      const filter = result.data.find((item) => item.RegionID === (getItemFromSessionStorage("region_id") || props.id));
      setZillowLink(filter);
    };

    fetchData();

    getFavourite();
    GetRegion();
  }, [props.id, region, selectedArea]);

  const GetRegion = () => {
    const response = GetData.Region();
    response.then((value) => {
      const getSessionRegionId = getItemFromSessionStorage("region_id") || props.id;
      const filterOneRegion = value.data.Regions.find(
        (props) => props.RegionID === getSessionRegionId
      );
      setSlectdRegion(filterOneRegion.RegionName);
      setItemToSessionStorage("region", filterOneRegion.RegionName);
      setRegionlist(value.data.Regions);
    });
  };

  const DeleteFavourites = () => {
    const regionID = regionlst.filter(region => region.RegionName === selectedArea)[0].RegionID;
    const response = DeleteData.DeleteFavourite(regionID);
    response
      .then((value) => {
        if (value) {
          message.success("Removed from favourites");
          getFavourite();
        }
      })
      .catch((err) => {
        getFavourite();
      });
  };

  const AddFavourite = () => {
    const regionID = regionlst.filter(region => region.RegionName === selectedArea)[0].RegionID;
    
    const res = PostData.AddFavouriteStats(regionID, selectedArea, selectedState);
    res
      .then((value) => {
        if (value.data.success) {
          message.success("Added to favourites");
          getFavourite();
        }
      })
      .catch((err) => {
        message.info("Already added to favorite");
      });
  };

  useEffect(() => {
    const found = states?.find((item) => item.name === selectedState);
    if (found) {
      setRegion(found.name);
      setUpdatedRegion(found.name);
      setSectorState(found.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  useEffect(() => {
    const response = GraphData.populationRegion();
    response.then((value) => {
      if (value) {
        setarea(
          value.data.Data.areas.filter((item) => {
            return item.includes(extracted ?? selectedRegion);
          })
        );
        setAllAreas(value.data.Data.areas);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getItemFromSessionStorage("region")) {
      const found = area.find((item) =>
        item.includes(getItemFromSessionStorage("region").split(",")[0])
      );
      if (found) {
        setSelectedArea(found);
        unEmployment(found);
        // industry(found);
      }
      setGotOnce(true);
    }
  }, [area]);

  async function getStates() {
    const response = await axiosInstance.get(`/states/US`);
    if (response.data.success) {
      const currentRegion = getItemFromSessionStorage("region").split(",")[1];
      let found;
      found = response.data.state.find((props) =>
        currentRegion.includes(props.isoCode)
      );
      selectedState = found.name;
      setItemToSessionStorage("state", found.name);
      setstates(response.data.state);
    }
  }

  const RegionGet = () => {
    const response = GraphData.populationEconomic();
    response.then((value) => {
      if (value) {
        setRegionName(value.data.Data);
        setUpdatedRegionName(value.data.Data);
      }
    });
  };

  const fetchDataa = async (id) => {
    const response = await fetch(csvFilePath);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });
    const filter = result.data.find((item) => item.RegionID === id);
    setZillowLink(filter);
  };

  async function handleChange(e) {
    setRegion(e.target.value);
    setUpdatedRegion(e.target.value);
    setSectorState(e.target.value);
    unEmployment(e.target.value);
    industry(e.target.value);

    const findState = states.find((item) => item.name === e.target.value);
    if (findState) {
      // removeItemFromSessionStorage("region");
      if (e.target.value !== "0") {
        setarea(allAreas.filter((item) => item.includes(findState.isoCode)));
        const regionID = regionlst.filter(region => region.RegionName === allAreas.filter((item) => item.includes(findState.isoCode))[0])[0].RegionID;
        fetchDataa(regionID);
      }
      setItemToSessionStorage("state", findState.name);
      setItemToSessionStorage(
        "region",
        allAreas.filter((item) => item.includes(findState.isoCode))[0]
      );
      const regionId = regionlst.filter(region => region.RegionName === allAreas.filter((item) => item.includes(findState.isoCode))[0])[0].RegionID;
      setItemToSessionStorage("region_id", regionId);
    }
  }

  async function handleAreaChange(e) {
    const regionId = regionlst.filter(region => region.RegionName === e.target.value)[0].RegionID;

    fetchDataa(regionId);

    setItemToSessionStorage("region", e.target.value);
    setItemToSessionStorage("region_id", regionId);
    setSelectedArea(e.target.value);
    unEmployment(e.target.value);
    // industry(e.target.value);
  }
  const unEmployment = (region) => {
    const response = GraphData.unEmployment(region);
    response.then((value) => {
      if (value) {
        let data1 = [];
        let data2 = [];
        for (const key in value.data.Data) {
          data1.push(key);
          data2.push(value.data.Data[key]);
        }
        setEmploymentDate(data1);
        setUnEmploymentData(data2);
      }
    });
  };
  const industry = (region) => {
    const response = GraphData.industary(region);
    response.then((value) => {
      if (value) {
        let data1 = [];
        let data2 = [];
        for (const key in value.data.Data) {
          data1.push(key);
          data2.push(value.data.Data[key].replace(",", "").replace(",", ""));
        }
        setSectorDate(data1);
        setSector(data2);
      }
    });
    setSectorState(region);
  };
  const print = () => {
    var content = document.getElementsByClassName("Economic_pg");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write('<img style="width:100px" src="/logo-black.png" >');

    pri.document.write(content[0].innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, display: "block" }} spin />
  );

  return (
    <div>
      {loading ? (
        <>{antIcon}</>
      ) : (
        <>
          {(packageName === "Free" ||
            packageName === "" ||
            packageName === undefined) && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <button
                style={{
                  borderRadius: "20px",
                  padding: "0.5rem 2.5rem",
                }}
                className="no_brdr fs-15 btnYelow"
                onClick={() => {
                  window.location.href = `/#Prices`;
                }}
              >
                Unlock
              </button>
            </div>
          )}
          <div
            style={
              packageName === "Free" ||
              packageName === "" ||
              packageName === undefined
                ? { filter: "blur(8px)" }
                : {}
            }
          >
            <p className="my-3 fs-40 Gothic_3D">{region}</p>
            <div className="my-3 d-flex w-100">
              <div className="my-auto row w-100">
                <div className="d-block col-6">
                  <label className="orangetxt fs-13">Select State</label>
                  <select
                    className="form-control form-select form-control-sm"
                    onChange={handleChange}
                    value={region}
                  >
                    {/* <option value="0">--select state--</option> */}
                    {states
                      ? states.map((state) => {
                          return (
                            <option key={state.name} value={state.name}>
                              {state.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div className="d-block col-6">
                  <label className="orangetxt fs-13">Select Region</label>
                  <select
                    className="form-control form-select form-control-sm"
                    onChange={handleAreaChange}
                    value={selectedArea}
                  >
                    {area?.map((city, i) => {
                      return (
                        <option key={i} value={city}>
                          {city}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div
              className="my-auto ms-auto"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{ border: "2px solid #ef6921" }}
                onClick={() => window.open(zillowLink?.ZillowLink)}
                className="px-4 m-1 btn fs-14"
              >
                Search properties on Zillow{" "}
              </button>
              {user.packageID == "shuihshsu" ? (
                <>
                  <button className="px-4 m-1 btn greyBtn fs-14" disabled>
                    Add to Favourite{" "}
                    <img src="/unfilledHeart1.svg" className="my-auto ms-2" />
                  </button>
                  <button className="px-4 m-1 btn greyBtn fs-14" disabled>
                    Print and Download
                    <img src={"/print.svg"} className="my-auto ms-2" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    style={{ border: "2px solid #ef6921" }}
                    className="btn px-4 fs-14 m-1"
                    onClick={
                      favouriteId.filter((fvrt) => fvrt.regionName === selectedArea)
                        .length > 0
                        ? DeleteFavourites
                        : AddFavourite
                    }
                  >
                    {favouriteId.filter((fvrt) => fvrt.regionName === selectedArea)
                      .length > 0
                      ? "Remove from Favourite"
                      : "Add to Favourite"}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        favouriteId.filter((fvrt) => fvrt.regionName === selectedArea)
                          .length > 0
                          ? "/filledHeartRed.svg"
                          : "/unfilledHeart1.svg"
                      }
                      className="ms-2 my-auto"
                      alt="heart"
                    />
                  </button>
                  <button
                    style={{ border: "2px solid #ef6921" }}
                    className="px-4 m-1 btn fs-14"
                    onClick={print}
                  >
                    Print and Download
                    <img src={"/print.svg"} className="my-auto ms-2" />
                  </button>
                </>
              )}
            </div>
            <div className="Economic_pg">
              <div className="">
                {user.packageID == "shuihshsu" ? (
                  <GraphComponent>
                    <div className="container_">
                      <div className="graph">
                        <BlurGraphComponent />
                      </div>
                      <Link href={`/`} passHref>
                        <button className="px-5 btn btn-success cetered_ btnYelow">
                          Unlock
                        </button>
                      </Link>
                    </div>
                  </GraphComponent>
                ) : (
                  <EconomicGraphs
                    employmentDate={employmentDate}
                    unEmploymentData={unEmploymentData}
                    sector={sector}
                    sectorDate={sectorDate}
                    onChange={industry}
                    regionName={updatedRegionName}
                    region={updatedRegion}
                    sectorState={sectorState}
                    selectedState={selectedState}
                    states={states}
                    packageName={packageName}
                  />
                )}
              </div>
              <footer className="text-center text-black mt-5 fs-11">
                <p>
                  DISCLAIMER - Data is provided “as is” via{" "}
                  <a
                    href="https://www.bls.gov/"
                    className="text-black"
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    www.bls.gov.
                  </a>
                </p>
                {/* <p>© Zillow, Inc. 2006-2020. Use is subject to Term of Use.</p> */}
              </footer>
              <iframe
                id="ifmcontentstoprint"
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  display: "none",
                }}
              ></iframe>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
