//@ts-check
import React from "react";
import { Tooltip } from "react-tooltip";
import { CustomNumberInput } from "../custom-number-input";
import { Slider } from "rsuite";

const PurchaseInformation = ({ setFormData, handleChange, formData }) => {
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
        1. Purchase Information
      </h5>
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "16px",
          flexWrap: "wrap",
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
              Purchase Price $
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is the purchase price of the property. Feel free to play with different numbers to see how your offer will affect the cash flow."
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
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              !
            </a>
            <Tooltip id="my-tooltip" />
          </span>
          <input
            type="number"
            name="purchasePrice"
            id="purchasePrice"
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
            min={-0}
            value={formData.purchasePrice}
            onChange={handleChange}
          />
        </div>
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
              Closing costs $:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Average closing costs run between about 2% and 6% of the loan amount. For example: $300,000 home loan, you would pay from $6,000 to $18,000 in closing costs in addition to the down payment."
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
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              !
            </a>
            <Tooltip id="my-tooltip" />
          </span>
          <input
            type="number"
            name="closingCosts"
            id="closingCosts"
            placeholder="0"
            className=""
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
            min={0}
            step={0.1}
            onChange={handleChange}
            value={formData.closingCosts}
          />
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "305px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
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
              Down Payment %:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is a sum paid upfront when purchasing a home with a mortgage."
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
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              !
            </a>
            <Tooltip id="my-tooltip" />
          </span>
          <div
            style={{
              height: "53px",
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "space-between",
            }}
          >
            <Slider
              name="downPayment"
              style={{
                width: "100%",
                maxWidth: "195px",
                padding: "20px 0",
              }}
              value={formData.downPayment}
              min={0}
              max={100}
              step={1}
              onChange={(value) =>
                setFormData({ ...formData, downPayment: value })
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="number"
                name="downPayment"
                id="downPayment"
                placeholder="0"
                value={formData.downPayment > 0 && formData.downPayment}
                style={{
                  width: "100%",
                  maxWidth: "100px",
                  height: "53px",
                  background: "#FAFBFF",
                  border: "none",
                  padding: "0 18px",
                  marginTop: "8px",
                  fontSize: "18px",
                }}
                min={0}
                max={100}
                step={1}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "16px",
          flexWrap: "wrap",
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
              Interest Rate %:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is the interest rate paid on a mortgage. For an accurate rate, consult your lender. Be sure to call around to get competitive rates."
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
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              !
            </a>
            <Tooltip id="my-tooltip" />
          </span>
          <input
            type="number"
            name="interestRate"
            id="interestRate"
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
            onChange={handleChange}
            value={formData.interestRate}
          />
        </div>
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
              Points charged:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Mortgage points are fees paid directly to the lender in exchange for a reduced interest rate. Consult your lender or enter “0” if unknown."
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
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              !
            </a>
            <Tooltip id="my-tooltip" />
          </span>
          <input
            type="number"
            name="pointsCharged"
            id="pointsCharged"
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
            onChange={handleChange}
            value={formData.pointsCharged}
          />
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "305px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
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
              Loan Term (#Years):
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="The number of years it takes to fully repay the mortgage loan."
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
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              !
            </a>
            <Tooltip id="my-tooltip" />
          </span>
          <div
            style={{
              height: "53px",
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "space-between",
            }}
          >
            <Slider
              name="loanTerm"
              style={{
                width: "100%",
                maxWidth: "195px",
                padding: "20px 0",
              }}
              value={formData.loanTerm}
              min={5}
              step={1}
              max={30}
              onChange={(value) =>
                setFormData({ ...formData, loanTerm: value })
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="number"
                name="loanTerm"
                id="loanTerm"
                placeholder="0"
                value={formData.loanTerm}
                style={{
                  width: "100%",
                  maxWidth: "100px",
                  height: "53px",
                  background: "#FAFBFF",
                  border: "none",
                  padding: "0 18px",
                  marginTop: "8px",
                  fontSize: "18px",
                }}
                min={5}
                step={1}
                max={30}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInformation;
