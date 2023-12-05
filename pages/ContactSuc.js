import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../Component/Navbar";
import HeadImage from "../styles/UI/HeadImage";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const ContactSuc = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);
  
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <div>
        {" "}
        <Navbar />
        <HeadImage header="Thank You" />
        <div className="container my-5">
          <div className="line_height  py-5 px-2 mx-auto">
            <h2 className="text-success pb-3">We appreciate you reaching out to us and we'll be in touch soon </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSuc;
