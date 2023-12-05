/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import GetData from "../Api/GetData";
import React, { useEffect, useState } from "react";
import DeleteData from "../Api/DeleteData";
import { message } from "antd";
import { toast } from "react-hot-toast";
import { axiosInstance } from '../pages/_app';

export default function NotesComponent2({ region }) {
  const [visible, setVisible] = useState(4);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);

  const [notes, setNotes] = useState([]);
  const loadMore = () => {
    setVisible((old) => old + 4);
  };
  const loadLess = () => {
    setVisible((old) => old - 4);
  };

  const getNotes = () => {
    const response = GetData.AllNotes();
    response.then((value) => {
      setNotes(value?.data?.notes);
      setLoading(false);
    });
  };

  const getStates = async () => {
    const response = await axiosInstance.get(`/states/US`);
    if (response.data.success == true) {
      setStates(response.data.state);
    }
  };

  useEffect(() => {
    getNotes();
    getStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const DeleteNote = (id) => {
    const response = DeleteData.DeleteNote(id);
    response.then((value) => {
      setNotes((old) => old.filter((x) => x._id !== id));
      toast.success(value.data.message);
      getNotes();
    });
  };

  return (
    <>
      {notes?.length > 0 && (
        <div className="col-lg-3 col-md-2 col-6">
          <Link href="/create-notes" passHref>
            <div className="bg-notes brdr d-flex flex-column pointer-cursor">
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
      )}
      {loading ? (
        <div className="spinner-border mx-auto" role="status"></div>
      ) : notes?.length > 0 ? (
        <>
          {notes?.slice(0, visible)?.map((x, idx) => {
            const filterState = states?.find((y) => y.name === x.state);
            return (
              <div className="col-lg-3 col-md-4 col-6" key={idx}>
                <div className="bg-dash brdr d-flex flex-column h-100 overflow-hidden justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fs-14 px-3 m-0">
                        {x.city}, {filterState?.isoCode}
                      </span>
                      <img
                        onClick={() => DeleteNote(x._id)}
                        src="/deleteIcon.svg"
                        alt="delete"
                        className="ms-auto p-3 d-flex justify-content-end"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div
                      className="d-inline-flex w-100 mt-2 px-3"
                      // style={{ flex: "1 1 auto" }}
                    >
                      <p className="fs-18 Bold greyBlack">
                        {x.title?.length > 25
                          ? x.title.substring(0, 25) + "....."
                          : x.title}
                      </p>
                    </div>
                    <p className="fs-16 p-3">{x.detail.length > 50 ? x.detail.substring(0, 50) + "..." : x.detail}</p>
                  </div>
                  <div className="d-inline-flex bg-lightBlue bottom_radius w-100">
                    <button className="btn btn-lg py-3 w-50">
                      <Link
                        passHref
                        href={`/ShowNotes/${x._id}`}
                        className="pointer-cursor"
                      >
                        <img src="/eyeIcon.svg" alt="eye" />
                      </Link>
                    </button>
                    <button className="btn btn-lg py-3 w-50">
                      <Link
                        passHref
                        href={`/EditNotes/${x._id}`}
                        className="pointer-cursor"
                      >
                        <img src="/edit_Icon.svg" alt="edit" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center mt-5">
            {notes?.length > 1 &&
              (visible < notes?.length ? (
                <button
                  className="bg_theme brdr text-white no_brdr"
                  onClick={loadMore}
                  style={{ cursor: "pointer" }}
                >
                  load More
                </button>
              ) : (
                <button
                  className="bg_theme brdr text-white no_brdr"
                  onClick={loadLess}
                  style={{ cursor: "pointer" }}
                >
                  Show Less
                </button>
              ))}
          </div>
        </>
      ) : (
        <div
          style={{
            color: "#ef6921",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          You have no notes, but feel free to create one for yourself.
        </div>
      )}
      {notes?.length === 0 && (
        <div className="col-lg-3 col-md-4 col-6">
          <Link href="/create-notes" passHref>
            <div className="bg-notes brdr d-flex flex-column pointer-cursor">
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
      )}
    </>
  );
}
