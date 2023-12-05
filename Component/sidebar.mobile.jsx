import React from "react";
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

const SidebarMobile = ({ user }) => {
  const router = useRouter();

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div
      className="t-flex"
      style={{
        height: "calc(100vh - 136px)",
        background: "white",
        width: "100%",
        maxWidth: "60px",
        borderRadius: "10px",
        padding: "24px 0",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "40px",
        overflow: "auto",
      }}
    >
      <div>
        <div className={classes.img_containerSmall}>
          <Image
            width={40}
            height={40}
            alt="user-logo"
            src={user?.image || "/user-logo.svg"}
            className={classes.img_sizeSmall}
          />
          {/* <div>
            <h6 className={classes.title_h62}>
              {user?.firstName} {user?.lastName}
            </h6>
            <h6 className={classes.title_h63}>{user?.email}</h6>
          </div> */}
        </div>
        <div className={clsx(classes.space_between_icon, "t-items-center")}>
          <div className={clsx(classes.space_between_icon, "t-items-center")}>
            <Link href={"/Dashboard"}>
              <span
                title="Dashboard"
                className={clsx(
                  classes.title_headingSmall,
                  router.pathname === "/Dashboard" && classes.slected_icon
                )}
              >
                <MdDashboard className={classes.icon_size} />
              </span>
            </Link>
            <div className={classes.space_between_icon}>
              <Link href={"/Appreciation"}>
                <span
                  title="Appreciation"
                  className={clsx(
                    classes.title_headingSmall,
                    router.pathname === "/Appreciation" && classes.slected_icon
                  )}
                >
                  <IoAppsOutline className={classes.icon_size} />
                </span>
              </Link>
              <Link href={"/RentalGrowth"}>
                <span
                  title="Rental Growth"
                  className={clsx(
                    classes.title_headingSmall,
                    router.pathname === "/RentalGrowth" && classes.slected_icon
                  )}
                >
                  <SlChart className={classes.icon_size} />
                </span>
              </Link>
              <Link href={"/MarketStats/394913"}>
                <span
                  title="Market Stats"
                  className={clsx(
                    classes.title_headingSmall,
                    (router.pathname.includes("MarketStats") ||
                      router.pathname.includes("EconomicStats") ||
                      router.pathname.includes("DemographicStats") ||
                      router.pathname.includes("Notes")) &&
                      classes.slected_icon
                  )}
                >
                  <BiStats className={classes.icon_size} />
                </span>
              </Link>
            </div>
          </div>
          <Link href={"/mortgage-rates"}>
            <span
              title="Mortgage Rates"
              className={clsx(
                classes.title_headingSmall,
                router.pathname === "/mortgage-rates" && classes.slected_icon
              )}
            >
              <HiOutlineChevronUpDown className={classes.icon_size} />
            </span>
          </Link>
          <Link href={"/rental-calculator"}>
            <span
              title="rental-calculator"
              className={clsx(
                classes.title_headingSmall,
                router.pathname === "/rental-calculator" && classes.slected_icon
              )}
            >
              <BiCalculator className={classes.icon_size} />
            </span>
          </Link>
          <Link href={"/Resources"}>
            <span
              title="Resources"
              className={clsx(
                classes.title_headingSmall,
                router.pathname === "/Resources" && classes.slected_icon
              )}
            >
              <RiAttachment2 className={classes.icon_size} />
            </span>
          </Link>
          <Link href={"/MyFavourites"}>
            <span
              title="My Favourites"
              className={clsx(
                classes.title_headingSmall,
                router.pathname === "/MyFavourites" && classes.slected_icon
              )}
            >
              <BsSuitHeart className={classes.icon_size} />
            </span>
          </Link>
          <Link href={"/MyNotes"}>
            <span
              title="My Notes"
              className={clsx(
                classes.title_headingSmall,
                router.pathname === "/MyNotes" && classes.slected_icon
              )}
            >
              <MdNote className={classes.icon_size} />
            </span>
          </Link>
        </div>
      </div>
      <div
        className={classes.title_headingSmall}
        onClick={Logout}
        title="Log Out"
      >
        <CiLogout className={classes.icon_size} />
      </div>
    </div>
  );
};

export default SidebarMobile;
