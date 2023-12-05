//@ts-check
import React from "react";
import { Tooltip } from "react-tooltip";
import { CustomNumberInput } from "../custom-number-input";
import { Slider } from "rsuite";

const Expenses = ({ setFormData, handleChange, formData }) => {
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
        2. Expenses
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
              Annual Property Tax $:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is the annual property tax. Did you know some states have lower property tax than others? Property tax rates also vary from county to county."
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
            name="propertyTax"
            id="propertyTax"
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
            value={formData.propertyTax}
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
              Annual Insurance $:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is the annual homeowners insurance paid. Be sure to call around to get competitive rates."
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
            name="insurance"
            id="insurance"
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
            value={formData.insurance}
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
              Vacancy rate %:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="The vacancy rate represents the percentage of time rental income is lost due to a property being unoccupied during the year. National average is about 6%."
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
              name="vacancyRate"
              style={{
                width: "100%",
                maxWidth: "195px",
                padding: "20px 0",
              }}
              min={0}
              step={1}
              max={20}
              onChange={(value) =>
                setFormData({ ...formData, vacancyRate: value })
              }
              value={formData.vacancyRate}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomNumberInput
                name="vacancyRate"
                id="vacancyRate"
                placeholder="0"
                value={formData.vacancyRate}
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
                step={1}
                max={20}
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
              Repairs and maintenance %:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is the percentage of gross monthly rent that will go towards general property repair & maintenance. New properties may require less than older properties."
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
              name="repairsMaintenance"
              style={{
                width: "100%",
                maxWidth: "195px",
                padding: "20px 0",
              }}
              min={0}
              step={1}
              max={20}
              value={formData.repairsMaintenance}
              onChange={(value) =>
                setFormData({ ...formData, repairsMaintenance: value })
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomNumberInput
                name="repairsMaintenance"
                id="repairsMaintenance"
                placeholder="0"
                value={formData.repairsMaintenance}
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
                step={1}
                max={20}
                onChange={handleChange}
              />
            </div>
          </div>
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
              Management fees %:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is the percentage of gross monthly rent that will go towards a property management company if you choose to do so. General percentage charges are 8-12%."
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
              name="managementFees"
              style={{
                width: "100%",
                maxWidth: "195px",
                padding: "20px 0",
              }}
              value={formData.managementFees}
              min={0}
              step={1}
              max={30}
              onChange={(value) =>
                setFormData({ ...formData, managementFees: value })
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomNumberInput
                name="managementFees"
                id="managementFees"
                placeholder="0"
                value={formData.managementFees}
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
                step={1}
                max={30}
                onChange={handleChange}
              />
            </div>
          </div>
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
              Monthly Utilities:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="The monthly cost of services like electricity, gas, water, sewage, and trash removal."
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
            name="uLliLes"
            id="uLliLes"
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
            value={formData.uLliLes}
            onChange={handleChange}
          />
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
              Monthly HOA $:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="The monthly fee paid to a Homeowners Association."
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
            name="hoa"
            id="hoa"
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
            value={formData.hoa}
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
              Other Monthly Costs $:
            </span>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Any additional monthly costs related to the property."
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
            name="other"
            id="other"
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
            value={formData.other}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
