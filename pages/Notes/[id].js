import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import NotesComponent from "../../Component/NotesComponent";
import SecondNavbar from "../../Component/secondNavbar";
import { getItemFromSessionStorage } from "../../helpers/session-storage";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export default function Notes() {
  const state = getItemFromSessionStorage("state");
  const region = getItemFromSessionStorage("region")?.split(",")[0];

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  return (
    <>
      <Head>
        <title>Notes - REI Litics</title>
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
          <div className="container mx-auto p-5">
            <p className="fs-40 Gothic_3D my-3">
              My Notes For {region && region + ", " + state}
            </p>
            <div className="row gy-4">
              <div className="col-lg-3 col-md-4 col-6">
                <Link href="/EditNotes" passHref>
                  <div className="bg-notes brdr d-flex flex-column h-100 pointer-cursor">
                    <div className="text-center my-auto">
                      <div className="my-5 py-5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/addNotes_Icon.svg" alt="icon" />
                        <p className="fs-18 Bold mt-3">Add a Note</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <NotesComponent region={region} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
