import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import Payment from "../../Component/Payment";
import axiosNodeApi from "../../utils/axios";

const Payments = () => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [packageId, setPackageId] = useState("");
  const [couponList, setCouponList] = useState([]);

  const getCouponList = useCallback(() => {
    axiosNodeApi
      .get("/coupon/list")
      .then((response) => {
        console.log(response.data.data);
        setCouponList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(window.localStorage.getItem("user")));
      setPackageId(window.localStorage?.getItem("pkgId"));
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getCouponList();
  }, [getCouponList]);
  return (
    <>
      <Head>
        <title>Payment - REI Litics</title>
      </Head>
      <Payment
        values={user}
        token={token}
        packageId={packageId}
        couponList={couponList}
      />
    </>
  );
};

export default Payments;
