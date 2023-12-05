//@ts-check
import React, { useState, useCallback, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { CustomNumberInput } from "../custom-number-input";

const Income = ({ handleChange, handleSubmit, formData }) => {
  return (
    <div
      style={{
        paddingBottom: "16px",
        borderBottom: "1px solid #E8ECFB",
      }}
    >
      <h5
        style={{
          fontSize: "20px",
          lineHeight: "24px",
          color: "#080C26",
          fontWeight: "600",
          marginTop: "20px",
        }}
      >
        3. Income
      </h5>
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "305px" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                lineHeight: "20px",
                color: "black",
                fontWeight: "400",
              }}
            >
              Gross Monthly Income $:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="The total monthly income from renting the property before."
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                border: "1px solid #EF6921",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#EF6921",
                color: "white",
              }}
            >
              !
            </a>
            <Tooltip id="my-tooltip" />
          </span>
          <CustomNumberInput
            name="grossMonthlyIncome"
            id="grossMonthlyIncome"
            placeholder="0"
            style={{
              width: "100%",
              maxWidth: "305px",
              height: "53px",
              background: "#FAFBFF",
              border: "none",
              padding: "0 18px",
              marginTop: "8px",
              fontSize: "18px",
            }}
            step={0.1}
            min={0}
            value={formData.grossMonthlyIncome}
            onChange={handleChange}
          />
        </div>
      </div>
      <div style={{ marginTop: "16px" }}>
          <button
            className="btn-hover"
            style={{
              width: "100%",
              maxWidth: "227px",
              height: "53px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EF6921",
              color: "black",
              fontSize: "18px",
              borderRadius: "90px",
            }}
            onClick={handleSubmit}
          >
            Calculate
          </button>
      </div>
    </div>
  );
};

export default Income;
