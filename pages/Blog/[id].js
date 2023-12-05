/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import Navbar from "../../Component/Navbar";
import Foter from "../../Component/Footer";
import GetData from "../../Api/GetData";
import { Spin } from "antd";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const BlogDetail = () => {
  const router = useRouter();
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(true);

  const eventId = router.query.id;
  const date = new Date(event?.createdAt);
  const options = { month: "short", year: "numeric", day: "numeric" };
  const fullDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    setLoading(true);
    const response = GetData.BlogDetail(eventId);
    response.then((value) => {
      setEvent(value?.data?.article);
      setLoading(false);
      //   setLoading(false);
    });
  }, [eventId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spin />
      </div>
    );
  } else if (!loading && !event) {
    return <h1 className="text-center mt-5">No Blog Found</h1>;
  } else if (eventId && event) {
    return (
      <div>
        <Head>
          <title>Blog - REI Litics</title>
        </Head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H9MYM6Y0B3"
        ></Script>
        <Navbar />
        <div
          className="container "
          style={{ marginTop: "8rem", marginBottom: "22rem" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="blog-shadow p-1">
                {/* <a className='text-link pointer-cursor fs-13 Bold'>{event.category}</a> */}
                <h2 className="mb-0 fs-40">{event.title}</h2>
                <div className="blog-line my-3"></div>
                <p className="fs-13">
                  Posted on {fullDate} by {event?.author}
                </p>
                <div className="mb-3">
                  <img
                    className="m-2 hover"
                    src={"/facebook-rect.svg"}
                    alt=""
                  />
                  <img
                    className="m-2 hover"
                    src={"/linkedin-square.svg"}
                    alt=""
                  />
                  <img
                    className="m-2 hover"
                    src={"/twitter-square.svg"}
                    alt=""
                  />
                  <img
                    className="m-2 hover"
                    src={"/pinterest-square.svg"}
                    alt=""
                  />
                  <img className="m-2 hover" src={"/gmail.svg"} alt="" />
                  <img className="m-2 hover" src={"/copylink_.png"} alt="" />
                </div>
                <img src={event.image} className="w-100 mt-2" alt="" />
                <p className="mt-3 fs-17">
                  <div dangerouslySetInnerHTML={{ __html: event.detail }} />
                </p>
                <div className="text-center mb-3">
                  <img
                    className="m-2 hover"
                    src={"/facebook-rect.svg"}
                    alt=""
                  />
                  <img
                    className="m-2 hover"
                    src={"/linkedin-square.svg"}
                    alt=""
                  />
                  <img
                    className="m-2 hover"
                    src={"/twitter-square.svg"}
                    alt=""
                  />
                  <img
                    className="m-2 hover"
                    src={"/pinterest-square.svg"}
                    alt=""
                  />
                  <img className="m-2 hover" src={"/gmail.svg"} alt="" />
                  <img className="m-2 hover" src={"/copylink_.png"} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Foter />
      </div>
    );
  }
};

export default BlogDetail;
