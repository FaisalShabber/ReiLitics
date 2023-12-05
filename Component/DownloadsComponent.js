import React from "react";

export default function DownloadsComponent(props) {
  return (
    <div className="bg-white col-lg-2 col-md-4 col-6 text-center flex-column h-100">
      <div style={{ flex: "1 1 auto" }} className="py-4 hover">
        <div className="d-inline-flex">
          <img src={props.Imgsrc} />
          <img src="./Download_Icon.svg" className="mb-auto ms-3" />
        </div>
        <div className="p-2">
          <p className="mb-0 fs-13">{props.fileName}</p>
        </div>
      </div>
    </div>
  );
}
