import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

const FinishModal = (props) => {
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
      <button
        className="btn btnYelow btn_width p-4 text-center"
        type="primary"
        onClick={showModal}
      >
        Finish and pay
      </button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="p-5">
          <p className="text-white text-center fs-21">
            Your Purchase has been completed Enjoy your membership
          </p>
          <div className="d-grid gap-2">
            <button className="btn button-color" type="button">
              View Dashboard
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default FinishModal;
