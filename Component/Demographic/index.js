/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from "react";
import {
  getItemFromSessionStorage,
  setItemToSessionStorage,
} from "../../helpers/session-storage";
import BlurGraphComponent from "../BlurGraphComponent";
import EduAttainment from "./EduAttainment";
import GraphComponent from "../GraphCard";
import GraphData from "../../Api/Grapgh";
import HouseholdTypes from "./HouseholdTypes";
import IncomeHHByType from "./IncomeHHByType";
import IncomeHHT from "./IncomeHHT";
import Link from "next/link";
import Population from "./Population";
import PopulationByAge from "./PopulationByAge";
import PopulationbyRace from "./PopulationbyRace";
import { axiosInstance } from "../../pages/_app";
import { convertToCurrency } from "../../helpers/convert-to-currency";
import GetData from "../../Api/GetData";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import DeleteData from "../../Api/DeleteData";
import PostData from "../../Api/PostData";
import { message } from "antd";

const csvFilePath = "/uurl.csv";
export default function Demographic(props) {
  const selectedRegion =
    getItemFromSessionStorage("region")?.split(", ")?.[1] ?? "AL";
  let selectedState =
    getItemFromSessionStorage("state")?.split(", ")?.[0] ?? "Alabama";
  const extractIsoSplit = selectedRegion?.split("-");
  const extracted =
    extractIsoSplit.length > 1 ? extractIsoSplit?.[1] : extractIsoSplit?.[0];
  const [allRegionName, setAllRegionName] = useState([]);
  const [regionName, setRegionName] = useState([]);
  const [region, setRegion] = useState(selectedState);
  const [population, setPopulation] = useState([]);
  const [populationDate, setPopulationDate] = useState([]);
  const [otherData, setOtherData] = useState({});
  // const [race, setRace] = useState([])
  // const [raceDate, setRaceDate] = useState([])
  const [educationn, setEducationn] = useState([]);
  const [male, setMale] = useState([]);
  const [feMale, setFeMale] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [eduTableData, seteduTableData] = useState([]);
  const [grade, setGrade] = useState([]);
  const [dataPercentage, setDataPercentage] = useState([]);
  const [maleCount, setMaleCount] = useState([]);
  const [feMaleCount, setFeMaleCount] = useState([]);
  const [age, setAge] = useState([]);
  const [lowest, setlowest] = useState([]);
  const [highest, sethighest] = useState([]);
  const [Owner, setOwner] = useState([]);
  const [renter, setRenter] = useState([]);
  const [oTable, setOTable] = useState([]);
  const [type, setType] = useState([]);
  const [totalMedian, setTotalMedian] = useState([]);
  const [totalSexRaitio, setTotalSexRaitio] = useState([]);
  const [maleMedian, setMaleMedian] = useState([]);
  const [femaleMedian, setFemaleMedian] = useState([]);
  const [AgeDepend, setAgeDepend] = useState([]);
  const [OldAgeDepend, setOldAgeDepend] = useState([]);
  const [ChildAgeDepend, setChildAgeDepend] = useState([]);
  const [FemaleRatioVal, setFemaleRatioVal] = useState([]);
  const [sexMaleRatio, setMaleSexRatio] = useState([]);
  const [sexFemaleRatio, setFemleSexRatio] = useState([]);
  const [sexMaleRatioTotal, setMaleSexRatioTotal] = useState([]);
  const [sexFemaleRatioTotal, setFemleSexRatioTotal] = useState([]);
  const [MaleRatioVal, setMaleRatioVal] = useState([]);
  const [tltAdlt, settltAdlt] = useState([]);
  const [Senior, setSenior] = useState();
  const [totalFullArray, setTotalFullArray] = useState([]);
  const [houseHolds, setHouseHolds] = useState([]);
  const [Married, setMarried] = useState([]);
  const [nonFamlies, setNonFamlies] = useState([]);
  const [marriedFamilies, setMarriedFamilies] = useState([]);
  const [income, setIncome] = useState([]);
  const [Table, setTable] = useState([]);
  const [AvgHouseHold, setAvgHouseHold] = useState([]);
  const [label, setLabel] = useState([]);
  const [mean, setMean] = useState([]);
  const [median, setMedian] = useState([]);
  const [medianTable, setMedianTable] = useState([]);
  const [name, setName] = useState([]);
  const [raceTable, setRaceTable] = useState([]);
  const [states, setStates] = useState([]);
  const [avgSize, setAvgSize] = useState({});
  const [race, setRace] = useState([
    "White",
    "Black or African American",
    "Some Other Race",
    "Asian",
    "Two or more races",
    "American Indian and Alaska Native",
    "Native Hawaiian and Other Pacific Islander",
  ]);
  const [percent, setPercent] = useState([13, 17, 23, 23, 4, 9, 11]);
  const [user, setUser] = useState("");
  const [selectedArea, setSelectedArea] = useState(
    getItemFromSessionStorage("region")
  );
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
       getItemFromSessionStorage("region")
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

  const fetchDataa = async (id) => {
    const response = await fetch(csvFilePath);
    const text = await response.text();
    const result = Papa.parse(text, { header: true });
    const filter = result.data.find((item) => item.RegionID === id);
    setZillowLink(filter);
  };

  const getUserProfileData = useCallback(async () => {
    setLoading(true);
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const router = useRouter();

  const eventId = router.query.id;

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    Region();
    // GetRegion();
    setRegion(selectedState ?? "Alabama");
    populationCountary(selectedArea ?? "Alabama");
    // populationRace(e.target.value)
    education(selectedArea ?? "Alabama");
    populationAge(selectedArea ?? "Alabama");
    RenterTable(selectedArea ?? "Alabama");
    HouseIncome(selectedArea ?? "Alabama");
    HouseType(selectedArea ?? "Alabama");
    populationRace(selectedArea ?? "Alabama");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, selectedArea, selectedState]);

  useEffect(() => {
    const response = GraphData.populationRegion();
    response.then((value) => {
      if (value) {
        setRegionName(
          value.data.Data.areas.filter((item) => {
            return item.includes(extracted ?? selectedRegion);
          })
        );
        setAllRegionName(value.data.Data.areas);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  useEffect(() => {
    if (getItemFromSessionStorage("region")) {
      const found = regionName.find((item) =>
        item?.RegionName?.includes(
          getItemFromSessionStorage("region").split(", ")[0]
        )
      );
      if (found) {
        setSelectedArea(found.RegionName);
      }
    }
  }, [regionName]);

  function handleChange(e) {
    const { value } = e.target;
    const { dataset } = e.currentTarget;
    if (dataset?.id === "country") {
      const selected = states.find((item) => item.name === value);
      setItemToSessionStorage("state", value);
      const filterRegions = allRegionName.filter((item) =>
        item.includes(selected?.isoCode)
      );
      setRegionName(filterRegions);
      setRegion(value);
      setItemToSessionStorage("region", filterRegions[0]);
      const regionId = regionlst.filter(region => region.RegionName === filterRegions[0])[0].RegionID;
      setItemToSessionStorage("region_id", regionId);
      setSelectedArea(filterRegions[0]);
      const regionID = regionlst.filter(region => region.RegionName === filterRegions[0])[0].RegionID;
        fetchDataa(regionID);
    } else {
      const regionId = regionlst.filter(region => region.RegionName === e.target.value)[0].RegionID;
      fetchDataa(regionId);
      setItemToSessionStorage("region", value);
      setItemToSessionStorage("region_id", regionId);
      setSelectedArea(value);
    }
    // populationCountary(value);
    // education(value);
    // populationAge(value);
    // RenterTable(value);
    // HouseIncome(value);
    // HouseType(value);
    // populationRace(value);
  }

  const Region = async () => {
    const response = await axiosInstance.get(`/states/US`);
    if (response.data.success) {
      setStates(response.data.state);
      setRegion(selectedState);
    }
  };

  const populationCountary = (region) => {
    const response = GraphData.population(region);
    response.then((value) => {
      if (value) {
        let data1 = [];
        let data2 = [];
        for (const key in value.data.Data) {
          data1.push(key.replace(",", ""));
          data2.push(
            parseInt(value.data.Data[key].replace(",", "").replace(",", ""))
          );
        }
        setOtherData(value?.data?.otherData);
        setPopulationDate(data1);
        setPopulation(data2);
      }
    });
  };

  const education = (region) => {
    const response = GraphData.education(region);
    response.then((value) => {
      if (value) {
        setEducationn(value.data.Data[0]);

        let region = [];
        let percentage = [];
        let male = [];
        let feMale = [];
        let eduTable = [];
        for (const key in value.data.Data[0]) {
          if (key !== "Region") {
            region.push(key);
            let data = {
              key: Math.random(),
              name: key,
              count: convertToCurrency(value.data.Data[0][key]),
              percentage: value.data.Data[3][key] + "%",
            };
            eduTable.push(data);
          }
        }
        for (const key in value.data.Data[1]) {
          if (key !== "Region") {
            percentage.push(parseInt(value.data.Data[3][key].replace("%", "")));
          }
        }
        for (const key in value.data.Data[2]) {
          if (key !== "Region") {
            male.push(
              value.data.Data[1][key].replace(",", "").replace(",", "")
            );
          }
        }
        for (const key in value.data.Data[3]) {
          if (key !== "Region") {
            feMale.push(
              value.data.Data[2][key].replace(",", "").replace(",", "")
            );
          }
        }
        setMale(male);
        setFeMale(feMale);
        setPercentage(percentage);
        seteduTableData(eduTable);
        setGrade(region);
      }
      // setEducationDate(data1)
      // setEducationn(data2)
    });
  };

  const populationAge = (region) => {
    const response = GraphData.populationAge(region);
    response.then((value) => {
      if (value) {
        let maleCount = [];
        let feMale = [];
        let Age = [];
        let lowest = 0;
        let greater = 0;

        setTotalFullArray(value.data.Data[0]);
        value.data.Data.map((x) => {
          if (x.Region.includes("Total")) {
            setTotalMedian(x.Medianage);
            setTotalSexRaitio(x.Total);
            setOldAgeDepend(x.OldAgedependencyratio);
            setChildAgeDepend(x.Childdependencyratio);
            setAgeDepend(x.Agedependencyratio);
            settltAdlt(x.Adults);
          } else if (
            x.Region.includes("Male") &&
            !x.Region.includes("Percent")
          ) {
            setMaleMedian(x.Medianage);
            setMaleSexRatioTotal(x.Total);
            setMaleSexRatio(x.Sexratio);
          } else if (
            x.Region.includes("Female") &&
            !x.Region.includes("Percent")
          ) {
            setFemaleMedian(x.Medianage);
            setFemleSexRatioTotal(x.Total);
            setFemleSexRatio(x.Sexratio);
          }
        });

        for (const key in value.data.Data[0]) {
          if (key !== "Region") {
            Age.push(key);
          }
        }
        for (const key in value.data.Data[1]) {
          if (key !== "Region") {
            let num = value.data.Data[1][key]
              ? parseInt(value.data.Data[1][key].replace(",", ""))
              : 0;
            maleCount.push(num);
          }
        }
        for (const key in value.data.Data[3]) {
          if (key !== "Region") {
            let x = parseInt(
              value.data.Data[3][key]
                ? value.data.Data[3][key].replace(",", "")
                : 0
            );
            let y = x * 2;
            let z = x - y;
            feMale.push(z);
          }
        }
        let botharray = maleCount.concat(feMale);
        setlowest(Math.min(...botharray) * 1.01);
        sethighest(Math.max(...botharray) * 1.01);
        setFeMaleCount(feMale.reverse());
        setMaleCount(maleCount.reverse());
        setAge(Age.reverse());
      }

      // setEducationDate(data1)
      // setEducationn(data2)
    });
  };

  const RenterTable = (region) => {
    const response = GraphData.Renter(region);
    let Owner = [];
    let Renter = [];
    let Regionn = [];
    let OwnTables = [];
    response.then((value) => {
      if (value) {
        const newArray = value.data.Data.filter((item) => {
          return item;
        });
        for (let array in newArray) {
          const tableData = {
            key: Math.random(),
            type: newArray[array].Region,
            owner: newArray[array].Owner,
            renter: newArray[array].Renter,
          };
          OwnTables.push(tableData);
          Owner.push(newArray[array].Owner);
          Renter.push(newArray[array].Renter);
          Regionn.push(newArray[array].Region);
        }
        setOwner(Owner);
        setRenter(Renter);
        setOTable(OwnTables);
        setType(Regionn);
      }
    });
  };

  const HouseIncome = (region) => {
    const response = GraphData.incomeHouse(region);
    response.then((value) => {
      if (value) {
        let houseHolde = [];
        let famlies = [];
        let Married = [];
        let NonFamlies = [];
        let income = [];
        let OwnTables = [];
        let mean = [];
        let median = [];
        let name = [];
        const newArray = value.data.Data.filter((item) => {
          return item;
        });
        for (let array in newArray) {
          const tableData = {
            key: Math.random(),
            mean: newArray[array].Mean,
            median: newArray[array].Median,
            name: newArray[array].Region,
          };
          mean.push(newArray[array].Mean);
          median.push(newArray[array].Median);
          OwnTables.push(tableData);
          name.push(newArray[array].Region);
        }

        setMean(mean);

        setMedian(median);

        setMedianTable(OwnTables);
        setName(name);
        for (const key in value.data.Data[0]) {
          if (
            key !== "Region" &&
            key !== "Total" &&
            key !== "Mean income" &&
            key !== "Median income"
          ) {
            income.push(key);
          }
        }
        for (const key in value.data.Data[0]) {
          if (
            key !== "Region" &&
            key !== "Total" &&
            key !== "Mean income" &&
            key !== "Median income"
          ) {
            houseHolde.push(
              value.data.Data[0][key].replace(",", "").replace(",", "")
            );
          }
        }
        for (const key in value.data.Data[1]) {
          if (
            key !== "Region" &&
            key !== "Total" &&
            key !== "Mean income" &&
            key !== "Median income"
          ) {
            famlies.push(
              value.data.Data[1][key].replace(",", "").replace(",", "")
            );
          }
        }
        for (const key in value.data.Data[2]) {
          if (
            key !== "Region" &&
            key !== "Total" &&
            key !== "Mean income" &&
            key !== "Median income"
          ) {
            Married.push(
              value.data.Data[2][key].replace(",", "").replace(",", "")
            );
          }
        }
        for (const key in value.data.Data[3]) {
          if (
            key !== "Region" &&
            key !== "Total" &&
            key !== "Mean income" &&
            key !== "Median income"
          ) {
            NonFamlies.push(
              value.data.Data[3][key].replace(",", "").replace(",", "")
            );
          }
        }
        setHouseHolds(houseHolde);
        setIncome(income);
        setMarried(Married);
        setMarriedFamilies(famlies);
        setNonFamlies(NonFamlies);
      }
    });
  };

  const HouseType = (region) => {
    const response = GraphData.HouseType(region);
    response.then((value) => {
      if (value) {
        let OwnTables = [];
        let AvgHouseHold = [];
        let label = [];
        const newArray = value.data.Data.filter((item) => {
          return item;
        });

        setAvgSize(newArray[0]);

        // if (num > 999 && num < 1000000) {
        //   return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
        // } else if (num > 1000000) {
        //   return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
        // } else if (num < 900) {
        //   return num; // if value < 1000, nothing to do
        // }
        for (let array in newArray) {
          const totalCount = newArray[array].TotalHouseholds;
          const tableData = {
            key: Math.random(),
            type: newArray[array].Region,
            count:
              totalCount > 999 && totalCount < 1000000
                ? (totalCount / 1000).toFixed(1) + "K"
                : totalCount > 1000000
                ? (totalCount / 1000000).toFixed(1) + "M"
                : totalCount < 900
                ? totalCount
                : "",
            avgSize: newArray[array].AverageHouseholdSize,
            owned: newArray[array].Owned,
          };
          OwnTables.push(tableData);
          AvgHouseHold.push(parseInt(newArray[array].AverageHouseholdSize));
          label.push(newArray[array].Region);
        }
        setTable(OwnTables);
        setLabel(label);
        setAvgHouseHold(AvgHouseHold);
      }
    });
  };

  const populationRace = (region) => {
    const response = GraphData.populationRace(region);
    response.then((value) => {
      let raceTable = [];
      let race = [];
      let percent = [];
      if (value) {
        for (let key in value.data.Data) {
          if (key !== "Total" && !key.includes("Percentage")) {
            let obj = {
              key: Math.random(),
              race: key,
              population: convertToCurrency(value.data.Data[key]),
              percentage: value.data.Data[key + " Percentage"],
            };

            raceTable.push(obj);
            race.push(key);
            percent.push(parseInt(value.data.Data[key + " Percentage"]));
          }
        }
        setRaceTable(raceTable);
        setPercent(percent);
        setRace(race);
      }
    });
  };

  const print = () => {
    var content = document.getElementsByClassName("Demo_pg");
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
          {(packageName === "Free" || packageName === '' || packageName === undefined) && (
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
          <div style={(packageName === "Free" || packageName === '' || packageName === undefined) ? { filter: "blur(6px)" } : {}}>
            <div className="d-flex w-100">
              <div className="ms-0">
                <p className="fs-40 Gothic_3D my-3">{region}</p>
              </div>
              {/* <div className="mt-auto ms-auto">
          <p className="fs-13 ms-3">
            REI Litics uses the census bureau data api but is not endorsed or
            certified by the census bureau.
          </p>
        </div> */}
            </div>
            <div className="d-flex my-3">
              <div className="row w-100 my-auto">
                <div className="d-block col-6">
                  <label className="orangetxt fs-13">Select State</label>
                  <select
                    className="form-control form-select w-100 form-control-sm"
                    onChange={handleChange}
                    data-id="country"
                    value={region}
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                    }}
                  >
                    {states.map((each) => (
                      <option value={each.name} key={each.name}>
                        {each.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-block col-6">
                  <label className="orangetxt fs-13">Select Region</label>
                  <select
                    className="form-control form-select form-control-sm"
                    onChange={handleChange}
                    value={selectedArea}
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                    }}
                  >
                    {regionName?.map((state) => {
                      return (
                        <option value={state} key={state}>
                          {state}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div
              className="ms-auto my-auto w-100 justify-content-end t-flex t-flex-wrap"
              style={{
                flexWrap: "wrap",
              }}
            >
              <button
                style={{ border: "2px solid #ef6921" }}
                onClick={() => window.open(zillowLink?.ZillowLink)}
                className="btn px-4 fs-14 m-1"
              >
                Search properties on Zillow{" "}
              </button>
              {user?.packageID == "shuihshsu" ? (
                <>
                  <button className="btn greyBtn px-4 fs-14 m-1" disabled>
                    Add to Favourite{" "}
                    <img src={"/unfilledHeart1.svg"} className="ms-2 my-auto" />
                  </button>
                  <button className="btn greyBtn px-4 fs-14 m-1" disabled>
                    Print and Download
                    <img src={"/print.svg"} className="ms-2 my-auto" />
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
                    className="btn px-4 fs-14 m-1"
                    onClick={print}
                  >
                    Print and Download
                    <img src={"/print.svg"} className="ms-2 my-auto" />
                  </button>
                </>
              )}
            </div>
              <>
                <div className="Demo_pg">
                  <div className="">
                    <Population
                      population={population}
                      populationDate={populationDate}
                      otherData={otherData}
                      regionName={regionName}
                      selectedArea={selectedArea}
                      state={region}
                      packageName={packageName}
                    />
                  </div>
                  <div className="">
                    {/* <PopulationByAge totalMedian={totalMedian} maleMedian={maleMedian} femaleMedian={femaleMedian} AgeDepend={AgeDepend} OldAgeDepend={OldAgeDepend} ChildAgeDepend={ChildAgeDepend} FemaleRatioVal={FemaleRatioVal} MaleRatioVal={MaleRatioVal} tltAdlt={tltAdlt} Senior={Senior} male={maleCount} feMale={feMaleCount} age={age} lowest={lowest} highest={highest} /> */}
                    {totalSexRaitio && sexMaleRatioTotal && totalFullArray && (
                      <PopulationByAge
                        totalMedian={totalMedian}
                        totalSexRaitio={totalSexRaitio}
                        sexMaleRatio={sexMaleRatio}
                        sexFemaleRatio={sexFemaleRatio}
                        sexMaleRatioTotal={sexMaleRatioTotal}
                        sexFemaleRatioTotal={sexFemaleRatioTotal}
                        maleMedian={maleMedian}
                        femaleMedian={femaleMedian}
                        AgeDepend={AgeDepend}
                        OldAgeDepend={OldAgeDepend}
                        ChildAgeDepend={ChildAgeDepend}
                        FemaleRatioVal={FemaleRatioVal}
                        MaleRatioVal={MaleRatioVal}
                        totalFullArray={totalFullArray}
                        tltAdlt={tltAdlt}
                        Senior={Senior}
                        male={maleCount}
                        feMale={feMaleCount}
                        age={age}
                        lowest={lowest}
                        highest={highest}
                        packageName={packageName}
                      />
                    )}
                  </div>
                  <div className="">
                    <HouseholdTypes
                      data={oTable}
                      type={type}
                      owner={Owner}
                      renter={renter}
                      packageName={packageName}
                    />
                  </div>
                  <div className="">
                    <IncomeHHT
                      income={income}
                      houseHolds={houseHolds}
                      Married={Married}
                      nonFamlies={nonFamlies}
                      marriedFamilies={marriedFamilies}
                      mean={mean}
                      median={median}
                      name={name}
                      table={medianTable}
                    />
                  </div>
                  <div className="">
                    <IncomeHHByType
                      table={Table}
                      AvgHouseHold={AvgHouseHold}
                      label={label}
                      avgSize={avgSize}
                      packageName={packageName}
                    />
                  </div>
                  <div className="">
                    <EduAttainment
                      male={male}
                      feMale={feMale}
                      eduTableData={eduTableData}
                      percentage={percentage}
                      grade={grade}
                      packageName={packageName}
                    />
                  </div>
                  <div className="">
                    <PopulationbyRace
                      table={raceTable}
                      race={race}
                      percent={percent}
                    />
                  </div>
                  <footer className="text-center text-black mt-5 fs-11">
                    <p>
                      DISCLAIMER - Data is provided “as is” via{" "}
                      <a
                        href="https://www.census.gov/"
                        className="text-black"
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        www.census.gov.
                      </a>
                      .
                    </p>
                    {/* <p>© Zillow, Inc. 2006-2020. Use is subject to Term of Use.</p> */}
                  </footer>
                  <iframe
                    id="ifmcontentstoprint"
                    style={{
                      height: "0px",
                      width: "0px",
                      position: "absolute",
                      display: "none",
                    }}
                  ></iframe>
                </div>
              </>
          </div>
        </>
      )}
    </div>
  );
}
