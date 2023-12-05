import React, { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import Navbar from "../../Component/Navbar";
import HeadImage from "../../styles/UI/HeadImage";
import Foter from "../../Component/Footer";
import TermsOfUse from "../../Component/TermsOfUse";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const Terms = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  return (
    <>
      <Head>
        <title>Contact - REI Litics</title>
      </Head>
      <Navbar />
      <HeadImage header="TERMS OF USE" />
      <div
        className="container"
        style={{ marginTop: "8rem", marginBottom: "22rem" }}
      >
        <TermsOfUse />
      </div>
      <Foter />
    </>
  );
};
export default Terms;
