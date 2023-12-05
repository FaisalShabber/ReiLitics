import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import GetData from "../../Api/GetData";
import classes from "./Notifications.module.css";
import NotificationsContent from "../../Component/Notification/NotificationsContent";
import MaterialDesignSwitch from "../../Component/Toggle";
import Navbar from "../../Component/Navbar";
import Foter from "../../Component/Footer";
import withAuth from "../../Component/Auth";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

function Notifications() {
  const [online, setOnline] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [user, setUser] = useState("");

  const handleChange = () => {
    setOnline(!online);
  };

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
      //   console.log(user)
      getNotifications(JSON.parse(localStorage.getItem("user")).packageID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  const getNotifications = (id) => {
    const response = GetData.NotificationsData(id);
    response.then((value) => {
      if (value) {
        setNotificationData(value.data.reverseNotification);
      }

      //   setLoading(false);
    });
  };

  return (
    <>
      <Head>
        <title>Notifications - REI Litics</title>
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",

          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Navbar />
        <div
          className={`${classes.bg1} check`}
          style={{
            minHeight: "50vh",
            height: "100%",
          }}
        >
          <div
            className={`container-fluid m-0 py-md-5 py-sm-0 ${classes.notificationsDiv1}`}
          >
            <div className="container">
              <div
                className={`col-md-10 col-auto mx-auto my-md-5 my-sm-0${classes.notificationsDiv2}`}
              >
                <div className={`card px-0 py-0 mt-5 ${classes.cardShadow}`}>
                  <div className="d-inline-flex w-100 px-5">
                    <h2 className="m-4 me-auto fs-30 Gothic_3D greyBlack">
                      Notifications
                    </h2>
                    <div className="mt-4 me-3">
                      <MaterialDesignSwitch />
                    </div>
                  </div>
                  <div className="min-vh-50">
                    {notificationData.map((item) => {
                      return (
                        <NotificationsContent
                          key={item._id}
                          subject={item.subject}
                          description={item.description}
                        />
                      );
                    })}

                    {/* <NotificationsContent
                                          data={notificationData}
                                      /> */}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <Foter />
      </div>
    </>
  );
}
export default withAuth(Notifications);
