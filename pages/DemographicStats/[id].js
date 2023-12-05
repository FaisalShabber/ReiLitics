import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Router, { useRouter } from "next/router";
import SecondNavbar from "../../Component/secondNavbar";
import Demographic from "../../Component/Demographic";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export default function Demographi() {
  const routerr = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/Login");
    }
  }, []);

  const eventId = routerr.query.id;

  console.log('eventIdeventIdeventIdeventId => ', eventId);

  return (
    <>
      <Head>
        <title>Demographic Stats - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
        <div
            className="container"
            style={{
              padding: "20px",
            }}
          >
          <SecondNavbar />
          <div
            className="container"
            style={{
              padding: "20px",
            }}
          >
            <Demographic id={eventId} />
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
