import React, { useEffect } from "react";
import { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import Script from "next/script";
import EmailForm from "../../Component/ContactUS/EmailForm";
import Navbar from "../../Component/Navbar";
import Foter from "../../Component/Footer";
import MessageForm from "../../Component/ContactUS/MessageForm";
import HeadImage from "../../styles/UI/HeadImage";
import Acount from "../../Api/Acount";
import { toast } from "react-hot-toast";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const ContactUs = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recaptchaisValid, setRecaptchaisValid] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const SendMessage = (e) => {
    e.preventDefault();
    if (recaptchaisValid === false) {
      toast.error("Please verify that you are not a robot");
      return;
    }
    // nextStep();
    const res = Acount.Contact(user, setError);
    res
      .then((value) => {
        if (value.data.success) {
          setSuccess("Your Message has been sent successfully!");
          Router.push("/ContactSuc");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Head>
        <title>Contact Us - REI Litics</title>
      </Head>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Navbar />
          <HeadImage header="REACH OUT TO US" />
          <div className="pb-5">
            <div className="container" style={{ marginBottom: "15rem" }}>
              <p
                className="fs-40 Gothic_3D Bold mb-0"
                style={{ marginTop: "8rem" }}
              >
                Got a question or want to provide some feedback?
              </p>
              <p className="fs-18 mb-0">
                In an effort to continually improve REI LITICS, we love hearing
                from our members.
              </p>
              <div className="row">
                <div className="col-lg-8 col-md-8 col-12 my-5 px-5 py-3 card border_1 ">
                  <MessageForm
                    user={user}
                    handleChange={getUserData}
                    messagee={SendMessage}
                    success={success}
                    setRecaptchaisValid={setRecaptchaisValid}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12 my-5 px-5">
                  <EmailForm />
                </div>
              </div>
            </div>
            {success}
          </div>
        </div>
        <Foter />
      </div>
    </>
  );
};
export default ContactUs;
