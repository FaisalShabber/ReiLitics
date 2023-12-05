/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FiLogOut } from "react-icons/fi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  const [user, setUser] = useState("");

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMenuCollapse(true);
      } else if (window.innerWidth > 1024) {
        setMenuCollapse(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
      // Set window width/height to state
      if (window.innerWidth < 786) {
        setMenuCollapse(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse} width={274}>
          <SidebarHeader>
            <div className="text-center closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <img src={"/collapseIcon.svg"} style={{ width: "2.5rem" }} />
              ) : (
                <img src={"/collapseIcon.svg"} style={{ width: "2.5rem" }} />
              )}
            </div>
            <div
              className={`logotext text-center `}
              style={{ width: "inherit" }}
            >
              <img
                className="my-2 disp-none side-bar-logo"
                src={"/logo-white.png"}
              />
              <img
                className="my-2 d-none display_block imgw"
                src={"/LogoOnly.png"}
              />
            </div>
            <div className="my-3 text-center">
              <img
                src={user?.image || "user-logo.svg"}
                className="rounded_img Img_size"
              />
            </div>
            <Link passHref href="/EditProfile">
              <div className="mt-3 text-center disp-none">
                <p
                  className={`text-white fs-18 mb-1 pointer-cursor ${
                    router.pathname == "/EditProfile" ? "active" : null
                  }`}
                >
                  {user?.firstName} {user?.lastName}
                  <img src={"/editLogo.png"} className="mx-3 mb-1" />
                </p>
              </div>
            </Link>
            <p className="text-center fs-14 disp-none">{user?.email}</p>
            {/* <span style={{ marginLeft: '8rem' }}>&#9660;</span> */}
          </SidebarHeader>
          <SidebarContent>
            <Menu className="fs-15" iconShape="square">
              <Link passHref href="/Dashboard" className="dropdown-item">
                <MenuItem
                  className={router.pathname == "/Dashboard" ? "active" : null}
                  icon={
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4_26)">
                        <path
                          d="M0 10.137H8.109V0H0V10.137ZM0 18.246H8.109V12.164H0V18.246ZM10.137 18.246H18.246V8.109H10.137V18.246ZM10.137 0V6.082H18.246V0H10.137Z"
                          fill={
                            router.pathname == "/Dashboard"
                              ? "#ef6921"
                              : "#adadad"
                          }
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_26">
                          <rect width="18.246" height="18.246" fill="#adadad" />
                        </clipPath>
                      </defs>
                    </svg>
                  }
                >
                  Dashboard overview
                </MenuItem>
              </Link>
              <div className="ms-4">
                <Link passHref href="/Appreciation" className="dropdown-item">
                  <MenuItem
                    className={
                      router.pathname == "/Appreciation" ? "active" : null
                    }
                    icon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_4_10)">
                          <path
                            d="M4.15 1.384V4.15H1.384V1.384H4.15ZM0 0V5.536H5.536V0H0Z"
                            fill={
                              router.pathname == "/Appreciation"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                          <path
                            d="M11.072 3.46V6.228H8.30401V3.46H11.072ZM6.92001 2.076V7.612H12.456V2.076H6.92001Z"
                            fill={
                              router.pathname == "/Appreciation"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                          <path
                            d="M4.15 9.688V12.454H1.384V9.688H4.15ZM0 8.304V13.84H5.536V8.304H0Z"
                            fill={
                              router.pathname == "/Appreciation"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                          <path
                            d="M13.84 5.536V9.686H9.68601V13.838H5.53601V19.374H19.377V5.536H13.84ZM11.072 11.072H13.84V13.84H11.072V11.072ZM9.68601 17.993H6.92001V15.224H9.68601V17.993ZM13.838 17.993H11.072V15.224H13.84L13.838 17.993ZM17.99 17.993H15.224V15.224H17.992L17.99 17.993ZM17.99 13.841H15.224V11.072H17.992L17.99 13.841ZM15.224 9.686V6.92H17.992V9.686H15.224Z"
                            fill={
                              router.pathname == "/Appreciation"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4_10">
                            <rect
                              width="19.377"
                              height="19.377"
                              fill={
                                router.pathname == "/Appreciation"
                                  ? "#ef6921"
                                  : "#adadad"
                              }
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    }
                  >
                    Market Appreciation
                  </MenuItem>
                </Link>
                <Link passHref href="/RentalGrowth" className="dropdown-item">
                  <MenuItem
                    className={
                      router.pathname == "/RentalGrowth" ? "active" : null
                    }
                    icon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_4_5)">
                          <path
                            d="M4.36 4.845H0.807C0.593052 4.84527 0.387942 4.93037 0.236657 5.08166C0.0853726 5.23294 0.000264624 5.43805 0 5.652V18.57C0.000264624 18.784 0.0853726 18.9891 0.236657 19.1403C0.387942 19.2916 0.593052 19.3767 0.807 19.377H4.36C4.57395 19.3767 4.77906 19.2916 4.93034 19.1403C5.08163 18.9891 5.16674 18.784 5.167 18.57V5.652C5.16674 5.43805 5.08163 5.23294 4.93034 5.08166C4.77906 4.93037 4.57395 4.84527 4.36 4.845V4.845ZM3.875 18.082H1.292V6.137H3.875V18.082Z"
                            fill={
                              router.pathname == "/RentalGrowth"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                          <path
                            d="M11.465 9.043H7.91201C7.69806 9.04327 7.49295 9.12837 7.34167 9.27966C7.19038 9.43094 7.10528 9.63605 7.10501 9.85V18.568C7.10528 18.7819 7.19038 18.9871 7.34167 19.1383C7.49295 19.2896 7.69806 19.3747 7.91201 19.375H11.465C11.679 19.3747 11.8841 19.2896 12.0354 19.1383C12.1866 18.9871 12.2717 18.7819 12.272 18.568V9.848C12.2717 9.63405 12.1866 9.42894 12.0354 9.27766C11.8841 9.12637 11.679 9.04126 11.465 9.041V9.043ZM10.98 18.086H8.39701V10.335H10.981L10.98 18.086Z"
                            fill={
                              router.pathname == "/RentalGrowth"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                          <path
                            d="M18.57 0H15.017C14.803 0.000264624 14.5979 0.0853726 14.4466 0.236657C14.2954 0.387942 14.2103 0.593052 14.21 0.807V18.57C14.2103 18.7839 14.2954 18.9891 14.4466 19.1403C14.5979 19.2916 14.803 19.3767 15.017 19.377H18.57C18.7839 19.3767 18.9891 19.2916 19.1403 19.1403C19.2916 18.9891 19.3767 18.7839 19.377 18.57V0.807C19.3767 0.593052 19.2916 0.387942 19.1403 0.236657C18.9891 0.0853726 18.7839 0.000264624 18.57 0V0ZM18.085 18.085H15.502V1.292H18.085V18.085Z"
                            fill={
                              router.pathname == "/RentalGrowth"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4_5">
                            <rect
                              width="19.377"
                              height="19.377"
                              fill={
                                router.pathname == "/RentalGrowth"
                                  ? "#ef6921"
                                  : "#adadad"
                              }
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    }
                  >
                    Rental Growth
                  </MenuItem>
                </Link>
                <Link
                  passHref
                  href="/MarketStats/394913"
                  className="dropdown-item"
                >
                  <MenuItem
                    className={
                      router.pathname.includes(
                        "MarketStats",
                        "Notes",
                        "DemographicStats",
                        "EconomicStats"
                      )
                        ? "active"
                        : ""
                    }
                    icon={
                      <svg
                        width="23"
                        height="13"
                        viewBox="0 0 23 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2_3)">
                          <path
                            d="M19.947 5.541C19.6805 5.5431 19.4167 5.59323 19.168 5.689L16.511 3.513C16.5815 3.27183 16.6192 3.02224 16.623 2.771C16.6262 2.35225 16.5344 1.93824 16.3546 1.56006C16.1747 1.18188 15.9115 0.849374 15.5847 0.587533C15.2579 0.325692 14.876 0.141323 14.4678 0.0482817C14.0595 -0.0447599 13.6354 -0.0440545 13.2274 0.0503454C12.8194 0.144745 12.4382 0.330384 12.1122 0.593311C11.7863 0.856239 11.5242 1.18962 11.3456 1.56839C11.1671 1.94717 11.0767 2.36149 11.0812 2.78022C11.0858 3.19895 11.1852 3.61121 11.372 3.986L8.148 7.8C8.019 7.77612 7.88818 7.76341 7.757 7.762C7.56521 7.76421 7.37456 7.79178 7.19 7.844L4.349 5C4.40236 4.816 4.43028 4.62557 4.432 4.434C4.432 3.99572 4.30203 3.56727 4.05854 3.20286C3.81504 2.83844 3.46895 2.55441 3.06403 2.38668C2.65911 2.21896 2.21354 2.17507 1.78368 2.26058C1.35382 2.34608 0.958965 2.55714 0.649052 2.86705C0.339139 3.17696 0.128086 3.57182 0.0425808 4.00168C-0.042924 4.43154 0.000960186 4.8771 0.168684 5.28203C0.336408 5.68695 0.620438 6.03304 0.984857 6.27654C1.34928 6.52003 1.77772 6.65 2.216 6.65C2.40779 6.64779 2.59844 6.62021 2.783 6.568L5.624 9.409C5.57079 9.59303 5.54287 9.78344 5.541 9.975C5.53949 10.2988 5.60897 10.619 5.74454 10.9131C5.88011 11.2072 6.07849 11.468 6.3257 11.6771C6.57292 11.8863 6.86297 12.0387 7.17544 12.1237C7.4879 12.2086 7.8152 12.2241 8.13429 12.169C8.45338 12.1138 8.75651 11.9894 9.02234 11.8045C9.28818 11.6196 9.51026 11.3787 9.67296 11.0987C9.83566 10.8187 9.93502 10.5065 9.96405 10.184C9.99308 9.86149 9.95108 9.53653 9.841 9.232L13.069 5.418C13.324 5.49731 13.589 5.53974 13.856 5.544C14.2935 5.54147 14.7241 5.43451 15.112 5.232L17.771 7.408C17.75 7.52423 17.7379 7.64192 17.735 7.76C17.735 8.19828 17.865 8.62672 18.1085 8.99114C18.352 9.35556 18.6981 9.63959 19.103 9.80732C19.5079 9.97504 19.9535 10.0189 20.3833 9.93342C20.8132 9.84791 21.208 9.63686 21.5179 9.32695C21.8279 9.01703 22.0389 8.62218 22.1244 8.19232C22.2099 7.76246 22.166 7.31689 21.9983 6.91197C21.8306 6.50705 21.5466 6.16096 21.1821 5.91746C20.8177 5.67397 20.3893 5.544 19.951 5.544L19.947 5.541Z"
                            fill={
                              router.pathname.includes(
                                "MarketStats",
                                "Notes",
                                "DemographicStats",
                                "EconomicStats"
                              )
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2_3">
                            <rect
                              width="22.164"
                              height="12.19"
                              fill={
                                router.pathname.includes(
                                  "MarketStats",
                                  "Notes",
                                  "DemographicStats",
                                  "EconomicStats"
                                )
                                  ? "#ef6921"
                                  : "#adadad"
                              }
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    }
                  >
                    Detail Statistics
                  </MenuItem>
                </Link>
              </div>
              <Link passHref href="/mortgage-rates">
                <MenuItem
                  className={
                    router.pathname == "/mortgage-rates" ? "active" : null
                  }
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 19.586L17.293 14.293C17.4816 14.1108 17.7342 14.01 17.9964 14.0123C18.2586 14.0146 18.5094 14.1198 18.6948 14.3052C18.8802 14.4906 18.9854 14.7414 18.9877 15.0036C18.9899 15.2658 18.8892 15.5184 18.707 15.707L12.707 21.707C12.6142 21.7999 12.504 21.8737 12.3827 21.924C12.2614 21.9743 12.1313 22.0002 12 22.0002C11.8687 22.0002 11.7386 21.9743 11.6173 21.924C11.496 21.8737 11.3858 21.7999 11.293 21.707L5.293 15.707C5.11084 15.5184 5.01004 15.2658 5.01232 15.0036C5.0146 14.7414 5.11977 14.4906 5.30518 14.3052C5.49058 14.1198 5.7414 14.0146 6.00359 14.0123C6.26579 14.01 6.51839 14.1108 6.707 14.293L12 19.586ZM12 4.414L6.707 9.707C6.51839 9.88916 6.26579 9.98995 6.00359 9.98768C5.7414 9.9854 5.49058 9.88023 5.30518 9.69482C5.11977 9.50941 5.0146 9.2586 5.01232 8.9964C5.01004 8.73421 5.11084 8.4816 5.293 8.293L11.293 2.293C11.3858 2.20006 11.496 2.12632 11.6173 2.07601C11.7386 2.0257 11.8687 1.9998 12 1.9998C12.1313 1.9998 12.2614 2.0257 12.3827 2.07601C12.504 2.12632 12.6142 2.20006 12.707 2.293L18.707 8.293C18.8892 8.4816 18.9899 8.73421 18.9877 8.9964C18.9854 9.2586 18.8802 9.50941 18.6948 9.69482C18.5094 9.88023 18.2586 9.9854 17.9964 9.98768C17.7342 9.98995 17.4816 9.88916 17.293 9.707L12 4.414Z"
                        fill={
                          router.pathname == "/mortgage-rates"
                            ? "#ef6921"
                            : "#adadad"
                        }
                      />
                    </svg>
                  }
                >
                  Mortgage Rates
                </MenuItem>
              </Link>
              <Link passHref href="/Resources">
                <MenuItem
                  className={router.pathname == "/Resources" ? "active" : null}
                  icon={
                    <svg
                      width="19"
                      height="21"
                      viewBox="0 0 19 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4_24)">
                        <path
                          d="M8.9877 4.17392L14.5584 12.1223C14.8219 12.4849 15.0106 12.8964 15.1135 13.3327C15.2164 13.7691 15.2313 14.2215 15.1575 14.6637C15.0836 15.1058 14.9224 15.5288 14.6834 15.9081C14.4443 16.2873 14.1321 16.6151 13.765 16.8724C13.3979 17.1297 12.9832 17.3113 12.5452 17.4066C12.1072 17.5019 11.6545 17.5091 11.2137 17.4276C10.7729 17.3462 10.3527 17.1778 9.97766 16.9322C9.60262 16.6866 9.28023 16.3689 9.0293 15.9974L2.97417 7.35775C2.65296 6.89944 2.52696 6.33229 2.62391 5.78107C2.72086 5.22986 3.0328 4.73974 3.49112 4.41852C3.94944 4.09731 4.51659 3.97132 5.0678 4.06826C5.61901 4.16521 6.10914 4.47716 6.43035 4.93547L11.5166 12.1926C11.6451 12.376 11.6954 12.6028 11.6567 12.8233C11.6179 13.0438 11.4931 13.2398 11.3098 13.3683C11.1265 13.4968 10.8996 13.5472 10.6791 13.5084C10.4586 13.4696 10.2626 13.3449 10.1341 13.1615L5.53234 6.59562L4.49548 7.32231L9.09724 13.8882C9.41845 14.3465 9.90858 14.6585 10.4598 14.7554C11.011 14.8524 11.5782 14.7264 12.0365 14.4052C12.4948 14.084 12.8067 13.5938 12.9037 13.0426C13.0006 12.4914 12.8746 11.9243 12.5534 11.4659L7.46721 4.20879C7.21628 3.83731 6.89389 3.51953 6.51884 3.27397C6.14379 3.0284 5.7236 2.85999 5.28278 2.77854C4.84195 2.69709 4.38932 2.70424 3.95129 2.79957C3.51326 2.89491 3.0986 3.07651 2.7315 3.3338C2.36439 3.59108 2.0522 3.9189 1.81313 4.29811C1.57406 4.67733 1.4129 5.10036 1.33905 5.54252C1.2652 5.98468 1.28014 6.43712 1.383 6.87344C1.48585 7.30977 1.67457 7.72124 1.93814 8.08386L7.99326 16.7235C8.70774 17.7117 9.78237 18.3792 10.9849 18.5816C12.1875 18.784 13.4214 18.5052 14.4201 17.8053C15.4187 17.1054 16.1018 16.0407 16.3219 14.8412C16.5419 13.6417 16.2812 12.4039 15.596 11.3951L10.0254 3.44666L8.9877 4.17392Z"
                          fill={
                            router.pathname == "/Resources"
                              ? "#ef6921"
                              : "#adadad"
                          }
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_24">
                          <rect
                            width="18.254"
                            height="20.533"
                            fill={
                              router.pathname == "/Resources"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  }
                >
                  Resources
                </MenuItem>
              </Link>
              <Link passHref href="/MyFavourites">
                <MenuItem
                  icon={
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4_22)">
                        <path
                          d="M16.117 1.80299C15.7035 1.389 15.2125 1.06057 14.672 0.836489C14.1315 0.612408 13.5521 0.49707 12.967 0.49707C12.3819 0.49707 11.8025 0.612408 11.262 0.836489C10.7215 1.06057 10.2305 1.389 9.817 1.80299L8.959 2.66099L8.103 1.80299C7.68934 1.38933 7.19825 1.06119 6.65777 0.837319C6.11729 0.613446 5.53801 0.49822 4.953 0.49822C4.36799 0.49822 3.78871 0.613446 3.24823 0.837319C2.70776 1.06119 2.21667 1.38933 1.803 1.80299C1.38934 2.21666 1.0612 2.70775 0.837329 3.24822C0.613456 3.7887 0.49823 4.36798 0.49823 4.95299C0.49823 5.538 0.613456 6.11728 0.837329 6.65776C1.0612 7.19824 1.38934 7.68933 1.803 8.10299L2.661 8.96099L8.961 15.261L15.261 8.96099L16.119 8.10299C16.533 7.68951 16.8614 7.19848 17.0855 6.65798C17.3096 6.11748 17.4249 5.5381 17.4249 4.95299C17.4249 4.36788 17.3096 3.78851 17.0855 3.248C16.8614 2.7075 16.533 2.21647 16.119 1.80299H16.117Z"
                          stroke={
                            router.pathname == "/MyFavourites"
                              ? "#ef6921"
                              : "#adadad"
                          }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_22">
                          <rect
                            width="17.922"
                            height="15.759"
                            fill={
                              router.pathname == "/MyFavourites"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  }
                  className={
                    router.pathname == "/MyFavourites" ? "active" : null
                  }
                >
                  Favorite
                </MenuItem>
              </Link>
              <Link passHref href="/MyNotes">
                <MenuItem
                  icon={
                    <svg
                      width="19"
                      height="15"
                      viewBox="0 0 19 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4_28)">
                        <path
                          d="M18.25 5.475L12.775 0H1.825C1.34139 0.00131956 0.877956 0.19402 0.535988 0.535988C0.19402 0.877956 0.00131956 1.34139 0 1.825V12.784C0.0018529 13.2666 0.195011 13.7288 0.537121 14.0692C0.879232 14.4097 1.34237 14.6005 1.825 14.6L16.425 14.591C16.9076 14.5915 17.3708 14.4007 17.7129 14.0602C18.055 13.7198 18.2481 13.2576 18.25 12.775V5.475ZM11.863 1.369L16.882 6.388H11.863V1.369Z"
                          fill={
                            router.pathname == "/MyNotes"
                              ? "#ef6921"
                              : "#adadad"
                          }
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_28">
                          <rect
                            width="18.25"
                            height="14.6"
                            fill={
                              router.pathname == "/MyNotes"
                                ? "#ef6921"
                                : "#adadad"
                            }
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  }
                  className={router.pathname == "/MyNotes" ? "active" : null}
                >
                  My Notes
                </MenuItem>
              </Link>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem onClick={Logout} icon={<FiLogOut />}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};
export default Sidebar;
