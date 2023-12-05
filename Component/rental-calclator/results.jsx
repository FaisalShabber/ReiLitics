import React from "react";

const Results = ({ results }) => {
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
        Results
      </h5>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "20px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "130px",
            height: "auto",
            maxWidth: "240px",
            background: "#F7D680",
            borderRadius: "12px",
            padding: "12px 20px",
            color: "#080C26",
            fontSize: "15px",
            lineHeight: "18.29px",
            fontWeight: "600",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            justifyContent: "center",
          }}
        >
          <span>Monthly Mortgage Payments: </span>
          <span
            style={{
              fontSize: "28px",
              lineHeight: "34.13px",
              fontWeight: "600",
              wordBreak: "break-word",
            }}
          >
            $
            {results.monthlyMortgagePayment &&
              results.monthlyMortgagePayment.toFixed(2).toLocaleString()}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            minHeight: "130px",
            height: "auto",
            maxWidth: "240px",
            background: "#A1E9C4",
            borderRadius: "12px",
            padding: "12px 20px",
            color: "#080C26",
            fontSize: "15px",
            lineHeight: "18.29px",
            fontWeight: "600",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            justifyContent: "center",
          }}
        >
          <span>Total Monthly Expenses: </span>
          <span
            style={{
              fontSize: "28px",
              lineHeight: "34.13px",
              fontWeight: "600",
              wordBreak: "break-word",
            }}
          >
            $
            {results.totalMonthlyExpenses &&
            typeof results.totalMonthlyExpenses === "string"
              ? Number(results.totalMonthlyExpenses)
                  .toFixed(2)
                  .toLocaleString()
              : results.totalMonthlyExpenses.toFixed(2).toLocaleString()}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            minHeight: "130px",
            height: "auto",
            maxWidth: "240px",
            background: "#5FB6E9",
            borderRadius: "12px",
            padding: "12px 20px",
            color: "#080C26",
            fontSize: "15px",
            lineHeight: "18.29px",
            fontWeight: "600",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            justifyContent: "center",
          }}
        >
          <span>Monthly Cash Flow: </span>
          <span
            style={{
              fontSize: "28px",
              lineHeight: "34.13px",
              fontWeight: "600",
              wordBreak: "break-word",
            }}
          >
            ${results.cashFlow && results.cashFlow.toFixed(2).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Results;
