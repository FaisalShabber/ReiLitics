import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import SecondNavbar from "../../Component/secondNavbar";
import Market from "../../Component/Market";
import withAuth from "../../Component/Auth";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const MarketStats = () => {
  const router = useRouter();

  const eventId = router.query.id;

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  return (
    <div className="detail_statistics_container">
      <Head>
        <title>Market Stats - REI Litics</title>
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
          </div>
          <div
            className="container"
            style={{
              padding: "20px",
            }}
          >
            {eventId ? <Market id={eventId} /> : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default withAuth(MarketStats);
