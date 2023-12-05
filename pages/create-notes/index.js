import React, { useCallback, useEffect } from "react";
import Head from "next/head";

import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import GetData from "../../Api/GetData";
import { axiosInstance } from "../_app";
import PostData from "../../Api/PostData";
import { toast } from "react-hot-toast";

export default function CreateNotes() {
  const router = useRouter();
  const [userInput, setuserInput] = useState({
    title: "",
    City: "",
    State: "",
    details: "",
    noteMessage: "",
  });

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [regionlist, setRegionlist] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const submitNotes = (e) => {
    e.preventDefault();
    if (!userInput.title || !userInput.details) {
      toast.error("Please fill all the fields");
      return;
    }
    const res = PostData.AddNotes(
      userInput.title,
      userInput.details,
      selectedRegion.RegionName?.split(",")[0],
      selectedState.name
    );
    res
      .then((value) => {
        toast.success("Notes added successfully");
        router.push("/MyNotes");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const getStates = useCallback(async () => {
    const response = await axiosInstance.get(`/states/US`);
    if (response.data.success) {
      setStates(response.data.state);
      setSelectedState(response.data.state[0]);
    }
  }, []);

  const getRegions = useCallback(async () => {
    const response = GetData.Region();
    response.then((value) => {
      setAllRegions(value.data.Regions);

      const filteredRegions = value.data.Regions.filter(
        (props) => props.RegionName.split(", ")[1] === "AL"
      );
      setSelectedRegion(filteredRegions[0]);
      setRegionlist(filteredRegions);
    });
  }, []);

  useEffect(() => {
    getStates();
    getRegions();
  }, [getStates, getRegions]);

  const handleChangeState = (e) => {
    const { value } = e.target;
    const findState = states.find((item) => item.isoCode === value);

    const filteredRegions = allRegions.filter(
      (props) => props.RegionName.split(", ")[1] === findState?.isoCode
    );
    setSelectedState(findState);
    setRegionlist(filteredRegions);
    setSelectedRegion(filteredRegions[0]);
  };

  const handleChangeRegion = (e) => {
    const { value } = e.target;
    const findRegion = regionlist.find((item) => item.RegionID === value);
    setSelectedRegion(findRegion);
  };

  return (
    <>
      <Head>
        <title>My Notes - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
          <div className="container mx-auto p-5">
            <p className="fs-40 Gothic_3D my-3 fot-mon">Add Notes</p>
          </div>
          <form className="row form" onSubmit={submitNotes}>
            <div className="row w-100 my-auto">
              <div className="d-block col-12">
                <label className="orangetxt fs-13">Select State</label>
                <select
                  className="form-control form-select w-100 form-control-sm"
                  onChange={handleChangeState}
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
                  onChange={handleChangeRegion}
                  // value={sltdRegion}
                  // onBlur={handleBlur}
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                  }}
                >
                  {regionlist.map((each) => (
                    <option value={each.RegionID} key={each.RegionID}>
                      {each.RegionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                required
                // autoComplete={false}
                className="form-control textera-bg"
                // value={userInput.title}
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
                // value={userInput.details}
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
              {/* <p className="text-success fs-21"> {userMessage}</p> */}
              <button
                type="submit"
                className="btnYelow fs-16 brdr no_brdr py-3 px-5 mx-2"
              >
                Add
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
    </>
  );
}
