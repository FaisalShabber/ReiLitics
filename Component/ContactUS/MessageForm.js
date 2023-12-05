import React, { useState } from "react";
import "react-phone-number-input/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { axiosInstance } from "../../pages/_app";

const MessageForm = (props) => {
  // const [value, setValue] = useState('')

  const onChangeRecaptcha = async (value) => {
    await axiosInstance
      .post("/users/verifyCaptcha", {
        token: value,
      })
      .then(() => {
        props.setRecaptchaisValid(true);
      })
      .catch(() => {
        props.setRecaptchaisValid(false);
      });
  };

  return (
    <>
      <div className="row form">
        <p className="fs-40 Gothic_3D Bold ml-4 ms-3">Send message</p>

        {}
        <form onSubmit={props.messagee}>
          <div className="row px-0 w-100 m-0">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group my-2">
                <input
                  type="text"
                  required
                  // autoComplete={false}
                  className="form-control"
                  value={props.user.firstName}
                  name="firstName"
                  id="firstName"
                  onChange={props.handleChange}
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group my-2">
                <input
                  type="text"
                  required
                  // autoComplete={false}
                  className="form-control"
                  name="lastName"
                  value={props.user.lastname}
                  id="lastName"
                  onChange={props.handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-group my-2 ">
              <input
                type="email"
                required
                // autoComplete={false}
                className="form-control"
                value={props.user.email}
                id="email"
                name="email"
                onChange={props.handleChange}
                placeholder="Email address"
              />
            </div>
            <div className="col-12">
              <div className="form-group my-2">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={props.user.subject}
                  id="subject"
                  name="subject"
                  onChange={props.handleChange}
                  placeholder="Subject"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group my-2">
                <textarea
                  type="text"
                  required
                  className="form-control"
                  rows={4}
                  name="message"
                  value={props.user.message}
                  id="message"
                  onChange={props.handleChange}
                  placeholder="Message"
                />
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col-lg-9 col-md-9 col-12">
              <h6 className="mb-0 fs-14 mt-2">
                Please check the box below to complete
              </h6>
              <div className="ps-0">
                <ReCAPTCHA
                  className="reCaphtcha"
                  sitekey="6Lf34JQjAAAAAHGmX3cwW_U9Aq1QumQXzXEGB2rX"
                  id="reCaptcha"
                  style={{ transform: "scale(0.7)", transformOrigin: "left" }}
                  onChange={onChangeRecaptcha}
                  name="reCaptcha"
                  value={props.state}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-2 col-3 my-auto">
              <button type="submit" className="btn fs-15 w-100 py-4 btnYelow">
                Send
              </button>
              <p className="text-success mt-3 fs-19">{props.success}</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MessageForm;
