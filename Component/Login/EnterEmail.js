import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleOk = (e) => {
    setError(false);
    if (email) {
      e.preventDefault();
      props.resetPasword(email);
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Modal
      visible={props.isModalVisible}
      onOk={handleOk}
      className="modal-bg"
      onCancel={props.handleCancel}
      footer={false}
      closable={props.closable}
    >
      <p className="fs-25 text-white">
        Enter your Email to get verifcation code
      </p>
      <div>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={handleChange}
        />
        {error && <div className="text-danger">Please write Your email</div>}
        <div className="text-center mt-3">
          <button
            className="btn p-3 px-5 fs-22 email-buuton"
            onClick={handleOk}
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default LoginModal;
