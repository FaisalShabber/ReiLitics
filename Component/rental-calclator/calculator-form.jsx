import React, { useState, useEffect, useCallback } from "react";
import PurchaseInformation from "./purchase-information";
import Expenses from "./expenses";
import Income from "./income";
import { toast } from "react-hot-toast";
import Results from "./results";
import GetData from "../../Api/GetData";

const CalculatorForm = ({ userData, setSuccessModel }) => {

  const [packageName, setPackageName] = useState("");

  const getUserProfileData = useCallback(async () => {
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const [formData, setFormData] = useState({
    purchasePrice: "",
    closingCosts: "",
    downPayment: 20,
    interestRate: "",
    pointsCharged: "",
    loanTerm: 30,
    propertyTax: "",
    insurance: "",
    vacancyRate: 6,
    repairsMaintenance: 8,
    managementFees: "",
    uLliLes: "",
    hoa: "",
    other: "",
    grossMonthlyIncome: "",
  });
  const [results, setResults] = useState({
    monthlyMortgagePayment: 0,
    totalMonthlyExpenses: 0,
    cashFlow: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (packageName === "Free" || packageName === "" || packageName === undefined) {
      setSuccessModel(true);
      return;
    }
    if (formData.purchasePrice === "") {
      toast.error("Please enter a purchase price");
      return;
    }
    if (formData.closingCosts === "") {
      toast.error("Please enter closing costs");
      return;
    }
    if (formData.downPayment === "") {
      toast.error("Please enter a down payment");
      return;
    }
    if (formData.interestRate === "") {
      toast.error("Please enter an interest rate");
      return;
    }
    if (formData.pointsCharged === "") {
      toast.error("Please enter points charged");
      return;
    }
    if (formData.loanTerm === "") {
      toast.error("Please enter a loan term");
      return;
    }
    if (formData.propertyTax === "") {
      toast.error("Please enter property tax");
      return;
    }
    if (formData.insurance === "") {
      toast.error("Please enter insurance");
      return;
    }
    if (formData.vacancyRate === "") {
      toast.error("Please enter a vacancy rate");
      return;
    }
    if (formData.repairsMaintenance === "") {
      toast.error("Please enter repairs and maintenance");
      return;
    }
    if (formData.managementFees === "") {
      toast.error("Please enter management fees");
      return;
    }
    if (formData.uLliLes === "") {
      toast.error("Please enter utilities");
      return;
    }
    if (formData.hoa === "") {
      toast.error("Please enter HOA");
      return;
    }
    if (formData.other === "") {
      toast.error("Please enter other");
      return;
    }
    if (formData.grossMonthlyIncome === "") {
      toast.error("Please enter gross monthly income");
      return;
    }
    // handleVerify(formData);
    // console.log(handleVerify(formData));
    // Perform your calculaLons here
    const downPayment = formData.purchasePrice * (formData.downPayment / 100);
    const loanAmount = formData.purchasePrice - downPayment;
    const monthlyInterestRate =
      (formData.interestRate / 100 + formData.pointsCharged / 100) / 12;
    const numberOfPayments = formData.loanTerm * 12;
    const monthlyMortgagePayment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const totalMonthlyExpenses =
      formData.propertyTax / 12 +
      formData.insurance / 12 +
      (formData.vacancyRate / 100) * formData.grossMonthlyIncome +
      (formData.repairsMaintenance / 100) * formData.grossMonthlyIncome +
      (formData.managementFees / 100) * formData.grossMonthlyIncome +
      formData.uLliLes +
      formData.hoa +
      formData.other;
    const cashFlow =
      formData.grossMonthlyIncome -
      monthlyMortgagePayment -
      totalMonthlyExpenses;
    setResults({ monthlyMortgagePayment, totalMonthlyExpenses, cashFlow });
  };

  const handleVerify = (formData) => {
    if (formData.purchasePrice === "") {
      toast.error("Please enter a purchase price");
      return;
    }
    if (formData.closingCosts === "") {
      toast.error("Please enter closing costs");
      return;
    }
    if (formData.downPayment === "") {
      toast.error("Please enter a down payment");
      return;
    }
    if (formData.interestRate === "") {
      toast.error("Please enter an interest rate");
      return;
    }
    if (formData.pointsCharged === "") {
      toast.error("Please enter points charged");
      return;
    }
    if (formData.loanTerm === "") {
      toast.error("Please enter a loan term");
      return;
    }
    if (formData.propertyTax === "") {
      toast.error("Please enter property tax");
      return;
    }
    if (formData.insurance === "") {
      toast.error("Please enter insurance");
      return;
    }
    if (formData.vacancyRate === "") {
      toast.error("Please enter a vacancy rate");
      return;
    }
    if (formData.repairsMaintenance === "") {
      toast.error("Please enter repairs and maintenance");
      return;
    }
    if (formData.managementFees === "") {
      toast.error("Please enter management fees");
      return;
    }
    if (formData.uLliLes === "") {
      toast.error("Please enter utilities");
      return;
    }
    if (formData.hoa === "") {
      toast.error("Please enter HOA");
      return;
    }
    if (formData.other === "") {
      toast.error("Please enter other");
      return;
    }
    if (formData.grossMonthlyIncome === "") {
      toast.error("Please enter gross monthly income");
      return;
    }
  };

  return (
    <div>
      <PurchaseInformation
        setFormData={setFormData}
        formData={formData}
        handleChange={handleChange}
      />
      <Expenses
        setFormData={setFormData}
        formData={formData}
        handleChange={handleChange}
      />
      <Income
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
      <Results results={results} />
      <p
        style={{
          fontSize: "14px",
          color: "#6c757d",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        The calculator provided by REI Litics is for informational and
        educational purposes only. We recommend consulting a real estate
        professional before making investment decisions. Results may not reflect
        actual returns. REI Litics is not liable for any consequences or errors
        in the information provided. Verify property details independently.
      </p>
    </div>
  );
};

export default CalculatorForm;
