import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

const PrivacyModal = (props) => {
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

  return (
    <>
      <a className="orangetxt" type="primary" onClick={showModal}>
        Privacy Policy
      </a>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
};
export default PrivacyModal;
