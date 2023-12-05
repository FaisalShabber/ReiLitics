import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import PersonalDetails from "../../Component/PersonalDetails";
import GetData from "../../Api/GetData";

const Package = () => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [packageDetails, setPackageDetails] = useState("");

  const getUserProfileData = useCallback(() => {
    const response = GetData.UserProfilGet();
    console.log('user => ', user);
    if(user === "") {
      response.then((value) => {
        setUser(value.data.user);
        setPackageDetails(value.data.user.packageID);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(window.localStorage.getItem("token"));
    }
    if(user === "") {
      getUserProfileData();
    }
  }, [user, getUserProfileData]);
  return (
    <>
      <Head>
        <title>Signup - REI Litics</title>
      </Head>
      <PersonalDetails
        values={user}
        token={token}
        userPackageId={packageDetails?._id}
      />
    </>
  );
};

export default Package;
