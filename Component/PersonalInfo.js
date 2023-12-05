import React from "react";

const PersonalInfo = (props) => {
  // const stepOne = e => {
  //     props.values(1)

  // }

  return (
    <div className="container">
      <div className="row ms-1 mb-5">
        <div
          onClick={props.nextStep}
          className="d-flex justify-content-center mt-3"
        >
          <div>
            <div
              onClick={() => {
                props.values >= 1 && props.handleStep(1);
              }}
              className={props.values == 1 ? " pink-color" : " gray-color"}
            ></div>
          </div>
          <div>
            <div
              onClick={() => {
                props.values >= 2 && props.handleStep(2);
              }}
              className={
                props.values == 2 ? " pink-color ms-3" : " ms-3 gray-color"
              }
            ></div>
          </div>

          <div>
            <div
              onClick={() => {
                props.values >= 3 && props.handleStep(3);
              }}
              className={
                props.values == 3 ? " pink-color ms-3" : " ms-3 gray-color"
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
