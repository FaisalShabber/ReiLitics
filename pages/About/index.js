import React, { useEffect } from "react";
import Head from "next/head";
import classes from "./AboutUs.module.css";
import Navbar from "../../Component/Navbar";
import HeadImage from "../../styles/UI/HeadImage";
import Foter from "../../Component/Footer";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import Link from "next/link";

const AboutUs = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  return (
    <>
      <Head>
        <title>About - REI Litics</title>
      </Head>
      <Navbar />
      <HeadImage header="ABOUT REI LITICS" />

      <div className={classes.about_container}>
        <p className={classes.heading}>
          No, we’re not your average Real Estate platform.
        </p>
        <p className={classes.first_p}>
          Think of us as a friend who’s excited to support you on your
          investment journey, starting with helping you find the best locations
          to invest in real estate.
        </p>
        <p className={classes.second_p}>
          Our vision is to make real estate investing attainable to all. We
          aspire to simplify every step of the investment journey to help you
          land your first, or second, or tenth residential investment property.
        </p>
        <Link href="/#Prices">
          <button
            style={{
              width: "212px",
              height: "53px",
              borderRadius: "78px",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
            className="no_brdr fs-15 btnYelow"
          >
            Start Exploring for Free
          </button>
        </Link>
      </div>

      <div>
        <div className={classes.second_block_container}>
          <div className={classes.second_block_content_container}>
            <p className={classes.second_block_content_p}>
              We get you because we were you. Frustrated and confused not
              knowing where to invest in real estate.
            </p>
            <br />
            <p className={classes.second_block_content_p}>
              We understand you’d rather spend time closing real estate deals
              and building your portfolio instead of trying to learn how to
              decode and make sense of all the information available online.
            </p>
            <br />
            <p className={classes.second_block_content_p}>
              We know there’s resources available for people who know where they
              want to invest. But what about people like us? The ones who are
              ambitious and ready to start or expand their real estate
              portfolio, but aren’t certain where the best and latest
              opportunities are.
            </p>
            <br />
            <p className={classes.second_block_content_p}>
              No one’s really supporting real estate entrepreneurs at the newer
              or expanding stages of their journey. So, we created REI Litics to
              serve you.
            </p>
          </div>
          <div className={classes.second_block_heading}>
            <p className={classes.second_block_heading_p}>
              SIMPLIFIED FOR BEGINNERS, APPROVED BY EXPERTS.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '5rem 5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src={"/bulb.png"}
            alt={"Vector"}
            className={classes.bulb}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p className={classes.make_decision}>MAKE SMARTER REAL ESTATE DECISIONS.</p>
        </div>
      </div>
      <Foter />
    </>
  );
};
export default AboutUs;
