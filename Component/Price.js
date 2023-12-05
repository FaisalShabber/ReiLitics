/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";

const Price = (props) => {
  const router = useRouter();

  return (
    <div className="card graph_hover my-2">
      <div className="mx-auto text-center w-100 Card-color">
        <p className="my-auto fs-30 Gothic_3D">{props.Name}</p>
        <div
          className="text-center price-border div-color edge px-4  mx-auto"
          style={{ width: "fit-content" }}
        >
          <p className="my-auto fs-40 Gothic_3D Bold text-nowrap">
            ${props.Amount}
          </p>
          <p className="mt-2 fs-22 Gothic_3D text-nowrap mb-0">
            {props.Package}
          </p>
          <div className="price-line mt-2 mb-5 mx-auto"></div>
          {props.options.map((item, i) => (
            <div className="d-flex mb-4" key={i}>
              <img
                src={"/check-circle-fill.png"}
                className="img-fluid"
                style={{ objectFit: "contain" }}
                alt="..."
              />
              <p className="my-auto  ms-2 fs-10">{item}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            if (props.Name == "Free") {
              props.handleFreeSubscription(props.id);
              return;
            }

            localStorage.setItem("pkgId", props.id);
            router.push(`/SignUp/payments?signUp=${true}`);
          }}
          style={
            props?.userPackageId == props.id
              ? { backgroundColor: "#2169ef", color: "#fff" }
              : { backgroundColor: "#ef6921", color: "#fff" }
          }
          className="btn btn_width brdr_2 py-3 mt-5"
        >
          {props?.userPackageId == props.id ? "Currently Subscribed" : "Select"}
        </button>
        <hr className="d-sm-flex d-md-none mt-5" />
      </div>
    </div>
  );
};

export default Price;
