import Link from "next/link";
import classes from "./BlogDetail.module.css";
import GetData from "../Api/GetData";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";

const LatestPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("idle");

  useEffect(() => {
    setLoading("loading");
    const response = GetData.BlogComponent();
    response.then((value) => {
      setData(value.data);
      console.log(value.data.articles.slice(0, 4));
      setLoading("loaded");
    });
  }, []);

  return (
    <div>
      {loading === "loaded" ? (
        data.articles.slice(0, 4).map((posts) => {
          console.log(posts);
          const date = new Date(posts.updatedAt);
          const month = date.toLocaleDateString("en-US", { month: "short" });
          const day = date.toLocaleDateString("en-US", { day: "numeric" });
          return (
            <div key={posts._id}>
              <Link href={`/Blog/${posts._id}`} passHref>
                <div className="d-flex my-3 pointer-cursor">
                  <div className={classes.date}>
                    <div className={classes.dateDay}>{day}</div>
                    <div className={classes.dateMonth}>{month}</div>
                  </div>
                  <div className="ms-3 fs-16 my-auto">
                    {posts.title.length > 25
                      ? posts.title.substring(0, 45) + "..."
                      : posts.title}
                  </div>
                  <hr />
                </div>
              </Link>
            </div>
          );
        })
      ) : loading === "loading" ? (
        <Spin />
      ) : null}
    </div>
  );
};

export default LatestPosts;
