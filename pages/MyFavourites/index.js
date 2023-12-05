import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Script from "next/script";
import FavCard from "../../Component/FavCard";
import DeleteData from "../../Api/DeleteData";
import { message } from "antd";
import { axiosInstance } from "../_app";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import GetData from "../../Api/GetData";
import { LoadingOutlined } from "@ant-design/icons";

function MyFavourite() {
  const [visible, setVisible] = useState(90);
  const [favourite, setFavourite] = useState([]);
  const [token, setToken] = useState("");
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, display: "block" }} spin />
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(window.localStorage.getItem("token"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const getUserProfileData = useCallback(async () => {
    setLoading(true);
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const loadMore = () => {
    setVisible((old) => old + 4);
  };
  const loadLess = () => {
    setVisible((old) => old - 4);
  };
  const getFavourites = (tokenn) => {
    // alert('3')
    const config = {
      method: "get",
      url: "/favorite",
      headers: {
        Authorization: `Bearer ${tokenn}`,
      },
    };

    axiosInstance(config)
      .then((response) => {
        const filterData = response?.data?.favoriteRegions.filter(
          (data) => data.regionName !== "United States"
        );
        setFavourite(filterData);
      })
      .catch((error) => {
        console.log("e", error);
      });
  };

  const DeleteFavrts = (id) => {
    const response = DeleteData.DeleteFavourite(id);
    response
      .then((value) => {
        // alert('1')

        if (value) {
          //   alert('2')
          message.success("Removed Successgully");
          getFavourites(token);
        }
        //   setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      getFavourites(token);
    }
  }, [token]);
  // const event = getEventByFav();
  if (!favourite) {
    return <h1 className="text-center mt-5">No Favorites Found</h1>;
  } else if (favourite) {
    return (
      <>
        <Head>
          <title>Favorites - REI Litics</title>
        </Head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H9MYM6Y0B3"
        ></Script>
        <NewNavbar />
        <div
          className="d-inline-flex w-100"
          style={{ background: "#FAFBFF", padding: "18px 20px" }}
        >
          <NewSidebar />

          <div style={{ width: "inherit" }} className="overflow_class">
            <div className="container mx-auto mt-3 px-md-5 Table">
              <p className="fs-40 Gothic_3D fot-mon">My Favorites</p>
              {loading ? (
                <>{antIcon}</>
              ) : (
                <>
                  <div
                    style={
                      (packageName === "Free" || packageName === '' || packageName === undefined) ? { filter: "blur(10px)", pointerEvents: 'none' } : {}
                    }
                  >
                    <div className="row my-4 g-4">
                      {favourite.length > 0 ? (
                        favourite.slice(0, visible).map((fav, index) => {
                          return (
                            <FavCard
                              key={index}
                              DeleteFavrt={DeleteFavrts}
                              city={fav?.regionName}
                              id={fav?.regionID}
                              state={fav?.state}
                            />
                          );
                        })
                      ) : (
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#ef6921",
                          }}
                        >
                          There is no favourite region at this time!
                        </div>
                      )}
                    </div>
                    <div className="text-center my-3">
                      {favourite.length > 12 &&
                        (visible < favourite.length ? (
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
                  </div>
                  {(packageName === "Free" || packageName === '' || packageName === undefined) && (
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <button
                        style={{
                          borderRadius: "20px",
                          padding: "0.5rem 2.5rem",
                        }}
                        className="no_brdr fs-15 btnYelow"
                        onClick={() => {
                          window.location.href = `/#Prices`;
                        }}
                      >
                        Unlock
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default MyFavourite;
// <div className="text-center my-4">
//     <button className="bg_theme brdr text-white no_brdr " onClick={loadMore} style={{ cursor: "pointer" }}>
//         load More
//     </button>
// </div>
