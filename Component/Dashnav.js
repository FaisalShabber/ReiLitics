import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "../Component/Navbar.module.css";
import Link from "next/link";
import { DashboardOutlined } from "@ant-design/icons";

function Dashnav() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [notificationOPen, setNotificationOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [typeof window]);

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  function notificationExpand() {
    setNotificationOpen(true);
  }
  function notificationClose() {
    setNotificationOpen(false);
  }
  function dashboardExpand() {
    setDashboardOpen(true);
  }
  function dashboardClose() {
    setDashboardOpen(false);
  }

  return (
    <div className={classes.dashNavColor}>
      <div className="container mx-auto">
        <div className="row ms-0">
          <div className="p-0 m-0 col-12 ms-0">
            <nav className="p-0 navbar navbar-expand-lg navbar-light bordr">
              <div className="p-0 container-fluid">
                <button
                  className="py-5 navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto mb-lg-0">
                    <Link href="/">
                      <div
                        className={`nav-link fs-15  ${classes.NavBtnPadding +
                          " " +
                          classes.navbarText} ${
                          router.pathname == "/" ? "active" : null
                        }`}
                      >
                        Home
                      </div>
                    </Link>
                    <Link href="/#Prices">
                      <div
                        className={`nav-link fs-15 ${classes.NavBtnPadding +
                          " " +
                          classes.navbarText} ${
                          router.pathname == "/" ? "active" : null
                        }`}
                      >
                        Pricing
                      </div>
                    </Link>
                    <Link href="/About">
                      <div
                        className={`nav-link  fs-15 ${classes.NavBtnPadding +
                          " " +
                          classes.navbarText} ${
                          router.pathname == "/About" ? "active" : null
                        }`}
                      >
                        About us
                      </div>
                    </Link>
                    {/* <Link href="/Blog">
                      <div
                        className={`nav-link fs-15 ${
                          classes.NavBtnPadding + " " + classes.navbarText
                        } ${router.pathname == "/Blog" ? "active" : null}`}
                      >
                        Articles
                      </div>
                    </Link> */}
                    <Link href="/Contact">
                      <div
                        className={`nav-link fs-15 ${classes.NavBtnPadding +
                          " " +
                          classes.navbarText} ${
                          router.pathname == "/Contact" ? "active" : null
                        }`}
                      >
                        Contact
                      </div>
                    </Link>
                    {/* <details className="my-auto text-white dropdown">
                      <summary role="button">
                        <span className="button">
                          <img
                            src={"/NotificationNav.svg"}
                            className={`mx-3 text-lg-start noti-w py-md-4 ${classes.notiBtn}`}
                            style={{ objectFit: "contain" }}
                          />
                        </span>
                      </summary>
                      <ul>
                        <li>
                          <div className="px-3 d-inline-flex w-100 brdr_btm1">
                            <img
                              src="./notificationImg.png"
                              style={{ width: "20%" }}
                              alt="img"
                            />
                            <p className="my-auto fs-14 light_font ms-3">
                              ksajhdi soakf sjka akjdn s
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="px-3 d-inline-flex w-100 brdr_btm1">
                            <img
                              src="./notificationImg.png"
                              style={{ width: "20%" }}
                              alt="img"
                            />
                            <p className="my-auto fs-14 light_font ms-3">
                              ksajhdi soakf sjka akjdn s
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="px-3 d-inline-flex w-100 brdr_btm1">
                            <img
                              src="./notificationImg.png"
                              style={{ width: "20%" }}
                              alt="img"
                            />
                            <p className="my-auto fs-14 light_font ms-3">
                              ksajhdi soakf sjka akjdn s
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="px-3 d-inline-flex w-100 brdr_btm1">
                            <img
                              src="./notificationImg.png"
                              style={{ width: "20%" }}
                              alt="img"
                            />
                            <p className="my-auto fs-14 light_font ms-3">
                              ksajhdi soakf sjka akjdn s
                            </p>
                          </div>
                        </li>
                        <Link href="/Notifications">
                          <div className="text-center fs-15 orangetxt">
                            show full notifications
                          </div>
                        </Link>
                      </ul>
                    </details> */}

                    <details className="my-auto text-white dropdown">
                      <summary role="button">
                        <span
                          className={`d-flex button rounded-pill name-bg my-sm-2 my-md-auto ${classes.profileBtn}`}
                        >
                          <img
                            src={user?.image || "user-logo.svg"}
                            className="rounded_img"
                            style={{ width: "4.6rem" }}
                          />
                          <p className="my-auto text-white px-sm-0 ps-md-3 pe-md-5 fs-15">
                            {user?.firstName + " " + user?.lastName}
                          </p>
                        </span>
                      </summary>
                      <ul>
                        <li>
                          <Link href="/Dashboard">
                            <div className="px-3 py-4 d-inline-flex w-100 brdr_btm1">
                              <DashboardOutlined className="mx-3 my-auto" />
                              <p className="mb-0 fs-14 ms-3">My Dashboard</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="/EditProfile">
                            <div className="px-3 py-4 d-inline-flex w-100 brdr_btm1">
                              <img
                                src={"/editLogo_black.svg"}
                                className="mx-3 my-auto"
                              />
                              <p className="mb-0 fs-14 ms-3">Edit Profile</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="/MyFavourites">
                            <div className="px-3 py-4 d-inline-flex w-100 brdr_btm1">
                              <img
                                src={"/heart_black.svg"}
                                className="mx-3 my-auto"
                              />
                              <p className="mb-0 fs-14 ms-3">My Favourites</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="/Notifications">
                            <div className="px-3 py-4 d-inline-flex w-100 brdr_btm1">
                              <img
                                src={"/bell_black.svg"}
                                className="mx-3 my-auto"
                              />
                              <p className="mb-0 fs-14 ms-3">Notifications</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="">
                            <div
                              className="px-3 py-4 d-inline-flex w-100 brdr_btm1"
                              onClick={Logout}
                            >
                              <img
                                src={"/Logout_black.svg"}
                                className="mx-3 my-auto"
                              />
                              <p className="mb-0 fs-14 ms-3">Log Out</p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </ul>
                  {/* <img className="p-2 rounded-pill" src="Path 188.png" alt="" /> */}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashnav;
