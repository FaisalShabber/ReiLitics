import React from "react";

export default function BooksComponent(props) {
  return (
    <div
      className="bg-white col-lg-2 col-md-4 col-6 d-flex flex-column hover "
      style={{
        height: "300px",
        gap: "5px",
        width: "184px",
        justifyContent: "space-between",
      }}
    >
      <div className="text-center">
        {props.Imgsrc.includes(".pdf") ? (
          <object
            data={props.Imgsrc}
            type="application/pdf"
            className="px-2"
            height="164px"
            width="148px"
          >
            <iframe
              src={props.Imgsrc}
              className="px-2"
              height="164px"
              width="148px"
              title="pdf"
            >
              <p>This browser does not support PDF!</p>
            </iframe>
          </object>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={props.Imgsrc}
            alt="imgg"
            className="px-2"
            height="170px"
            width="148px"
          ></img>
        )}
      </div>
      <p
        className="mb-0 fs-13"
        style={{
          textAlign: "center",
        }}
      >
        {props.title}
      </p>
      <div>
        <p className="mb-0 fs-13">{props.authur}</p>
        <p className="mb-0 fs-15 Bold">{props.cost}</p>
        <div>
          <button
            className="btn btn-Yelow brdr w-100 my-1"
            onClick={() => window.open(`${props.resourceUrl}`)}
          >
            View {props.Book}
          </button>
        </div>
      </div>
    </div>
  );
}
