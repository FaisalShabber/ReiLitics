/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import "react-pro-sidebar/dist/css/styles.css";
import Head from "next/head";
import Script from "next/script";
import React, { useEffect, useState, useCallback } from "react";
import ReactSimpleChatbot from "react-simple-chatbot";
import GraphData from "../../Api/Grapgh";
import Link from "next/link";
import Router from "next/router";
import { axiosInstance } from "../_app";
import withAuth from "../../Component/Auth";
import {
  setItemToSessionStorage,
  removeItemFromSessionStorage,
} from "../../helpers/session-storage";
import CustomModal from "../../Component/Modal";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import clsx from "clsx";
import classes from "./dashboard.module.css";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import GetData from "../../Api/GetData";

const getSteps = (setQueryParam, setSuccesModel, firstName) => [
  {
    id: "0",
    message: `Hello ${firstName}, my name is Maximus and I'd be happy to help make some location suggestions.`,
    trigger: "0.1",
  },
  { id: "0.1", message: "Just let me know when you're ready!", trigger: "0.2" },
  {
    id: "0.2",
    options: [{ value: 1, label: "Ready?", trigger: "0.3" }],
  },
  {
    id: "0.3",
    message:
      "Alright, I'll make this fast, but I'll need to ask you a few simple questions to narrow down your search.",
    trigger: "1",
  },
  {
    id: "1",
    message: "What's your budget?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      {
        value: 1,
        label: "Up to $200,000",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, medianPrice: 200000 };
          });
          return "3";
        },
      },
      {
        value: 2,
        label: "Up to $350,000",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, medianPrice: 350000 };
          });
          return "4";
        },
      },
      {
        value: 3,
        label: "Up to $450,000",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, medianPrice: 450000 };
          });
          return "4.1";
        },
      },
      {
        value: 4,
        label: "Don't limit me!",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, medianPrice: 0 };
          });
          return "4.1";
        },
      },
    ],
  },
  {
    id: "3",
    message: "Great, I should be able to make this work!",
    trigger: "5",
  },
  {
    id: "4",
    message: "Nice work! I'm confident I can get you some options!",
    trigger: "5",
  },
  {
    id: "4.1",
    message: "Plenty of options here!",
    trigger: "5",
  },
  {
    id: "5",
    message: "What are your thoughts on property tax?",
    trigger: "6",
  },
  {
    id: "6",
    options: [
      {
        value: 1,
        label: "Keep it low!",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, tax: 0.8 };
          });
          return "7";
        },
      },
      {
        value: 2,
        label: "Let's go with average to low!",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, tax: 1.5 };
          });
          return "8";
        },
      },
      {
        value: 3,
        label: "Don't care, give me more options to look at!",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, tax: 100 };
          });
          return "9";
        },
      },
    ],
  },
  {
    id: "7",
    message: "I agree, who likes property tax anyway!",
    trigger: "10",
  },
  {
    id: "8",
    message: "All good, let's see what we can find.",
    trigger: "10",
  },
  {
    id: "9",
    message: "No problem, I'll give you more options.",
    trigger: "10",
  },
  {
    id: "10",
    message:
      "Some states have legislation favoring landlords, is this something important to you?",
    trigger: "11",
  },
  {
    id: "11",
    options: [
      {
        value: 1,
        label: "Yes, I prefer landlord friendly states!",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, score: 3 };
          });
          return "12";
        },
      },
      {
        value: 2,
        label: "Give me all the options!",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, score: 100 };
          });
          return "13";
        },
      },
    ],
  },
  {
    id: "12",
    message: "It's ok to play it safe.",
    trigger: "14",
  },
  {
    id: "13",
    message: "Ooh living on the wild side, I like it.",
    trigger: "14",
  },
  {
    id: "14",
    message:
      "Are you looking for an area with a low, average or high population?",
    trigger: "15",
  },
  {
    id: "15",
    options: [
      {
        value: 1,
        label: "On the lower side please.",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, start: 0, end: 49999 };
          });
          return "16";
        },
      },
      {
        value: 2,
        label: "Average works for me.",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, start: 50000, end: 199999 };
          });
          return "17";
        },
      },
      {
        value: 3,
        label: "Give me larger cities.",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, start: 200000, end: 50000000 };
          });
          return "18";
        },
      },
    ],
  },
  {
    id: "16",
    message:
      "Don't worry, I won't get you any ghost towns in the middle of nowhere.",
    trigger: "19",
  },
  {
    id: "17",
    message: "Great, let's find some mid sized cities.",
    trigger: "19",
  },
  {
    id: "18",
    message: "Well aren't you a big city person!",
    trigger: "19",
  },
  {
    id: "19",
    message:
      "Almost there, last question. What type of investment growth are you looking for?",
    trigger: "20",
  },
  {
    id: "20",
    options: [
      {
        value: 1,
        label: "I mainly want the property value to go up.",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, average: 9.5 };
          });
          return "21";
        },
      },
      {
        value: 2,
        label: "I'm looking for great rental growth.",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, rental: 8.5 };
          });
          return "22";
        },
      },
      {
        value: 3,
        label:
          "I want it all. Show me property value growth as well as rental growth",
        trigger: () => {
          setQueryParam((prev) => {
            return { ...prev, average: 7, rental: 7 };
          });
          return "23";
        },
      },
    ],
  },
  {
    id: "21",
    message: "Nice, maybe do a little refinance soon!",
    trigger: "24",
  },
  {
    id: "22",
    message: "Let the monthly cash flow.",
    trigger: "24",
  },
  {
    id: "23",
    message: "Well rounded, I like it.",
    trigger: "24",
  },
  {
    id: "24",
    message: "Great, now I just need a minute to filter through.",
    trigger: () => {
      setSuccesModel(true);
      return "25";
    },
  },
  {
    id: "25",
    message: "...",
    end: true,
  },
];

