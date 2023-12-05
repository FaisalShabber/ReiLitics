import React, { useEffect } from "react";
import Head from "next/head";
import { getItemFromSessionStorage } from "../../helpers/session-storage";
import NotesComponent2 from "../../Component/NotesComponent2";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import Link from "next/link";
import classes from "../../Component/new.Navbar.module.css";

export default function MyNotes() {
  const region = getItemFromSessionStorage("region")?.split(",")[0];

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  return (
    <>
      <Head>
        <title>My Notes - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
          <div className="container mx-auto p-5">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <p className="fs-40 Gothic_3D my-3 fot-mon">My Notes</p>
              {/* <Link href="/create-notes">
                <button
                  type="button"
                  style={{ width: "fit-content" }}
                  className={`${classes.login} py-0 mx-0 btn-primary btn ms-3`}
                >
                  Create Notes
                </button>
              </Link> */}
            </div>

            <div className="row NoteBox gy-4">
              <NotesComponent2 region={region} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
