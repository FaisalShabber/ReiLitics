import React, { useState, useCallback, useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { MdDashboard, MdNote } from "react-icons/md";
import { BiCalculator, BiStats } from "react-icons/bi";
import { RiAttachment2 } from "react-icons/ri";
import { BsSuitHeart } from "react-icons/bs";
import { SlChart } from "react-icons/sl";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import classes from "./sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/future/image";
import clsx from "clsx";
import { IoAppsOutline } from "react-icons/io5";
import GetData from "../Api/GetData";

const SidebarDesktop = ({ user }) => {
  
  const router = useRouter();
  const [packageName, setPackageName] = useState("");

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const getUserProfileData = useCallback(async () => {
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  console.log("packageName => ", packageName);

  return (
    <div
      className="t-flex"
      style={{
        height: "calc(100vh - 136px)",
        background: "white",
        width: "100%",
        maxWidth: "275px",
        borderRadius: "20px",
        padding: "24px 0",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "40px",
        overflow: "auto",
      }}
    >
      <div>
        <div className={classes.img_container}>
          <Image
            width={68}
            height={68}
            alt="user-logo"
            src={user?.image || "/user-logo.svg"}
            className={classes.img_size}
          />
          <div>
            <h6 className={classes.title_h62}>
              {user?.firstName} {user?.lastName}
            </h6>
          </div>
        </div>
        <div className={classes.space_between_icon}>
          <div className={classes.space_between_icon}>
            <Link href={"/Dashboard"}>
              <span
                className={clsx(
                  classes.title_heading,
                  router.pathname === "/Dashboard" && classes.slected_icon
                )}
              >
                <MdDashboard className={classes.icon_size} />
                <span
                  className={clsx(
                    classes.title_h6,
                    router.pathname === "/Dashboard" && classes.selected_h6
                  )}
                >
                  Dashboard Overview
                </span>
              </span>
            </Link>
            <div className={classes.space_between_icon}>
              <Link href={"/Appreciation"}>
                <span
                  className={clsx(
                    classes.title_heading2,
                    router.pathname === "/Appreciation" && classes.slected_icon
                  )}
                >
                  <IoAppsOutline className={classes.icon_size} />
                  <span
                    className={clsx(
                      classes.title_h6,
                      router.pathname === "/Appreciation" && classes.selected_h6
                    )}
                  >
                    Market Appreciation
                  </span>
                </span>
              </Link>

              <Link href={"/RentalGrowth"}>
                <span
                  className={clsx(
                    classes.title_heading2,
                    router.pathname === "/RentalGrowth" && classes.slected_icon
                  )}
                >
                  <SlChart
                    className={classes.icon_size}
                  />
                  <div
                    className={clsx(
                      classes.title_h6,
                      router.pathname === "/RentalGrowth" && classes.selected_h6
                    )}
                  >
                    <span>
                      Rental Growth
                    </span>
                  </div>
                </span>
              </Link>

              <Link href={"/MarketStats/394913"}>
                <span
                  className={clsx(
                    classes.title_heading2,
                    (router.pathname.includes("MarketStats") ||
                      router.pathname.includes("EconomicStats") ||
                      router.pathname.includes("DemographicStats")) &&
                      classes.slected_icon
                  )}
                >
                  <BiStats className={classes.icon_size} />
                  <span
                    className={clsx(
                      classes.title_h6,
                      (router.pathname.includes("MarketStats") ||
                        router.pathname.includes("EconomicStats") ||
                        router.pathname.includes("DemographicStats")) &&
                        classes.selected_h6
                    )}
                  >
                    Detailed Statistics
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <Link href={"/mortgage-rates"}>
            <span
              className={clsx(
                classes.title_heading,
                router.pathname === "/mortgage-rates" && classes.slected_icon
              )}
            >
              <HiOutlineChevronUpDown
                className={classes.icon_size}
              />
              <div
                className={clsx(
                  classes.title_h6,
                  router.pathname === "/mortgage-rates" && classes.selected_h6
                )}
              >
                <span>
                  Mortgage Rates
                </span>
              </div>
            </span>
          </Link>
          <Link href={"/rental-calculator"}>
            <span
              className={clsx(
                classes.title_heading,
                router.pathname === "/rental-calculator" && classes.slected_icon
              )}
            >
              <BiCalculator className={classes.icon_size} />
              <span
                className={clsx(
                  classes.title_h6,
                  router.pathname === "/rental-calculator" &&
                    classes.selected_h6
                )}
              >
                Rental Calculator
              </span>
            </span>
          </Link>
          <Link href={"/Resources"}>
            <span
              className={clsx(
                classes.title_heading,
                router.pathname === "/Resources" && classes.slected_icon
              )}
            >
              <RiAttachment2
                className={classes.icon_size}
              />
              <div
                className={clsx(
                  classes.title_h6,
                  router.pathname === "/Resources" && classes.selected_h6
                )}
              >
                <span>
                  Resources
                </span>
              </div>
            </span>
          </Link>
          <Link href={"/MyFavourites"}>
            <span
              className={clsx(
                classes.title_heading,
                router.pathname === "/MyFavourites" && classes.slected_icon
              )}
            >
              <BsSuitHeart
                className={classes.icon_size}
              />
              <div
                className={clsx(
                  classes.title_h6,
                  router.pathname === "/MyFavourites" && classes.selected_h6
                )}
              >
                <span>
                  My Favorites
                </span>
              </div>
            </span>
          </Link>
          <Link href={"/MyNotes"}>
            <span
              className={clsx(
                classes.title_heading,
                router.pathname === "/MyNotes" && classes.slected_icon
              )}
            >
              <MdNote
                className={classes.icon_size}
              />
              <div
                className={clsx(
                  classes.title_h6,
                  router.pathname === "/MyNotes" && classes.selected_h6
                )}
              >
                <span>
                  My Notes
                </span>
              </div>
            </span>
          </Link>
        </div>
      </div>
      <div className={classes.title_heading} onClick={Logout}>
        <CiLogout className={classes.icon_size} />
        <span className={classes.title_h6}>Log Out</span>
      </div>
    </div>
  );
};

export default SidebarDesktop;
