import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/future/image";
import { useRouter } from "next/router";
import classes from "./new.Navbar.module.css";
import clsx from "clsx";
import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { DashboardOutlined } from "@ant-design/icons";

function NewNavbar() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    } else {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    handleResize(); // Call the function initially to set the initial state based on the window width

    const handleResizeWithCallback = () => {
      handleResize();
    };

    window.addEventListener("resize", handleResizeWithCallback);
    return () => {
      window.removeEventListener("resize", handleResizeWithCallback);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className={clsx(
        "t-flex t-items-center w-100 position-relative",
        classes.main_div
      )}
      style={{
        maxWidth: "1500px",
      }}
    >
      <div
        className="t-flex t-items-center t-gap-10 w-100 h-100"
        style={{ maxWidth: "1200px", justifyContent: "space-between" }}
      >
        <Image
          width={161}
          height={40}
          src={"/header/LogoBlack.png"}
          alt="reilitics"
          onClick={() => router.replace("/")}
          className={classes.logo}
        />
        <div className="t-flex t-items-center h-100" style={{ gap: "8px" }}>
          <div className={clsx("h-100", classes.content)}>
            <Link href="/">
              <div
                role="button"
                className={clsx(
                  `px-4 nav-set-border text-new h-100 t-flex t-items-center`,
                  router.pathname == "/" && "active"
                )}
              >
                Home
              </div>
            </Link>
            <Link href={user ? "/Dashboard" : "/Login"}>
              <div
                role="button"
                className={clsx(
                  `px-4 nav-set-border text-new h-100 t-flex t-items-center`,
                  router.pathname == "/Dashboard" && "active"
                )}
              >
                Dashboard
              </div>
            </Link>
            <Link href="/#Prices">
              <div
                role="button"
                className={clsx(
                  `px-4 nav-set-border text-new h-100 t-flex t-items-center`,
                  router.pathname == "/Pricing" && "active"
                )}
              >
                Pricing
              </div>
            </Link>
            <Link href="/About">
              <div
                role="button"
                className={clsx(
                  `px-4 nav-set-border text-new h-100 t-flex t-items-center`,
                  router.pathname == "/About" && "active"
                )}
              >
                About
              </div>
            </Link>
            <Link href="/Contact">
              <div
                role="button"
                className={clsx(
                  `px-4 nav-set-border nav-set-border2 text-new h-100 t-flex t-items-center`,
                  router.pathname == "/Contact" && "active"
                )}
              >
                Contact
              </div>
            </Link>
          </div>
          <div>
            {user ? (
              <>
                <details className="my-auto dropdown">
                  <summary role="button">
                    <span
                      className={clsx(
                        `t-flex button rounded-pill t-items-center`,
                        classes.bg_btn
                      )}
                      style={{ gap: "10px", paddingRight: "10px" }}
                    >
                      <Image
                        width={46}
                        height={46}
                        alt="user-logo.svg"
                        src={user?.image || "/user-logo.svg"}
                        className={classes.user_image}
                      />
                      <p
                        style={{
                          width: "fit-content",
                          margin: "0",
                          fontSize: "14px",
                          color: 'white'
                        }}
                      >
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
                          <Image
                            width={16}
                            height={16}
                            alt="editLogo_black.svg"
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
                          <Image
                            width={16}
                            height={16}
                            alt="heart_black.svg"
                            src={"/heart_black.svg"}
                            className="mx-3 my-auto"
                          />
                          <p className="mb-0 fs-14 ms-3">My Favourites</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/Blog">
                        <div
                          className="px-3 py-4 d-inline-flex w-100 brdr_btm1"
                          onClick={Logout}
                        >
                          <Image
                            width={16}
                            height={16}
                            alt="Logout_black.svg"
                            src={"/Logout_black.svg"}
                            className="mx-3 my-auto"
                          />
                          <p className="mb-0 fs-14 ms-3">Log Out</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </details>
              </>
            ) : (
              <>
                <Link href="/Login">
                  <button
                    type="button"
                    className={`${classes.login} py-0 mx-0 btn-primary btn ms-3`}
                  >
                    Login
                  </button>
                </Link>
                <Link href="/SignUp">
                  <button
                    type="button"
                    className={`${classes.sign} py-0 mx-0 btn ms-3 hover`}
                  >
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
          <div
            className={classes.hamburger}
            role="button"
            onClick={() => setShowSidebar(true)}
          >
            <BiMenuAltRight className={classes.hamburger2} />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          classes.sidebar,
          showSidebar ? classes.right_show : classes.right_hide
        )}
      >
        <div
          className={classes.cross}
          role="button"
          onClick={() => setShowSidebar(false)}
        >
          <IoClose className={classes.cross2} />
        </div>

        <div className={clsx(classes.content2)}>
          <Link href="/">
            <div
              onClick={() => setShowSidebar(false)}
              role="button"
              className={clsx(
                `px-4 text-new h-100 t-flex t-items-center`,
                router.pathname == "/" && "active"
              )}
            >
              Home
            </div>
          </Link>
          <Link href="/#Prices">
            <div
              onClick={() => setShowSidebar(false)}
              role="button"
              className={clsx(
                `px-4 text-new h-100 t-flex t-items-center`,
                router.pathname == "/Pricing" && "active"
              )}
            >
              Pricing
            </div>
          </Link>
          <Link href="/About">
            <div
              onClick={() => setShowSidebar(false)}
              role="button"
              className={clsx(
                `px-4 text-new h-100 t-flex t-items-center`,
                router.pathname == "/About" && "active"
              )}
            >
              About
            </div>
          </Link>
          <Link href="/Contact">
            <div
              onClick={() => setShowSidebar(false)}
              role="button"
              className={clsx(
                `px-4 text-new h-100 t-flex t-items-center`,
                router.pathname == "/Contact" && "active"
              )}
            >
              Contact
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewNavbar;
