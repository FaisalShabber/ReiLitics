import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import classes from "./second.navbar.module.css";
import Image from "next/future/image";
import GetData from "../Api/GetData";

export default function SecondNav() {
  const router = useRouter();
  const eventId = router.query.id;

  return (
    <div className="">
      <div className={classes.main_container}>
        <Link href={`/MarketStats/${eventId}`} className="dropdown-item">
          <div
            style={{ paddingBottom: "8px" }}
            className={clsx(
              router.pathname.includes("MarketStats") &&
                classes.button_market_div
            )}
          >
            <button
              className={clsx(
                classes.button_container,
                router.pathname.includes("MarketStats")
                  ? classes.button_market_active
                  : classes.button_market_notactive
              )}
            >
              <span style={{ placeSelf: "baseline" }}>Market</span>
              <Image
                src={
                  router.pathname.includes("MarketStats")
                    ? "/home.icon.white.svg"
                    : "/home.icon.svg"
                }
                alt="arrow"
                width={48}
                height={48}
                className={classes.image_icon}
              />
            </button>
          </div>
        </Link>
        <Link
          href={`/EconomicStats/${eventId}`}
          className="dropdown-item"
        >
          <div
            className={clsx(
              router.pathname.includes("EconomicStats") &&
                classes.button_economic_div
            )}
            style={{ paddingBottom: "8px" }}
          >
            <div
              className={clsx(
                classes.button_container,
                router.pathname.includes("EconomicStats")
                  ? classes.button_economic_active
                  : classes.button_economic_notactive
              )}
            >
              <span style={{ placeSelf: "baseline" }}>Economic</span>
              <Image
                src={
                  router.pathname.includes("EconomicStats")
                    ? "/economic.icon.dark.svg"
                    : "/economic.icon.svg"
                }
                alt="arrow"
                width={48}
                height={48}
                className={classes.image_icon}
              />
            </div>
          </div>
        </Link>
        <Link
          href={`/DemographicStats/${eventId}`}
          className="dropdown-item"
        >
          <div
            className={clsx(
              router.pathname.includes("DemographicStats") &&
                classes.button_demographic_div
            )}
            style={{ paddingBottom: "8px" }}
          >
            <div
              className={clsx(
                classes.button_container,
                router.pathname.includes("DemographicStats")
                  ? classes.button_demographic_active
                  : classes.button_demographic_notactive
              )}
            >
              <span style={{ placeSelf: "baseline" }}>Demographic</span>
              <Image
                src={
                  router.pathname.includes("DemographicStats")
                    ? "/demographic.icon.white.svg"
                    : "/demographic.icon.svg"
                }
                alt="arrow"
                width={48}
                height={48}
                className={classes.image_icon}
              />
            </div>
          </div>
        </Link>
        <Link
          href={`/Notes/${eventId}`}
          className="dropdown-item"
        >
          <div
            className={clsx(
              router.pathname.includes("Notes") && classes.button_notes_div
            )}
            style={{ paddingBottom: "8px" }}
          >
            <div
              className={clsx(
                classes.button_container,
                router.pathname.includes("Notes")
                  ? classes.button_notes_active
                  : classes.button_notes_notactive
              )}
            >
              <span style={{ placeSelf: "baseline" }}>Notes</span>
              <Image
                src={
                  router.pathname.includes("Notes")
                    ? "/notes.icon.white.svg"
                    : "/notes.icon.svg"
                }
                alt="arrow"
                width={48}
                height={48}
                className={classes.image_icon}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
