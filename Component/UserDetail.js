import React, { useEffect, useState } from "react";

// import { makeStyles } from '@material-ui/core/styles';
import Acount from "../Api/Acount";
import CustomModal from "./Modal";
import GetData from "../Api/GetData";
import Link from "next/link";
import Navbar from "./Navbar";
import PersonalInfo from "./PersonalInfo";
import dynamic from "next/dynamic";
import TermsOfUse from "./TermsOfUse";
import CookiesPolicy from "./CookiesPolicy";
import PrivacyPolicy from "./PrivacyPolicy";
import { message } from "antd";
import OtpModal from "./Login/Otp";
import { axiosInstance } from "../pages/_app";
import { useRouter } from "next/router";
import moment from "moment";
import DatePicker from "react-datepicker";
import axiosNodeApi from "../utils/axios";

// const GoogleSignIn = dynamic(() => import("./../Component/Auth/GoogleSignIn"), {
//   ssr: false,
// });

// const FacebookSignIn = dynamic(
//   () => import("./../Component/Auth/FacebookSignIn"),
//   { ssr: false }
// );

// const TwitterSignIn = dynamic(
//   () => import("./../Component/Auth/TwitterSignIn"),
//   { ssr: false }
// );

const UserDetails = ({
  handleStep,
  nextStep,
  handleChange,
  handleDirectChange,
  values,
}) => {
  const router = useRouter();
  const [termsModel, settermsModel] = useState(false);
  const [privacyModel, setPrivacyModel] = useState(false);
  const [cookiesModel, setCookiesModel] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countrydata, setCountryData] = useState([]);
  const [statesdata, setStatesData] = useState([]);
  const [PasswordNew, setPasswordNew] = useState("");
  const [typeDate, setTypeDate] = useState("");
  const dateEnd = moment().format("YYYY-MM-DD");
  const [otpModal, setotpModal] = useState(false);
  const [reset, setReset] = useState("");
  const [OtpError, setOtpError] = useState("");
  const [freePkgId, setFreePkgId] = useState("");
  const onFocu = () => {
    setTypeDate("date");
  };
  const onhandleChange = async (e) => {
    handleDirectChange("country", e.target.value);
    const response = GetData.StatesData(e.target.value);
    response.then((value) => {
      if (value) {
        setStatesData(value?.data?.state);
      }
    });
  };

  // for continue event listener
  const Continue = (e) => {
    nextStep();
  };

  const SignUp = async () => {
    let formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.familyName);
    formData.append("country", values.country);
    formData.append("state", values.state);
    formData.append("DOB", values.DOB);
    formData.append("phone", values.phone);
    formData.append("region", values.region || "");
    formData.append("image", values.sendImage);
    formData.append("packageID", values.pkgId);
    formData.append("email", values.email);
    formData.append("password", values.password);
    // console.log(values);
    // const res = await axios.post("/users", formData);
    // console.log(res);

    axiosInstance
      .post("/users", formData)
      .then((res) => {
        // router.push("/SignUp/package");
        setotpModal(true);
      })
      .catch((error) => {
        // setErrorModal(true);
        setErrorMessage(error?.response?.data?.message);
      });
  };

  const VerifyUser = (e) => {
    if (!(values.password && PasswordNew && values.password === PasswordNew)) {
      message.error("Kindly Add Password and confirm it!");
      return;
    }
    e.preventDefault();

    const res = Acount.userValidation(
      values.firstName,
      values.familyName,
      values.email,
      values.password,
      values.state,
      values.country,
      values.DOB,
      values.region,
      setErrorMessage
    );
    res
      .then((value) => {
        setSuccessMessage(value.data.message);
        if (value.data.message === "User is verified") {
          SignUp();
        }
        // Continue();
      })
      .catch((err) => {});
  };
  useEffect(() => {
    const response = GetData.CountryData();
    response.then((value) => {
      if (value) {
        setCountryData(value?.data?.country);
      }
    });
  }, []);

  useEffect(() => {
    const response = GetData.AllPackeges();

    response.then((value) => {
      if (value) {
        const freePkg = value?.data?.packages.filter(
          (pkg) => pkg.packageType === "Free"
        );
        setFreePkgId(freePkg[0]?._id);
      }
    });
  }, []);

  const verifyOtp = (otp) => {
    setReset("");
    const res = Acount.verifyOtp(values.email, otp, setOtpError);
    res
      .then((value) => {
        if (value.data.success) {
          localStorage.setItem("user", JSON.stringify(value.data.user));
          localStorage.setItem("signUp", true);
          localStorage.setItem("token", value.data.token);
          // handleFreeSubscription(value.data.user.email, value.data.token);
          router.push("/SignUp/package");
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

  const handleFreeSubscription = (email, token) => {
    axiosNodeApi.post(
      "/payments/subscription",
      {
        email: email,
        package_id: freePkgId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid theme_bg p-3">
        <div className="py-5">
          <div className="mb-5">
            <PersonalInfo values={values.step} handleStep={handleStep} />
          </div>
          <div className="container">
            {/* email address */}
            <div className="col-sm-11 mt-3 mx-auto">
              <div className="bg-white brdr_div">
                <div className="uper-color px-5 py-3">
                  <p className="text-white px-5 my-auto fs-40 Gothic_3D pt-3 fot-mon">
                    CREATE ACCOUNT
                  </p>
                  <div className="d-flex">
                    <p className="text-white ps-5 fs-15">Already a member?</p>
                    <Link href="/Login">
                      <a className=" ms-3 fs-15" style={{ color: "#FE6F35" }}>
                        Login
                      </a>
                    </Link>
                  </div>
                </div>
                <form
                  onSubmit={VerifyUser}
                  className="py-3 px-5"
                  // oninput='confirmPassword.setCustomValidity(values.confirmPassword != values.password ? "Passwords do not match." : "")'
                >
                  <div className="row px-5">
                    <div className="">
                      {/* <AvatarUploader
                                                size={150}
                                                uploadURL="http://localhost:3000"
                                                fileType={"image/png"} /> */}
                      {/* <UploadAndDisplayImage /> */}
                      {/* <Imagees /> */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={values.profilePic}
                        className="avatar-style"
                        alt=""
                      />
                      <input
                        type="file"
                        accept="jpg"
                        onChange={handleChange("profilePic")}
                        id="img"
                        className="d-none"
                      />
                      <label
                        htmlFor="img"
                        className="btn UploadBtn fs-15 ms-3 my-2"
                      >
                        Upload
                      </label>
                    </div>
                    <div className="col-sm-6 my-3">
                      <input
                        className="w-100 form-bg border-rad form-control"
                        placeholder="First Name"
                        onChange={handleChange("firstName")}
                        defaultValue={values.firstName}
                        // variant="outlined"
                        required
                      />
                    </div>
                    {/* username */}
                    <div className="col-sm-6 my-3">
                      <input
                        placeholder="Last Name*"
                        className="form-control form-bg border-rad"
                        onChange={handleChange("familyName")}
                        defaultValue={values.familyName}
                        required
                        // variant="outlined"
                        // autoComplete="username"
                      />
                    </div>
                  </div>
                  <div className="row px-5">
                    <div className="col-sm-6 my-3">
                      <input
                        placeholder="Email*"
                        className="form-control form-bg border-rad w-100"
                        onChange={handleChange("email")}
                        defaultValue={values.email}
                        type="email"
                        // variant="outlined"
                        required
                      />
                    </div>
                    {/* <div className="col-sm-6 my-3">
                      <input
                        placeholder="City"
                        className="form-control form-bg border-rad w-100"
                        onChange={handleChange("region")}
                        defaultValue={values.region}
                        type="region"
                        // variant="outlined"
                      />
                    </div> */}
                    <div className="col-sm-6 my-3">
                      <input
                        placeholder="Date of Birth*"
                        name="date"
                        id="date"
                        className="form-control img-place form-bg border-rad w-100"
                        onChange={handleChange("DOB")}
                        defaultValue={values.DOB === "" ? "" : values.DOB}
                        // variant="outlined"
                        required
                        type={typeDate}
                        onFocus={onFocu}
                        // onBlur={() => setTypeDate("text")}
                        min="01-01-1900"
                        max={dateEnd}
                      />
                    </div>
                  </div>
                  <div className="row px-5">
                    <div className="border-rad col-sm-6 my-3">
                      <select
                        className="form-select select-set "
                        name="country"
                        onChange={onhandleChange}
                        aria-label="Default select example"
                      >
                        <option value="">Select Country</option>
                        {countrydata?.map((country) => {
                          return (
                            <option
                              value={country.isoCode}
                              key={country.isoCode}
                            >
                              {country.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-sm-6 my-3">
                      <input
                        placeholder="City"
                        className="form-control form-bg border-rad w-100"
                        onChange={handleChange("region")}
                        defaultValue={values.region}
                        type="region"
                        // variant="outlined"
                      />
                    </div>
                  </div>
                  <div className="row px-5">
                    {values.country === "US" && (
                      <div className="col-sm-6 my-3">
                        <select
                          className="form-select select-set"
                          onChange={handleChange("state")}
                          aria-label="Default select example"
                        >
                          <option value="">Select State</option>
                          {statesdata.map((state, i) => {
                            return (
                              <option value={state.isoCode} key={i}>
                                {state.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="row px-5">
                    <div className="col-sm-6 my-3">
                      <input
                        placeholder="Password*"
                        className="form-control form-bg border-rad w-100"
                        required
                        onChange={handleChange("password")}
                        defaultValue={values.password}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        // variant="outlined"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        name="password"
                        type="password"
                      />
                    </div>
                    <div className="col-sm-6 my-3">
                      <input
                        placeholder="Confirm Password*"
                        className="form-control form-bg border-rad w-100"
                        required
                        onChange={(e) => setPasswordNew(e.target.value)}
                        value={PasswordNew}
                        defaultValue={values.confirmPassword}
                        name="confirmPassword"
                        type="password"
                      />
                      {values.password && PasswordNew ? (
                        values.password === PasswordNew ? (
                          <p className="text-success fs-6 px-2">
                            Password Matched
                          </p>
                        ) : (
                          <p className="text-danger fs-6 mb-0 px-2">
                            Password does not Match
                          </p>
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="form-check mt-3 ms-5 d-flex">
                    <input
                      className="form-check-input ms-3 mt-0"
                      style={{ flexShrink: 0 }}
                      type="checkbox"
                      required
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label ms-3"
                      style={{ fontSize: "1.5rem" }}
                      htmlFor="flexCheckDefault"
                    >
                      I agree to the{" "}
                      <span
                        className="orangetxt pointer-cursor"
                        onClick={() => {
                          settermsModel(true);
                        }}
                      >
                        Terms of Use
                      </span>
                      ,{" "}
                      <span
                        className="orangetxt pointer-cursor"
                        onClick={() => {
                          setPrivacyModel(true);
                        }}
                      >
                        Privacy Policy
                      </span>{" "}
                      and{" "}
                      <span
                        className="orangetxt pointer-cursor"
                        onClick={() => {
                          setCookiesModel(true);
                        }}
                      >
                        {" "}
                        Cookies Policy
                      </span>
                    </label>
                  </div>
                  <div className="form-check mt-3 ms-5 d-flex">
                    <input
                      className="form-check-input ms-3 mt-0"
                      type="checkbox"
                      style={{ flexShrink: 0 }}
                      value=""
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label ms-3"
                      style={{ fontSize: "1.5rem" }}
                      htmlFor="flexCheckChecked"
                    >
                      Keep me in the know and sign me up to the newsletter
                    </label>
                  </div>
                  <br />
                  <div className="text-center">
                    <p className="text-danger fs-19">{errorMessage}</p>
                    <button
                      type="submit"
                      className="login-button mx-auto text-white"
                      style={{
                        width: "100%",
                        maxWidth: "50%",
                        padding: "0 20px",
                        fontSize: "1.5rem",
                      }}
                      variant="contained"
                      color="primary"
                      // disabled={
                      //   !(
                      //     values.password &&
                      //     PasswordNew &&
                      //     values.password === PasswordNew
                      //   )
                      // }
                    >
                      Create Account
                    </button>
                    {/* <p>{error}</p> */}
                  </div>
                </form>
                {/* <div className="text-center my-3">
                  <p className="fs-15">Or sign up using the below</p>
                </div>
                <div className="text-center pb-4 mt-2 social-logins">
                  <FacebookSignIn />
                  <TwitterSignIn />
                  <GoogleSignIn />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <CustomModal
          title="Terms of Use"
          customClass="modal-white"
          isModalVisible={termsModel}
          handleOk={settermsModel}
          handleClose={() => settermsModel(false)}
          closable={true}
        >
          <TermsOfUse />
        </CustomModal>
        <CustomModal
          title="Privacy Policy"
          customClass="modal-white"
          isModalVisible={privacyModel}
          handleOk={setPrivacyModel}
          handleClose={() => setPrivacyModel(false)}
          closable={true}
        >
          <PrivacyPolicy />
        </CustomModal>
        <CustomModal
          title="Cookies Policy"
          customClass="modal-white"
          isModalVisible={cookiesModel}
          handleOk={setCookiesModel}
          handleClose={() => setCookiesModel(false)}
          closable={true}
        >
          <CookiesPolicy />
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
      </div>
    </>
  );
};

export default UserDetails;
