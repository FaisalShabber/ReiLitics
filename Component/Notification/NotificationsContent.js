import React from "react";

export default function NotificationsContent(props) {
  return (
    <>
      <div className="btn-orange px-5">
        <p className="ps-4 py-2 fs-18 Boldest">{props.subject}</p>
      </div>
      <div className="d-inline-flex w-100 px-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/notif.png"} style={{ width: "7%" }} alt="" />
        <p className="my-auto fs-16 ms-3">{props.description}</p>
      </div>
    </>
  );
}
