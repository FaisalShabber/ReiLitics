import { PayPalButton } from "react-paypal-button-v2";
import React, { useState, useEffect } from "react";
import GetData from "../Api/GetData";
import Link from "next/link";
import Acount from "../Api/Acount";
import CustomModal from "./Modal";
import { axiosInstance } from "../pages/_app";
import PersonalInfo from "./PersonalInfo";
import Navbar from "./Navbar";
import OtpModal from "./Login/Otp";
import { useRouter } from "next/router";
import classes from "./new.Navbar.module.css";
import { toast } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import Stripe from "stripe";
import axiosNodeApi from "../utils/axios";
import clsx from "clsx";
import { useFormik } from "formik";
import paymentMethodClasses from "./EditProfile.module.css";
import * as Yup from "yup";
import { LoadingOutlined } from "@ant-design/icons";
import styled from './payment.module.css'
export const stripe = new Stripe(
  "sk_test_51Mw2BLFvfpbJnXSJUkI3g6z4NM90CBMvDpmp9p9xryx5EUbHQlPcRg097Eb9IZ9Rj8IJpuK68tbIKB7JiankVe8Z00f3xw37wE"
);

const Payment = ({
  nextStep,
  values,
  custom = false,
  token,
  packageId,
  couponList,
  inSignUp,
}) => {
  const Router = useRouter();
  const routerId = Router.query.id;
  const signUp = Router.query.signUp;

  const [clientId, setClientId] = useState("");
  const [succesModel, setSuccesModel] = useState(false);
  // const [/* success */ setSuccess] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpModal, setotpModal] = useState(false);
  const [reset, setReset] = useState("");
  const [OtpError, setOtpError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCVC] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [packageIDLocal, setPackageIDLocal] = useState(null);
  const [calculatePrice, setCalculatePrice] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDefault, setLoadingDefault] = useState(false);
  const [defaultId, setDefaultId] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);

  const [packageDetails, setPackageDetails] = useState(null);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    const response = GetData.GetMerchantId();
    response.then((value) => {
      setClientId(value.data.clientID);
    });

    const packageId = routerId
      ? routerId
      : packageId
      ? packageId
      : localStorage.getItem("pkgId");

    const response2 = GetData.SinglePackage(packageId);

    response2.then((value) => {
      if (value) {
        setPackageDetails(value.data.packageFound);
      }
    });
  }, []);

  const getPaymentMethods = async () => {
    try {
      const response = await axiosNodeApi.get("/payments/get_payment_method", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setPaymentMethods(response?.data?.paymentMethods || []);
    } catch (err) {
      if (err.response.data.message === "Not authorized, token failed") {
        window.location.href = "/SignUp";
      } else {
        setPaymentMethods([]);
      }
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  useEffect(() => {
    if (values?.price == 0 && !custom) {
      SignUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.price]);

  const SignUp = () => {
    let formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.familyName);
    formData.append("country", values.country);
    formData.append("state", values.state);
    formData.append("DOB", values.DOB);
    formData.append("phone", values.phone);
    formData.append("region", values.region);
    formData.append("image", values.sendImage);
    formData.append("packageID", values.pkgId);
    formData.append("email", values.email);
    formData.append("password", values.password);

    axiosInstance
      .post("/users", formData)
      .then(() => {
        setotpModal(true);
      })
      .catch((error) => {
        setErrorModal(true);
        setErrorMessage(error?.response?.data?.message);
      });
  };

  const verifyOtp = (otp) => {
    setReset("");
    const res = Acount.verifyOtp(values.email, otp, setOtpError);
    res
      .then((value) => {
        if (value.data.success) {
          setSuccesModel(true);
        }
      })
      .catch((err) => {});
  };
  const ResendOtp = () => {
    const res = Acount.EnterEmail(values.email);
    res
      .then((value) => {
        setReset(value.data.message);
      })
      .catch((err) => {});
  };

  const handleCardNumberChange = (event) => {
    const input = event.target.value;
    const formattedInput = input.replace(/\D/g, "").substring(0, 16);
    const parts = [];

    for (let i = 0; i < formattedInput.length; i += 4) {
      parts.push(formattedInput.substring(i, i + 4));
    }

    setCardNumber(parts.join(" "));
  };

  const handleExpMonthChange = (event) => {
    const input = event.target.value;
    const formattedInput = input.replace(/\D/g, "").substring(0, 2);

    setExpMonth(formattedInput);
  };

  const handleExpYearChange = (event) => {
    const input = event.target.value;
    const formattedInput = input.replace(/\D/g, "").substring(0, 4);

    setExpYear(formattedInput);
  };

  const handleCVCChange = (event) => {
    const input = event.target.value;
    const formattedInput = input.replace(/\D/g, "").substring(0, 3);

    setCVC(formattedInput);
  };

  const stripeHandler = async (event) => {
    setCouponLoading(true);
    event.preventDefault();
    if (!cardNumber || !expMonth || !expYear || !cvc || !cardName) {
      toast.error("Please fill all fields");
      setCouponLoading(false);
      return;
    }

    try {
      const cardDetails = {
        number: cardNumber.trim().replace(/\s/g, ""),
        exp_month: parseInt(expMonth),
        exp_year: parseInt(expYear),
        cvc: cvc,
        name: cardName,
      };

      const response = await stripe.tokens.create({
        card: cardDetails,
      });

      const packageId = routerId
        ? routerId
        : packageId
        ? packageId
        : localStorage.getItem("pkgId");

      // return;
      axiosNodeApi
        .post(
          "/payments/subscription",
          {
            package_id: packageId,
            card_token: response.id,
            coupon_code: coupon ? coupon : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((value) => {
          setSuccesModel(true);
          setCouponLoading(false);
        })
        .catch((error) => {
          setCouponLoading(false);
          toast.error(error?.response?.data?.message);
        });
      // Make a payment with the payment method
    } catch (error) {
      setCouponLoading(false);
      toast.error(error.message);
    }
  };

  const calculatePriceHandler = async (id) => {
    const url = "/coupon/get-calculations";

    const requestData = {
      package_id: routerId ? routerId : packageId,
      coupon_code: id,
    };
    const response = await axiosNodeApi.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCouponError(response.data.data.coupon_status);
    setCouponDetails(response.data.data);
    setCalculatePrice(response.data.data.totalPriceAfterDiscount);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    card_no: Yup.string().required("Card number is required"),
    expiry_date: Yup.string().required("Expiry Date is required"),
    cvc: Yup.string().required("CVC is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      card_no: "",
      expiry_date: "",
      cvc: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const cardDetails = {
          number: values.card_no.trim().replace(/\s/g, ""),
          exp_month: parseInt(values.expiry_date.split("/")[0]),
          exp_year: parseInt(values.expiry_date.split("/")[1]),
          cvc: values.cvc,
          name: values.name,
        };

        const response = await stripe.tokens.create({
          card: cardDetails,
        });

        axiosNodeApi
          .post(
            "/payments/subscription",
            {
              package_id: routerId ? routerId : packageId,
              card_token: response.id,
              coupon_code: coupon ? coupon : "",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((value) => {
            setSuccesModel(true);
            setCouponLoading(false);
          })
          .catch((error) => {
            setCouponLoading(false);
            toast.error(error?.response?.data?.message);
          });
      } catch (error) {
        console.log("error => ", error);
        toast.error(error.message);
      }
    },
  });

  const existingCardPayment = async (paymentMethod) => {
    setLoadingDefault(true);
    setDefaultId(paymentMethod.id);
    try {
      axiosNodeApi
        .post(
          "/payments/subscription",
          {
            package_id: routerId ? routerId : packageId,
            coupon_code: coupon ? coupon : "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((value) => {
          setSuccesModel(true);
          setCouponLoading(false);
        })
        .catch((error) => {
          setCouponLoading(false);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setLoadingDefault(false);
        });
    } catch (error) {
      console.log("error => ", error);
      toast.error(error.message);
    }
  };

  console.log("package details => ", packageDetails);

  return (
    <>
      {!custom && <Navbar />}

      {clientId ? (
        <div className="App">
          <div className="container-fluid theme_bg p-3">
            <div className="py-5">
              {!custom && (
                <div className="mb-5">
                  <PersonalInfo values={3} handleStep={3} />
                </div>
              )}
              {values?.price != 0 && (
                <div className="container">
                  <div className="col-sm-8 mt-3 mx-auto">
                    <div className="row bg-pric brdr_div">
                      <div className="uper-color p-4 mb-4">
                        <p className="text-white fs-40 Gothic_3D mb-0 p-4 ms-5">
                          Payment{" "}
                          {packageDetails?.price &&
                            `( $${packageDetails?.price} - ${packageDetails?.name} Subscription )`}
                        </p>
                      </div>
                      <div className="row bg-pric p-3 "></div>
                      {paymentMethods.length > 0 ? (
                        <div className="p-5 bg-dash">
                          <p className="fs-30 Gothic_3D fot-mon">
                            Payment Methods
                          </p>
                          {paymentMethods.length === 0 && (
                            <>No Payment Methods added yet! </>
                          )}
                          {paymentMethods
                            .filter((pm) => pm.isDefault)
                            .map((paymentMethod, key) => (
                              <div
                                className="p-3"
                                style={{
                                  borderRadius: "30px",
                                  background: "#FAFBFF",
                                }}
                                key={key}
                              >
                                <div
                                  className={
                                    paymentMethodClasses.mastercard_container
                                  }
                                >
                                  {paymentMethod.brand === "visa" ? (
                                    <img
                                      src={"/visa.png"}
                                      alt={"imac"}
                                      className={
                                        paymentMethodClasses.mastercard_img
                                      }
                                    />
                                  ) : (
                                    <img
                                      src={"/mastercard.png"}
                                      alt={"imac"}
                                      className={
                                        paymentMethodClasses.mastercard_img
                                      }
                                    />
                                  )}
                                  <div>
                                    <div style={{ display: "flex" }}>
                                      <button
                                        style={{
                                          width: "100px",
                                          height: "40px",
                                          borderRadius: "50px",
                                        }}
                                        className="no_brdr fs-15 btnYelow"
                                        type="button"
                                        onClick={existingCardPayment.bind(
                                          this,
                                          paymentMethod
                                        )}
                                      >
                                        {loadingDefault === true &&
                                        defaultId === paymentMethod.id
                                          ? antIcon
                                          : "Pay"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    paymentMethodClasses.mastercard_ending_with_container
                                  }
                                >
                                  <p
                                    className={
                                      paymentMethodClasses.mastercard_ending_with
                                    }
                                  >
                                    Mastercard ending in{" "}
                                    {paymentMethod.card.last4}
                                  </p>
                                </div>
                                <div
                                  className={
                                    paymentMethodClasses.mastercard_ending_with_container
                                  }
                                >
                                  <span
                                    className={
                                      paymentMethodClasses.mastercard_name
                                    }
                                  >
                                    {paymentMethod?.billing_details?.name ||
                                      "_______"}
                                  </span>
                                  <span>
                                    {" "}
                                    <span
                                      className={
                                        paymentMethodClasses.mastercard_expiry
                                      }
                                    >
                                      <strong style={{ fontWeight: "700" }}>
                                        Expiry{" "}
                                      </strong>
                                    </span>{" "}
                                    -{" "}
                                    {paymentMethod?.card?.exp_month +
                                      "/" +
                                      paymentMethod?.card?.exp_year}
                                  </span>
                                </div>
                              </div>
                            ))}
                          {packageDetails?.name !== "Yearly" && (
                            <div className="col-md-12 col-sm-12 mt-4">
                              <div className="form-group my-4">
                                <label
                                  className="fs-17 mb-2"
                                  style={{
                                    fontSize: "15px",
                                    lineHeight: "22.5px",
                                    fontWeight: "300",
                                  }}
                                >
                                  Coupon:
                                </label>
                                <input
                                  type="text"
                                  // autoComplete={false}
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  placeholder="Coupon Code"
                                  onChange={(e) => {
                                    const filtered = couponList.find(
                                      (item) =>
                                        item.coupon_code === e.target.value
                                    );
                                    if (filtered) {
                                      calculatePriceHandler(
                                        filtered.coupon_code
                                      );
                                      setPackageIDLocal(filtered._id);
                                    } else {
                                      setCouponError("Invalid");
                                      setPackageIDLocal(null);
                                      setCalculatePrice(0);
                                    }
                                    setCoupon(e.target.value);
                                  }}
                                  value={coupon}
                                />
                                {couponError && coupon && (
                                  <div>
                                    <div
                                      style={
                                        couponError === "Invalid" ||
                                        couponError === "expired"
                                          ? {
                                              width: "100%",
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              gap: "20px",
                                              textTransform: "capitalize",
                                              color: "red",
                                              marginTop: "10px",
                                            }
                                          : {
                                              width: "100%",
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              gap: "20px",
                                              textTransform: "capitalize",
                                              color: "green",
                                              marginTop: "10px",
                                            }
                                      }
                                    >
                                      {couponError} Coupon
                                    </div>
                                    <div style={{ marginTop: "8px" }}>
                                      {packageIDLocal && calculatePrice > 0 && (
                                        <p
                                          className={clsx("mb-0")}
                                          style={{
                                            color: "black",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Amount to be Paid ${calculatePrice} (
                                          {couponDetails.percent_off}%)
                                        </p>
                                      )}
                                    </div>
                                    <div style={{ marginTop: "8px" }}>
                                      {packageIDLocal && calculatePrice > 0 && (
                                        <p
                                          className={clsx("mb-0" ) `${styled.detail}`}
                                          style={{
                                            color: "black",
                                            fontWeight: "bold",
                                      
                                          }}
                                        >
                                          <strong style={{ fontSize: "15px" }} >
                                            Note:
                                          </strong>{" "}
                                          {`Your coupon will be valid for next ${couponDetails.duration_in_months} months, after that you will get charged $${couponDetails.actualPrice}/${packageDetails?.stripe_package_type}`}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <div
                            // className="p-5"
                            style={
                              paymentMethods.length === 0
                                ? {
                                    borderRadius: "30px",
                                    background: "#FAFBFF",
                                  }
                                : {
                                    marginTop: "3rem",
                                  }
                            }
                          >
                            <div className="col-md-12 col-sm-12 mt-4">
                              <div className="form-group my-4">
                                <label
                                  className="fs-17 mb-2"
                                  style={{
                                    fontSize: "15px",
                                    lineHeight: "22.5px",
                                    fontWeight: "300",
                                  }}
                                >
                                  Name On Card
                                </label>
                                <input
                                  type="text"
                                  // autoComplete={false}
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  placeholder="Name on card"
                                  onChange={(event) =>
                                    formik.setFieldValue(
                                      "name",
                                      event.target.value
                                    )
                                  }
                                  onBlur={formik.handleBlur}
                                  value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                  <span style={{ color: "red" }}>
                                    {formik.errors.name}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-md-12 col-sm-12 mt-4">
                              <div className="form-group my-4">
                                <label
                                  className="fs-17 mb-2"
                                  style={{
                                    fontSize: "15px",
                                    lineHeight: "22.5px",
                                    fontWeight: "300",
                                  }}
                                >
                                  Card Number
                                </label>
                                <input
                                  type="text"
                                  // autoComplete={false}
                                  className="form-control"
                                  name="card_no"
                                  id="card_no"
                                  placeholder="Card Number"
                                  onChange={(event) => {
                                    const input = event.target.value;
                                    const formattedInput = input
                                      .replace(/\D/g, "")
                                      .substring(0, 16);
                                    const parts = [];

                                    for (
                                      let i = 0;
                                      i < formattedInput.length;
                                      i += 4
                                    ) {
                                      parts.push(
                                        formattedInput.substring(i, i + 4)
                                      );
                                    }

                                    formik.setFieldValue(
                                      "card_no",
                                      parts.join(" ")
                                    );
                                  }}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.card_no}
                                />
                                {formik.touched.card_no &&
                                formik.errors.card_no ? (
                                  <span style={{ color: "red" }}>
                                    {formik.errors.card_no}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div>
                              <div className="row">
                                <div
                                  className="col-md-8 col-sm-8"
                                  style={{
                                    paddingLeft: "0px",
                                    paddingRight: "0px",
                                  }}
                                >
                                  <div className="form-group">
                                    <label
                                      className="fs-17 mb-2"
                                      style={{
                                        fontSize: "15px",
                                        lineHeight: "22.5px",
                                        fontWeight: "300",
                                      }}
                                    >
                                      Expiry Date
                                    </label>
                                    <input
                                      type="text"
                                      // autoComplete={false}
                                      className="form-control"
                                      name="expiry_date"
                                      id="expiry_date"
                                      placeholder="Expiry Date"
                                      onChange={(event) => {
                                        const { value } = event.target;

                                        // Remove any non-numeric characters
                                        const numericValue = value.replace(
                                          /\D/g,
                                          ""
                                        );

                                        // Format the value as MM/YY
                                        if (numericValue.length > 2) {
                                          const formattedValue = `${numericValue.slice(
                                            0,
                                            2
                                          )}/${numericValue.slice(2, 4)}`;
                                          event.target.value = formattedValue;
                                        } else {
                                          event.target.value = numericValue;
                                        }

                                        // Set the formatted value in the Formik state
                                        formik.setFieldValue(
                                          "expiry_date",
                                          event.target.value
                                        );
                                      }}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.expiry_date}
                                      maxLength="5"
                                    />
                                    {formik.touched.expiry_date &&
                                    formik.errors.expiry_date ? (
                                      <span style={{ color: "red" }}>
                                        {formik.errors.expiry_date}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                  <div className="form-group">
                                    <label
                                      className="fs-17 mb-2"
                                      style={{
                                        fontSize: "15px",
                                        lineHeight: "22.5px",
                                        fontWeight: "300",
                                      }}
                                    >
                                      CVC
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="cvc"
                                      id="cvc"
                                      placeholder="CVC"
                                      onChange={(event) => {
                                        const input = event.target.value;
                                        const formattedInput = input
                                          .replace(/\D/g, "")
                                          .substring(0, 3);

                                        formik.setFieldValue(
                                          "cvc",
                                          formattedInput
                                        );
                                      }}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cvc}
                                    />
                                    {formik.touched.cvc && formik.errors.cvc ? (
                                      <span style={{ color: "red" }}>
                                        {formik.errors.cvc}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <button
                                  style={{
                                    width: "212px",
                                    height: "53px",
                                    borderRadius: "78px",
                                    marginTop: "3rem",
                                  }}
                                  className="no_brdr fs-15 btnYelow"
                                  type="submit"
                                  onClick={formik.submitForm}
                                >
                                  {loading === true
                                    ? antIcon
                                    : "Pay With New Card"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className=""
                          style={{
                            height: "650px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <form
                            style={{
                              width: "100%",
                              maxWidth: "400px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "16px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                                flexDirection: "column",
                              }}
                            >
                              <label
                                htmlFor="card-number"
                                style={{ fontSize: "16px", fontWeight: 600 }}
                              >
                                Name on Card:
                              </label>
                              <input
                                type="text"
                                id="card-number"
                                name="card-number"
                                value={cardName}
                                placeholder="Name on Card"
                                onChange={(e) => setCardName(e.target.value)}
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #ef6920",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                                flexDirection: "column",
                              }}
                            >
                              <label
                                htmlFor="card-number"
                                style={{ fontSize: "16px", fontWeight: 600 }}
                              >
                                Card number:
                              </label>
                              <input
                                type="text"
                                id="card-number"
                                name="card-number"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="xxxx xxxx xxxx xxxx"
                                maxLength={19}
                                pattern="\d{16}"
                                required
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #ef6920",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                                flexDirection: "column",
                              }}
                            >
                              <label
                                htmlFor="exp-month"
                                style={{ fontSize: "16px", fontWeight: 600 }}
                              >
                                Expiration date:
                              </label>
                              <input
                                type="text"
                                id="exp-month"
                                name="exp-month"
                                value={expMonth}
                                onChange={handleExpMonthChange}
                                placeholder="MM"
                                maxLength={2}
                                pattern="\d{2}"
                                required
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #ef6920",
                                }}
                              />
                              <input
                                type="text"
                                id="exp-year"
                                name="exp-year"
                                value={expYear}
                                onChange={handleExpYearChange}
                                placeholder="YYYY"
                                maxLength={4}
                                pattern="\d{4}"
                                required
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #ef6920",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                                flexDirection: "column",
                              }}
                            >
                              <label
                                htmlFor="cvc"
                                style={{ fontSize: "16px", fontWeight: 600 }}
                              >
                                CVC:
                              </label>
                              <input
                                type="text"
                                id="cvc"
                                name="cvc"
                                placeholder="xxx"
                                value={cvc}
                                onChange={handleCVCChange}
                                maxLength={3}
                                pattern="\d{3}"
                                required
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #ef6920",
                                }}
                              />
                            </div>

                            {packageDetails?.name !== "Yearly" && (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "6px",
                                  flexDirection: "column",
                                }}
                              >
                                <label
                                  htmlFor="cvc"
                                  style={{ fontSize: "16px", fontWeight: 600 }}
                                >
                                  Coupon:
                                </label>
                                <input
                                  type="text"
                                  id="Referral"
                                  name="Referral"
                                  placeholder="Referral Code"
                                  value={coupon}
                                  onChange={(e) => {
                                    const filtered = couponList.find(
                                      (item) =>
                                        item.coupon_code === e.target.value
                                    );
                                    if (filtered) {
                                      calculatePriceHandler(
                                        filtered.coupon_code
                                      );
                                      setPackageIDLocal(filtered._id);
                                    } else {
                                      setPackageIDLocal(null);
                                      setCouponError("Invalid");
                                      setCalculatePrice(0);
                                    }
                                    setCoupon(e.target.value);
                                  }}
                                  style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    border: "1px solid #ef6920",
                                  }}
                                />
                                {couponError && coupon && (
                                  <div>
                                    <div
                                      style={
                                        couponError === "Invalid" ||
                                        couponError === "expired"
                                          ? {
                                              width: "100%",
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              gap: "20px",
                                              textTransform: "capitalize",
                                              color: "red",
                                              marginTop: "10px",
                                            }
                                          : {
                                              width: "100%",
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              gap: "20px",
                                              textTransform: "capitalize",
                                              color: "green",
                                              marginTop: "10px",
                                            }
                                      }
                                    >
                                      {couponError} Coupon
                                    </div>
                                    <div style={{ marginTop: "8px" }}>
                                      {packageIDLocal && calculatePrice > 0 && (
                                        <p
                                          className={clsx("mb-0")}
                                          style={{
                                            color: "black",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Amount to be Paid ${calculatePrice} (
                                          {couponDetails.percent_off}%)
                                        </p>
                                      )}
                                    </div>
                                    <div style={{ marginTop: "8px" }}>
                                      {packageIDLocal && calculatePrice > 0 && (
                                        <p
                                          className={ `${styled.detail} ${clsx("mb-0")}`}
                                          style={{
                                            color: "black",
                                            fontWeight: "bold",
              
                                          }}
                                        >
                                          <strong style={{ fontSize: "15px" }}>
                                            Note:
                                          </strong>{" "}
                                          {`Your coupon will be valid for next ${couponDetails.duration_in_months} months, after that you will get charged $${couponDetails.actualPrice}/${packageDetails?.stripe_package_type}`}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            <button
                              type="submit"
                              style={{height:"40px",width:"100px"}}
                              className={clsx(
                                `${classes.sign} py-0 m-0 btn hover`
                              )}
                              onClick={stripeHandler}
                            >
                              {couponLoading ? (
                                <CgSpinner
                                  className={clsx(couponLoading && "spin")}
                                />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <CustomModal
            title="Succefull"
            isModalVisible={errorModal}
            setErrorModal={setErrorModal}
            handleOk={nextStep}
            closable={false}
          >
            <p className="text-white fs-22"> {errorMessage} </p>
          </CustomModal>

          {!custom && (
            <>
              {" "}
              <CustomModal
                title="Succefull"
                isModalVisible={succesModel}
                handleOk={nextStep}
                closable={false}
              >
                <div className="p-5">
                  <p className="fs-22 text-white text-center p-5">
                    Your have purchased subscription successfully
                  </p>
                  <div className="text-center">
                    <Link href={"/Dashboard"} passHref>
                      <button className="btn login-button fs-14 px-5 mx-auto">
                        Go to Dashboard
                      </button>
                    </Link>
                  </div>
                </div>
              </CustomModal>
              <OtpModal
                isModalVisible={otpModal}
                verifyOtp={verifyOtp}
                OtpError={OtpError}
                closable={false}
                Resend={ResendOtp}
                otp={reset}
                title="Verify your Email"
              />
            </>
          )}
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
};

export default Payment;
