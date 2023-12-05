import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import GetData from "../../Api/GetData";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export default function EditNotes() {
  const [data, setData] = useState("");

  const router = useRouter();
  const eventId = router.query.slug;
  const getNote = () => {
    const response = GetData.showNotes(eventId[0]);
    response.then((value) => {
      setData(value.data.noteDetail);
    });
  };
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    if (eventId) {
      getNote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);
  return eventId && !data ? (
    <div className="spinner-border mx-auto" role="status"></div>
  ) : (
    <>
      <Head>
        <title>Note - REI Litics</title>
      </Head>

      <div>
        <NewNavbar />
        <div
          className="d-inline-flex w-100"
          style={{ background: "#FAFBFF", padding: "18px 20px" }}
        >
          <NewSidebar />
          <div style={{ width: "inherit" }} className="overflow_class">
            <div className="container mx-auto p-5">
              <p className="fs-40 Gothic_3D my-3">My Note</p>
              <p className="fs-30 Gothic_3D my-3">
                {data?.city}, {data?.state}
              </p>
              <div className="p-5 card">
                {/* <p className="fs-22 Bold greyBlack my-3">Notes</p> */}
                <h2
                  className="fs-24 my-4"
                  style={{
                    fontSize: "3rem",
                  }}
                >
                  {data?.title}
                </h2>
                <p className="fs-17">{data?.detail}</p>

                <div className="mx-auto text-center">
                  <button
                    onClick={() => router.back()}
                    className="btnYelow fs-16 brdr no_brdr py-3 px-5 mx-2"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
