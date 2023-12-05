import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../../Component/Navbar";
import HeadImage from "../../styles/UI/HeadImage";
import Foter from "../../Component/Footer";
import PrivacyPolicy from "../../Component/PrivacyPolicy";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const PrivacyPolicyFooter = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);
  return (
    <>
      <Head>
        <title>Privacy - REI Litics</title>
      </Head>

      <Navbar />
      <HeadImage header="PRIVACY POLICY" />
      <div
        className="container "
        style={{ marginTop: "8rem", marginBottom: "22rem" }}
      >
        <PrivacyPolicy />
      </div>
      <Foter />
    </>
  );
};
export default PrivacyPolicyFooter;
