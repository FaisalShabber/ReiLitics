import React, { useState } from "react";
import "antd/dist/antd.css";
import OtpInput from "react-otp-input";

import { Modal } from "antd";

const OtpModal = (props) => {
  const [otp, setOtp] = useState("");

  const handleOk = (e) => {
    e.preventDefault();

    props.verifyOtp(otp);
  };

  const handleChange = (e) => {
    setOtp(e);
  };

  return (
    <Modal
      open={props.isModalVisible}
      className="modal-bg"
      onOk={handleOk}
      footer={false}
      onCancel={props.handleCancel}
      closable={props.closable}
    >
      <div className="otpcenter">
        <p className="fs-40 text-white text-center">{props.title}</p>
        <p className="text-white fs-13 text-center my-5">
          We've sent you a verification code on your registered email. Please
          check your email and enter the code to reset your password.
        </p>
        <form onSubmit={handleOk}>
          <OtpInput
            value={otp}
            className="otp-size"
            onChange={handleChange}
            numInputs={6}
          />
          <p className="text-danger mx-auto mt-3">{props.OtpError}</p>
          <div className="text-center mt-5">
            <p className="text-danger">{props.error}</p>
            <button
              className="btn btn-warning px-5 fs-15 btnYelow mx-auto py-3"
              type="submit"
            >
              Verify
            </button>
            <button
              onClick={props.Resend}
              className="btn btn-warning fs-15 px-5 ms-3 btnYelow mx-auto py-3"
              type="button"
            >
              Resend Code
            </button>
            <p className=" mt-2" style={{ color: "#ef6921" }}>
              {
                "Please check your inbox or your junk folder for the confirmation code"
              }
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default OtpModal;
