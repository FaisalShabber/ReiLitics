import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import GetData from "../../Api/GetData";
import PostData from "../../Api/PostData";
import { getItemFromSessionStorage } from "../../helpers/session-storage";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export default function EditNotes() {
  const router = useRouter();
  // const {pathname} = Router
  const state = getItemFromSessionStorage("state");
  const region = getItemFromSessionStorage("region")?.split(",")[0];
  const [userInput, setuserInput] = useState({
    title: "",
    City: "",
    State: "",
    details: "",
    noteMessage: "",
  });
  const [userMessage, setUserMessage] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [statesdata, setStatesData] = useState([]);

  const handleChange = (e) => {
    setuserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  //   const handleDirectChange = (name, value) => {
  //     setuserInput({ ...userInput, [name]: value });
  //   }

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const submitNotes = (e) => {
    e.preventDefault();
    // nextStep();
    const res = PostData.AddNotes(
      userInput.title,
      userInput.details,
      region,
      state
    );
    res
      .then((value) => {
        setUserMessage(value.data.message);
        router.back();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  useEffect(() => {
    const response = GetData.CountryData();
    response.then((value) => {
      if (value) {
        setCountryData(value?.data?.country);
      }
    });
  }, []);
  const onhandleChange = (e) => {
    // handleDirectChange('country', e.target.value)
    const response = GetData.StatesData(e.target.value);
    response.then((value) => {
      if (value) {
        setStatesData(value?.data?.state);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Edit Notes - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
          <div className="container p-5">
            <p className="fs-40 Gothic_3D my-3">My Notes</p>
            <p className="fs-30 Gothic_3D my-3">
              {region}, {state}
            </p>
            <div className="div_grey p-5">
              <p className="fs-22 Bold greyBlack my-3">Notes</p>
              <form className="row form" onSubmit={submitNotes}>
                <div className="form-group my-2 row">
                  <div className="col-sm-12 col-md-6">
                    {/* <select
                      className="form-select select-set"
                      name="country"
                      onChange={onhandleChange}
                      aria-label="Default select example"
                    >
                      <option value="">Select Country</option>
                      {countryData?.map((country) => {
                        return (
                          <option key={country.name} value={country.isoCode}>
                            {country.name}
                          </option>
                        );
                      })}
                    </select> */}
                  </div>
                  {/* <div className="col-sm-12 col-md-6">
                    {statesdata?.length ? (
                      <select
                        className="form-select select-set"
                        name="State"
                        onChange={handleChange}
                        aria-label="Default select example"
                      >
                        {statesdata?.map((state) => {
                          return (
                            <option key={state.name} value={state.isoCode}>
                              {state.name}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <p>No states Available for this country</p>
                    )}
                  </div> */}
                </div>
                <div className="form-group my-2">
                  <input
                    type="text"
                    required
                    // autoComplete={false}
                    className="form-control textera-bg"
                    value={userInput.title}
                    id="title"
                    name="title"
                    onChange={(e) => {
                      setuserInput((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }));
                    }}
                    placeholder="Subject line/Title"
                  />
                </div>
                <div className="form-group my-2">
                  <textarea
                    type="text"
                    required
                    className="form-control textera-bg"
                    rows={13}
                    name="details"
                    value={userInput.details}
                    id="details"
                    onChange={(e) => {
                      setuserInput((prevState) => ({
                        ...prevState,
                        details: e.target.value,
                      }));
                    }}
                    placeholder="Add notes details"
                  />
                </div>
                <div className="mx-auto text-center">
                  <p className="text-success fs-21"> {userMessage}</p>
                  <button
                    type="submit"
                    className="btnYelow fs-16 brdr no_brdr py-3 px-5 mx-2"
                  >
                    Save
                  </button>
                  <Link href="/MyNotes" passHref>
                    <button className="btnYelow fs-16 brdr no_brdr py-3 px-5 mx-2">
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
