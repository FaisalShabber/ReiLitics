import FeatureCard from "../../Component/FeatureCard";
import Head from "next/head";
import PriceCard from "../../Component/PriceCard";
import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import classes from "./Home.module.css";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import GetData from "../../Api/GetData";
import Image from "next/future/image";
import axiosNodeApi from "../../utils/axios";
import CustomModal from "../../Component/Modal";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const HomePage = () => {
  const [packageDetails, setPackageDetails] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [freePackageId, setFreePackageId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleClick = () => {
      const targetSection = document.getElementById("prices");
      targetSection.scrollIntoView({ behavior: "smooth" });
    };

    // const button = document.getElementById("navigate-button");
    // button.addEventListener("click", handleClick);

    return () => {
      // button.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const response = GetData.AllPackeges();

    response.then((value) => {
      if (value) {
        setData(
          value?.data?.packages.sort((a, b) => (a.name > b.name ? 1 : -1))
        );
      }
    });
  }, []);

  const getUserProfileData = useCallback(() => {
    try {
      const userToken = localStorage.getItem('token');

      if (userToken) {
        const response = GetData.UserProfilGet();

        response.then((value) => {
          setUserEmail(value?.data?.user.email);
          setPackageDetails(value?.data?.user?.packageID);
          const response2 = GetData.AllPackeges();
          if (value?.data?.user?.packageID === undefined) {

            // ASSING PACKAGE
            response2.then((value) => {
              if (value) {
                const pckg_id = value.data.packages.filter((pckg) => pckg.name === 'Free')[0]._id;
                setLoading(true);

                axiosNodeApi
                  .post(
                    "/payments/subscription",
                    {
                      email: value?.data?.user?.email,
                      package_id: pckg_id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.data.success) {
                      getUserProfileData();
                    } else {
                      message.error("Something went wrong!");
                    }
                  }).finally(() => {
                    handleCancel();
                    setLoading(false);
                  });
                setData(
                  value?.data?.packages.sort((a, b) => (a.name > b.name ? 1 : -1))
                );
              }
            });
          }
        });
      }
    } catch (err) {
      console.log(err)
    }
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const handleFreeSubscription = (freePkgId) => {
    if (userEmail) {
      setFreePackageId(freePkgId);
      showModal();
    } else {
      router.push("/SignUp");
    }
  };

  const freeSubscribe = () => {
    setLoading(true);

    axiosNodeApi
      .post(
        "/payments/subscription",
        {
          email: userEmail,
          package_id: freePackageId,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("You have successfully subscribed to the free plan!");
          getUserProfileData();
        } else {
          message.error("Something went wrong!");
        }
      }).finally(() => {
        handleCancel();
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Home Page - REI Litics</title>
      </Head>

      <div className={classes.mainn}>
        <div className={classes.layer}>
          <div className={`container`}>
            <div className="row" style={{ padding: "59px 0" }}>
              <div
                className="col-sm-12 col-lg-7 pb-5 pb-lg-0 padding-left-0"
                style={{ maxWidth: "600px", position: "relative", paddingLeft: '9rem' }}
              >
                <h1
                  className="home-real-h text-white Gothic_3D mb-0"
                  style={{
                    fontSize: "48px",
                    fontWeight: "700",
                    // paddingLeft: '4rem',
                    textTransform: 'uppercase'
                  }}
                >
                  Discover Profitable Investment Locations With Ease.
                </h1>
              </div>
              <div
                className={`col-lg-5 d-none d-lg-flex position-relative justify-content-end align-items-end ${classes.header_top_images}`}
              >
                <div className={classes.imac}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={"/header/image-2.png"}
                    alt={"imac"}
                    className={classes.header_imac}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <NewPassword /> */}
      </div>
      <div className="position-relative">
        <Image
          src={"/curved.png"}
          alt={"Vector"}
          layout="responsive"
          className="position-absolute bottom-0 objectCover"
          style={{ top: "-100px", width: "100%" }}
          width={100}
          height={110}
        />
      </div>
      <div className="container mt-5">
        <div
          className="row default-padding pt-0 text-center">
          <div
            className="col-sm-12 mt-5"
            style={{ textAlign: "center" }}
          >
            <div className={classes.simplifiedBeginner}>
              <p className="Gothic_3D mb-4" style={{ fontSize: '40px', lineHeight: '48.76px', fontWeight: '700' }}>
                SIMPLIFIED FOR BEGINNERS, APPROVED BY EXPERTS
              </p>
              <div className={classes.inner_description}>
                <p className="pb-4">
                  <span style={{ fontSize: '18px', fontWeight: '300', color: 'black' }}>To empower your residential real estate investment decisions, we've gathered all the essential information you need.</span> <strong style={{ fontSize: '18px' }}>Easily compare and track 450+ locations</strong> <span style={{ fontSize: '18px', color: 'black' }}> across the U.S. in just minutes to find the best places to invest.</span>
                </p>
                <p className={classes.first_step_before}>
                  Think of us as your first step before Zillow.
                </p>
              </div>
            </div>
            <div>
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
          </div>
        </div>
      </div>
      <div className={classes.chatbot_container}>
        <div>
          <img
            src={"/chatbot.gif"}
            alt={"Vector"}
            className={classes.chatbot}
          />
        </div>
        <div className={classes.chatbot_inner_container}>
          <div>
            <p className={classes.chatbot_inner_heading}>
              DON’T KNOW WHERE TO INVEST?
            </p>
            <p style={{ fontSize: '18px', color: 'black' }}>
              We’ve got you covered. Answer five simple questions, and we’ll provide you with personalized location suggestions.
            </p>
            <p className={classes.chatbot_inner_heading_2}>
              Kickstart your investment journey in less than 1 minute.
            </p>
          </div>
        </div>
      </div>
      <div className={classes.mainn2}>
        <div className={classes.layer2}>
          <div className={classes.research_time_container}>
            <div className={classes.research_time_inner_container}>
              <div>
                <p className={classes.research_time_inner_container_heading}>
                  REDUCE RESEARCH TIME BY UP TO 87%
                </p>
                <p style={{ fontSize: '18px', color: 'black' }}>
                  Instantly compare key market indicators such as:
                </p>
                <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Appreciation rates</span>
                <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Rental growth</span>
                <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Average property values</span>
                <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Average rental rates</span>
                <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Average state property tax</span>
                <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> State landlord friendliness</span>
                <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Estimated population</span>
              </div>
            </div>
            <div className="research_time_graph_container">
              <img
                src={"/home-graph.png"}
                alt={"Vector"}
                className={classes.research_time_graph}
              />
            </div>
          </div>
        </div>
        {/* <NewPassword /> */}
      </div>
      <div className="position-relative">
        <Image
          src={"/curved-2.png"}
          alt={"Vector"}
          layout="responsive"
          className="position-absolute bottom-0 objectCover"
          style={{ top: "-100px", width: "100%" }}
          width={100}
          height={110}
        />
      </div>
      <div className="research_time_graph_2_container">
        <div className={classes.research_time_graph_2}>
          <div>
            <img
              src={"/home-graph-2.png"}
              alt={"Vector"}
              className={classes.research_time_graph}
            />
          </div>
          <div className={classes.research_time_graph_2_heading_container}>
            <div>
              <p className={classes.research_time_graph_2_heading}>
                SIMPLIFIED MARKET TRENDS
              </p>
              <p style={{ fontSize: '18px', color: 'black' }}>
                We convert complicated data into straightforward visuals, helping you track up-to-date real estate trends such as:
              </p>
              <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Appreciation rates</span>
              <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Rental growth</span>
              <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Average property values</span>
              <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Average rental rates</span>
              <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Average state property tax</span>
              <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> State landlord friendliness</span>
              <span style={{ fontSize: '18px', display: 'block', color: 'black' }}><FontAwesomeIcon icon={faCheckCircle} color="#EF6921" style={{ marginRight: '1rem', marginBottom: '-1px' }} /> Estimated population</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.features_section}>
        <div className="container">
          <div className="row default-padding">
            <div className="row mt-3">
              <FeatureCard />
              <div style={{ marginTop: '3rem', textAlign: 'center', color: '#FFFFFF' }}>
                <p style={{ fontWeight: '700', fontSize: '40px', lineHeight: '48.76px' }}>MAKE SMARTER REAL ESTATE DECISIONS.</p>
                <Link href="/#Prices">
                  <button
                    style={{
                      width: "212px",
                      height: "53px",
                      borderRadius: "78px",
                      marginBottom: "2rem",
                    }}
                    className="no_brdr fs-15 btnYelow"
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ textAlign: 'center' }}>
          <p className={classes.testimonial_heading}>WHAT USERS ARE SAYING</p>
        </div>
        <div className={classes.testimonial_users_container}>
          <div className={classes.testimonial_users_item}>
            <Image
              src={"/user-review-1.jpeg"}
              alt={"Vector"}
              layout="responsive"
              width={70}
              height={75}
              style={{ borderRadius: '50%', marginBottom: '2rem' }}
            />
            <p style={{ fontSize: '16px', color: 'black' }}>When I tested this product I knew immediately that it would cut the market analysis time by 80%, easily. The ability to compare markets, and search by things like rent growth is invaluable. </p>
            <p style={{ fontSize: '16px', color: 'black' }}><strong>ANSON YOUNG</strong></p>
          </div>
          <div className={classes.testimonial_users_item}>
            <Image
              src={"/user-review-2.jpeg"}
              alt={"Vector"}
              layout="responsive"
              width={70}
              height={75}
              style={{ borderRadius: '50%', marginBottom: '2rem' }}
            />
            <p style={{ fontSize: '16px', color: 'black' }}>Truly an invaluable app focused on user education, which to me, is most important when looking for data driven investments for my family's future. REI Litics has opened up investment opportunities that I wouldn't have known existed. A must have! </p>
            <p style={{ fontSize: '16px', color: 'black' }}><strong>BERNIE LAYTON</strong></p>
          </div>
          <div className={classes.testimonial_users_item}>
            <Image
              src={"/user-review-3.jpeg"}
              alt={"Vector"}
              layout="responsive"
              width={70}
              height={75}
              style={{ borderRadius: '50%', marginBottom: '2rem' }}
            />
            <p style={{ fontSize: '16px', color: 'black' }}>The amount of time that would be needed to compile this information into the super clean view REI Litics provides is eye watering. I will definitely be using this for my real estate investment decisions going forward. </p>
            <p style={{ fontSize: '16px', color: 'black' }}><strong>PETE BIGIT</strong></p>
          </div>
          <div className={classes.testimonial_users_item}>
            <Image
              src={"/user-review-4.jpeg"}
              alt={"Vector"}
              layout="responsive"
              width={70}
              height={75}
              style={{ borderRadius: '50%', marginBottom: '2rem' }}
              muted={true}
            />
            <p style={{ fontSize: '16px', color: 'black' }}>I appreciate the website’s clean and straightforward interface, which does not overwhelm with data. It’s refreshing to use a platform that values simplicity and clarity, making real estate investment decisions more efficient and effective. </p>
            <p style={{ fontSize: '16px', color: 'black' }}><strong>AMEY AVHAD</strong></p>
          </div>
        </div>
      </div>
      <div className={classes.bg_theme}>
        <div id="Prices" className="container mt-3 position-relative">
          <div className="row default-padding-prices" id="prices">
            <PriceCard
              data={data}
              userPackageId={packageDetails?._id}
              handleFreeSubscription={handleFreeSubscription}
              userEmail={userEmail}
            />
          </div>
        </div>
      </div>
      <CustomModal
        title="Succefull"
        isModalVisible={isModalVisible}
        handleOk={() => alert("call api")}
        closable={true}
      >
        <div className="p-5">
          <p className="fs-22 text-white text-center p-5">
            Are you sure you want to subscribe to the free plan?
          </p>
          <div className="text-center">
            <button
              className="btn login-button fs-14 px-5"
              style={{ marginRight: "1rem" }}
              onClick={() => handleCancel()}
            >
              No
            </button>
            <button
              className="btn login-button fs-14 px-5"
              onClick={freeSubscribe}
            >
              {loading ? "Loading..." : "Yes"}
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default HomePage;