const Dashboard = () => {
  const [queryParam, setQueryParam] = useState({});
  const [states, setStates] = useState([]);
  const [succesModel, setSuccesModel] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [region, setRegion] = useState([]);
  const [regionlist, setRegionlist] = useState([]);
  const [filteredRegion, setFilteredRegion] = useState([]);
  const [packageName, setPackageName] = useState("");

  const firstName = JSON.parse(localStorage.getItem("user"))?.firstName;
  const Region = () => {
    const response = GraphData.marketRegion();
    response.then((value) => {
      if (value) {
        setRegionlist(value.data.Regions);
      }
    });
  };

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  async function getStates() {
    const response = await axiosInstance.get(`/states/US`);
    if (response.data.success == true) {
      setStates(response.data.state);
    }
  }

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    Region();
    getStates();
  }, []);

  useEffect(() => {
    setRegion("");
  }, [selectedRegion]);

  const getUserProfileData = useCallback(() => {
    try {
      const userToken = localStorage.getItem('token');
      
      if(userToken) {
        const response = GetData.UserProfilGet();

        response.then((value) => {
          setPackageName(value.data?.user?.packageID?.name);

          const response2 = GetData.AllPackeges();
          if(value?.data?.user?.packageID === undefined) {
    
            // ASSING PACKAGE
            response2.then((value) => {
              if (value) {
                const pckg_id = value.data.packages.filter((pckg) => pckg.name === 'Free')[0]._id;
                setLoading(true);
        
                axiosNodeApi
                  .post(
                    "/payments/subscription",
                    {
                      email: value?.data?.user?.email,
                      package_id: pckg_id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.data.success) {
                      getUserProfileData();
                    } else {
                      message.error("Something went wrong!");
                    }
                  }).finally(() => {
                    handleCancel();
                    setLoading(false);
                  });
                setData(
                  value?.data?.packages.sort((a, b) => (a.name > b.name ? 1 : -1))
                );
              }
            });
          }
        });
      }
    } catch (err) { 
      console.log(err)
    }
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  /**
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const filterRegionData = (e) => {
    const { value } = e.target;
    setSelectedRegion(value);
    const filterState = states.find((item) => item.isoCode === value);
    setItemToSessionStorage("state", filterState?.name);
    removeItemFromSessionStorage("region");
    setFilteredRegion(
      regionlist.filter((item) => item.RegionName.includes(value))
    );
  };

  function handleChange(e) {
    const { value } = e.target;
    const parsed = JSON.parse(value);
    setRegion(parsed.RegionID);
    setItemToSessionStorage("region", parsed.RegionName);
    setItemToSessionStorage("region_id", parsed.RegionID);
  }

  return (
    <div className="dashboard_container">
      <Head>
        <title>Dashboard - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
          <div className="container mx-auto mt-3 px-md-5">
            <p className="fs-40 Gothic_3D">Hi {firstName}</p>
            <p className={clsx(" mt-3", classes.font_nunito)}>
              Welcome back to your dashboard
            </p>
            <div className={classes.resp}>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                className="col-lg-7 gap-3"
              >
                <div className="">
                  <div className={clsx(classes.card_background)}>
                    <p className="mb-0 fs_25 ">COMPARE METRO REGIONS</p>
                    <p className={clsx("greyBlack mt-3", classes.font_nunito)}>
                      Feeling adventurous? Simply compare metro areas by either
                      market appreciation or rental growth. Once you find one
                      you're interested in, simply click on the area for more
                      information.{" "}
                    </p>
                    <div className="row">
                      <Link href={"./Appreciation"} passHref>
                        <div className="p-3 col-sm-12 col-md-6 ps-0">
                          <div
                            className={clsx(
                              "p-3 text-center Hover pointer-cursor brdr_card brdr",
                              classes.background
                            )}
                          >
                            <img src={"/development1.svg"} />
                            <p className="my-3 fs-18 Bold greyBlack">
                              Market Appreciation
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href={"./RentalGrowth"}
                        passHref
                      >
                        <div
                          className="p-3 col-sm-12 col-md-6"
                        >
                          <div
                            className={clsx(
                              "p-3 text-center Hover pointer-cursor brdr_card brdr",
                              classes.background
                            )}
                          >
                            <img
                              src={"/chart1.svg"}
                            />
                            <p
                              className="my-3 fs-18 Bold greyBlack"
                            >
                              Rental Growth
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className={clsx(classes.card_background)}>
                    <p className="mb-0 fs-22 Gothic_3D fot-mon">
                      LET US HELP YOU FIND A REGION
                    </p>
                    <p className={clsx("greyBlack mt-3", classes.font_nunito)}>
                      We can help you find some areas to look at by answering
                      some questions below.
                    </p>
                    <div className="d-flex justify-content-center t-w-full" >
                      <ReactSimpleChatbot
                        className="chatBot ali w-100"
                        steps={getSteps(
                          setQueryParam,
                          setSuccesModel,
                          firstName
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className={clsx(classes.card_background)}>
                  <p className="mb-0 fs_25">SEARCH DETAILS BY REGION</p>
                  <p className={clsx("greyBlack mt-3", classes.font_nunito)}>
                    Already have a region in mind? Jump straight into more
                    details by selecting the area below.
                  </p>
                  <div className="p-5 mx-auto text-center bg-white">
                    <p
                      className="fs-18 greyBlack"
                      style={{ fontWeight: "medium" }}
                    >
                      SEARCH DETAILS BY REGION
                    </p>
                    <select
                      className="mb-2 form-control2 form-select form-control-sm"
                      onChange={filterRegionData}
                      value={selectedRegion}
                    >
                      <option value="">Select State</option>
                      {states.map((each) => {
                        return (
                          <option key={each.isoCode} value={each.isoCode}>
                            {each.name}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="form-control2 form-select form-control-sm"
                      onChange={handleChange}
                    >
                      <option value="">Select Region</option>
                      {filteredRegion.map((each) => {
                        return (
                          <option
                            key={each.RegionID}
                            value={JSON.stringify(each)}
                          >
                            {each.RegionName}
                          </option>
                        );
                      })}
                    </select>
                    <div className="mt-3 row">
                      <button
                        className="py-3 btn w-50 fs-15 btn-orange brdr"
                        onClick={() => Router.push(`/MarketStats/${region}`)}
                        disabled={region?.length < 1}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomModal
          customClass="found_results_background"
          title="Succefull"
          isModalVisible={succesModel}
          handleClose={() => setSuccesModel(false)}
          closable={true}
        >
          <div className="p-5">
            <p className="p-5 text-center fs-22" style={{ color: 'white' }}>
              Ok, I found you some results!
            </p>
              <div className="text-center">
                <Link
                  href={{
                    pathname: "/Appreciation/AverageAprication/",
                    query: queryParam,
                  }}
                >
                  <a
                    target="_blank"
                    style={{ color: "#ee8350" }}
                    className="px-5 mx-auto btn login-button fs-14 h-auto"
                    onClick={() => setSuccesModel(false)}
                  >
                    Check Result
                  </a>
                </Link>
              </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
