import Foter from "../../Component/Footer";
import HeadImage from "../../styles/UI/HeadImage";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../../Component/Navbar";
import React, { useEffect } from "react";
import CookiesPolicy from "../../Component/CookiesPolicy";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const CokiePolicy = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  return (
    <>
      <Head>
        <title>Cookie Policy - REI Litics</title>
      </Head>

      <Navbar />
      <HeadImage header="COOKIE POLICY" />
      <div
        className="container"
        style={{ marginBottom: "20rem", marginTop: "10rem" }}
      >
        <CookiesPolicy />
      </div>
      <Foter />
    </>
  );
};
export default CokiePolicy;
