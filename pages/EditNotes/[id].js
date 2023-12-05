import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import GetData from "../../Api/GetData";
import { getItemFromSessionStorage } from "../../helpers/session-storage";
import UpdateData from "../../Api/UpdateData";
import { getEventById } from "../../Component/Data/NotesData";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export default function EditNotes() {
  const state = getItemFromSessionStorage("state");
  const region = getItemFromSessionStorage("region")?.split(",")[0];
  const router = useRouter();
  const eventId = router.query.id;
  const event = getEventById(eventId);
  const [editState, setEditState] = useState('');
  const [editRegion, setEditRegion] = useState('');
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [data, setData] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const getNote = () => {
    const response = GetData.showNotes(eventId);
    response.then((value) => {
      console.log('value.data.noteDetail => ', value.data.noteDetail);
      setData(value.data.noteDetail);
      setTitle(value.data.noteDetail.title);
      setDetails(value.data.noteDetail.detail);
      setEditState(value.data.noteDetail.state);
      setEditRegion(value.data.noteDetail.city);
    });
  };

  useEffect(() => {
    if (eventId) {
      getNote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const editNote = (e) => {
    e.preventDefault();
    const res = UpdateData.EditNotes(eventId, title, details);
    res
      .then((value) => {
        if (value.data.success) {
          setSuccessMessage(value.data.message);
          window.location.href = "/MyNotes";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Edit Notes - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
          <div className="container mx-auto p-5">
            <p className="fs-40 Gothic_3D my-3">My Notes</p>
            {eventId && !data ? (
              <div
                className="spinner-border text-center mt-5"
                role="status"
              ></div>
            ) : (
              <>
                <p className="fs-30 Gothic_3D my-3">{(editRegion) + ", " + (editState)}</p>
                <div className="div_grey p-5 notes_form">
                  <p className="fs-22 Bold greyBlack my-3">Notes</p>
                  <form className="row form" onSubmit={editNote}>
                    <div className="form-group  my-2">
                      <input
                        type="text"
                        required
                        // autoComplete={false}
                        className="form-control"
                        value={title}
                        id="title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Subject line/Title"
                      />
                    </div>
                    <div className="form-group my-2">
                      <textarea
                        type="text"
                        required
                        className="form-control"
                        rows={13}
                        name="details"
                        value={details}
                        id="details"
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Add notes details"
                      />
                    </div>
                    <div className="mx-auto text-center">
                      <p className="text-success fs-19">{successMessage}</p>
                      <button
                        type="submit"
                        className="btnYelow fs-16 brdr no_brdr py-3 px-5 mx-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => router.back()}
                        className="btnYelow fs-16 brdr no_brdr py-3 px-5 mx-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
