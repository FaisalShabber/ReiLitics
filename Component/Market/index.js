import { React, useEffect, useState, useCallback } from "react";
import {
  getItemFromSessionStorage,
  removeItemFromSessionStorage,
  setItemToSessionStorage,
} from "../../helpers/session-storage";

import ApreciationTableComponent from "../ApreciationTableComponent";
import GetData from "../../Api/GetData";
import GraphData from "../../Api/Grapgh";
import MedianGraph from "./MarketPageGraph";
import PostData from "../../Api/PostData";
import RentalTableComponent from "../RentalTableComponent";
import { axiosInstance } from "../../pages/_app";
import { message } from "antd";
import DeleteData from "../../Api/DeleteData";
import Papa from "papaparse";

const csvFilePath = "/uurl.csv";
export default function Market(props) {
  const selectedSessionState = getItemFromSessionStorage("state");
  const selectedSessionRegion = getItemFromSessionStorage("region");
  const [rental, setRental] = useState([]);
  const [Apprecation, setApprecation] = useState([]);
  const [regionlst, setRegionlist] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [sltdRegion, setSlectdRegion] = useState("");
  const [year, setYear] = useState("");
  const [region, setRegion] = useState("");
  const [id, setId] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [favorite, setFavourite] = useState("");
  const [favouriteId, setFavouriteId] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [zillowLink, setZillowLink] = useState();
  const [packageName, setPackageName] = useState("");
  const [loadingGraph, setLoadingGraph] = useState(false);

  useEffect(() => {
    // Path to your CSV file in the public folder

    // Fetch and parse the CSV file
    const fetchData = async () => {
      const response = await fetch(csvFilePath);
      const text = await response.text();
      const result = Papa.parse(text, { header: true });
      const filter = result.data.find((item) => item.RegionID === (getItemFromSessionStorage("region_id") || props.id));
      setZillowLink(filter);
      setCsvData(result.data);
    };

    fetchData();
  }, [props.id]);

  const getUserProfileData = useCallback(async () => {
    setLoadingGraph(true);
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
    setLoadingGraph(false);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

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
    setSlectdRegion(getItemFromSessionStorage("region_id") ?? props.id);
    GetRegion();
    getStates();
    regionUpdate(getItemFromSessionStorage("region_id") ?? props.id);
    getFavourite();
  }, [props.id]);

  useEffect(() => {
    if (selectedSessionState) {
      const found = states.find((item) => item.name === selectedSessionState);
      setSelectedState(found?.isoCode ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  useEffect(() => {
    setFilteredRegions(
      regionlst.filter((item) => item.RegionName.includes(selectedState))
    );
  }, [selectedState, regionlst]);

  useEffect(() => {
    const region = regionlst.find((item) => {
      if (getItemFromSessionStorage("region_id")) {
        return item.RegionID === getItemFromSessionStorage("region_id");
      } else if (selectedSessionRegion) {
        const regionSplitByComma = selectedSessionRegion.split(", ")[0];
        const splitByDash = regionSplitByComma.split("-")[0];
        return item.RegionName.includes(splitByDash ?? regionSplitByComma);
      }
      return item.RegionID === props.id;
    });

    if (region) {
      setSlectdRegion(region.RegionID);
      const regionName = region.RegionName.split(", ");
      const selected = states.find((item) => {
        if (selectedSessionState) {
          return item.name === selectedSessionState;
        }
        return item.isoCode === regionName[regionName.length - 1];
      });
      setSelectedState(selected?.isoCode ?? "AL");
    }
  }, [
    states,
    regionlst,
    props.id,
    selectedSessionState,
    selectedSessionRegion,
  ]);

  function handleChangee(e) {
    setYear(e.target.value);
  }

  async function getStates() {
    const response = await axiosInstance.get(`/states/US`);
    if (response.data.success) {
      const currentRegionInSession = getItemFromSessionStorage("region")?.split(
        ", "
      )[1];
      const filterSessionState = response.data.state.find(
        (props) => props.isoCode === currentRegionInSession
      );
      setSelectedState(filterSessionState?.name);
      setItemToSessionStorage("state", filterSessionState?.name);
      setStates(response.data.state);
    }
  }

  const regionUpdate = (id) => {
    const response = GraphData.RentalAprecation(id);
    response.then((value) => {
      setId(value?.data?.Data?.appreciation?.regionID);
      setRegion(value?.data?.Data?.appreciation?.region);
      const data = [];
      data.push(value?.data?.Data?.appreciation);
      setApprecation(data);
      const data1 = [];
      data1.push(value?.data?.Data?.rental);
      setRental(data1);
    });
  };
  const AddFavourite = () => {
    const res = PostData.AddFavouriteStats(id, region, selectedState);
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

  // Fetch and parse the CSV file
  const fetchDataa = async (id) => {
    const response = await fetch(csvFilePath);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });
    const filter = result.data.find((item) => item.RegionID === id);
    setZillowLink(filter);
  };

  const filterRegions = (e) => {
    const { value } = e.target;
    const findState = states.find((item) => item.isoCode === value);
    setItemToSessionStorage("state", findState?.name);
    const filteredRegions = regionlst.filter(
      (props) => props.RegionName.split(", ")[1] === findState?.isoCode
    );
    fetchDataa(filteredRegions[0].RegionID);
    if (filterRegions) {
      setItemToSessionStorage("region", filteredRegions[0].RegionName);
      setItemToSessionStorage("region_id", filteredRegions[0].RegionID);
      regionUpdate(filteredRegions[0].RegionID);
      setSlectdRegion(filteredRegions[0].RegionID);
    } else {
      removeItemFromSessionStorage("region");
    }
    setSelectedState(value);
  };

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

  function handleChange(e) {
    setItemToSessionStorage("region_id", e.target.value);
    fetchDataa(e.target.value);
    setSlectdRegion(e.target.value);
    regionUpdate(e.target.value);
  }

  function handleBlur(e) {
    const { value } = e.target;
    if (value) {
      const filter = filteredRegions.find((item) => item.RegionID === value);
      setItemToSessionStorage("region", filter?.RegionName);
      setItemToSessionStorage("region_id", value);
    }
  }

  const print = () => {
    const content = document.getElementsByClassName("Market_pg");
    const pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write('<img style="width:100px" src="/logo-black.png" >');
    pri.document.write(content[0].innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const DeleteFavourites = () => {
    const response = DeleteData.DeleteFavourite(id);
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

  return (
    <div>
      <div className="my-3">
        <div className="row w-100 my-auto">
          <div className="d-block col-12">
            <label className="orangetxt fs-13">Select State</label>
            <select
              className="form-control form-select w-100 form-control-sm"
              onChange={filterRegions}
              value={selectedState}
              style={{
                width: "100%",
                maxWidth: "200px",
              }}
            >
              {states.map((each) => (
                <option value={each.isoCode} key={each.isoCode}>
                  {each.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-block col-12">
            <label className="orangetxt fs-13">Select Region</label>
            <select
              className="form-control form-select w-100 form-control-sm"
              onChange={handleChange}
              value={sltdRegion}
              onBlur={handleBlur}
              style={{
                width: "100%",
                maxWidth: "200px",
              }}
            >
              {filteredRegions.map((each) => (
                <option value={each.RegionID} key={each.RegionID}>
                  {each.RegionName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className="ms-auto my-3"
          style={{ display: "flex", justifyContent: "end", flexWrap: "wrap" }}
        >
          <button
            style={{ border: "2px solid #ef6921" }}
            onClick={() => window.open(zillowLink?.ZillowLink)}
            className="btn px-4 fs-14 m-1"
          >
            Search properties on Zillow{" "}
          </button>
          <button
            style={{ border: "2px solid #ef6921" }}
            className="btn px-4 fs-14 m-1"
            onClick={
              favouriteId.filter((fvrt) => fvrt.regionName === region).length >
              0
                ? DeleteFavourites
                : AddFavourite
            }
          >
            {favouriteId.filter((fvrt) => fvrt.regionName === region).length > 0
              ? "Remove from Favourite"
              : "Add to Favourite"}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                favouriteId.filter((fvrt) => fvrt.regionName === region)
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
            className="btn px-4 fs-14 m-1"
            onClick={print}
            disabled={
              packageName === "Free" ||
              packageName === "" ||
              packageName === undefined
            }
          >
            Print and Download
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={"/print.svg"} className="ms-2 my-auto" alt="heart" />
          </button>
        </div>
      </div>
      <div className="Market_pg">
        <div className="w-100">
          <div
            className="paginetion_none bg_table col-12"
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "24px",
            }}
          >
            {Apprecation ? (
              <ApreciationTableComponent AppreciationData={Apprecation} />
            ) : (
              <p>Loading</p>
            )}
          </div>
          <div
            className="paginetion_none bg_table col-12"
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "24px",
              marginTop: "14px",
            }}
          >
            <RentalTableComponent rental={rental} />
          </div>
        </div>
        <div className="row w-100 my-auto">
          <div className="d-block col-12">
            <label className="orangetxt fs-13">Select Year</label>
            <select
              className="form-control form-select form-control-sm"
              name="year"
              onChange={handleChangee}
              value={year}
              style={{
                width: "100%",
                maxWidth: "200px",
              }}
            >
              <option value="">All</option>
              <option value="18">2018</option>
              <option value="19">2019</option>
              <option value="20">2020</option>
              <option value="21">2021</option>
              <option value="22">2022</option>
              <option value="23">2023</option>
            </select>
          </div>
        </div>

        <div className="">
          <MedianGraph
            id={sltdRegion}
            year={year}
            loadingGraph={loadingGraph}
          />
        </div>
        <iframe
          id="ifmcontentstoprint"
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            display: "none",
          }}
        ></iframe>
        <footer className="text-center text-black mt-5 fs-11">
          <p>
            DISCLAIMER - Data is provided “as is” via{" "}
            <a
              href={zillowLink?.ZillowLink}
              className="text-black"
              target="_blank"
              style={{
                textDecoration: "underline",
              }}
            >
              Zillow Housing Data
            </a>
            .
          </p>
          {/* <p>© Zillow, Inc. 2006-2020. Use is subject to Term of Use.</p> */}
        </footer>
      </div>
    </div>
  );
}
