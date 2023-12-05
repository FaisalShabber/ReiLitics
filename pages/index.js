import Script from "next/script";
import Head from "next/head";
import Navbar from "../Component/Navbar";
import HomePage from "./Home";
import Foter from "../Component/Footer";
import CookieConsent from "react-cookie-consent";
import { useEffect, useState } from "react";
import CustomModal from "../Component/Modal";
import CookiesPolicy from "../Component/CookiesPolicy";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export default function Home() {
  const [cookiesModel, setCookiesModel] = useState(false);

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div>
        <Navbar />
        <HomePage />
        <CookieConsent
          location="bottom"
          buttonText="Got it!"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{
            color: "white",
            backgroundColor: "#ef6921",
            fontSize: "13px",
            padding: "7px 20px",
            borderRadius: "8px",
          }}
          expires={150}
        >
          <h2 className="text-white">Have a cookie.</h2>
          <span style={{ fontSize: "17px" }}>
            We use cookies to ensure you get the best user experience.
          </span>{" "}
          <span
            style={{ fontSize: "17px" }}
            className="orangetxt pointer-cursor"
            onClick={() => {
              setCookiesModel(true);
            }}
          >
            {" "}
            Learn more
          </span>
        </CookieConsent>
        <CustomModal
          title="Cookies Policy"
          customClass="modal-white"
          isModalVisible={cookiesModel}
          handleOk={setCookiesModel}
          handleClose={() => setCookiesModel(false)}
          closable={true}
        >
          <CookiesPolicy />
        </CustomModal>
        <Foter />
      </div>
    </>
  );
}
