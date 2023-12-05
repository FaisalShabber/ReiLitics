/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

import Acount from "../../Api/Acount";
import CustomModal from "../../Component/Modal";
import Link from "next/link";
import LoginModal from "../../Component/Login/EnterEmail";
import Modal from "antd/lib/modal/Modal";
import Navbar from "../../Component/Navbar";
import NewPassword from "../../Component/Login/NewPassword";
import OtpModal from "../../Component/Login/Otp";
import React from "react";
import { Spin, message } from "antd";
import { axiosInstance } from "../_app";
import classes from "./Login.module.css";
import withAuth from "../../Component/unAuth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import axiosNodeApi from "../../utils/axios";
import GetData from "../../Api/GetData";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [passwordModel, setPasswordModel] = useState(false);
  const [otp, setOtp] = useState("");
  const [OtpError, setOtpError] = useState("");
  const [route, setroute] = useState("");
  const [reset, setReset] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  var input = document.getElementById("myInput");
  const [successMessage, setSuccessMessage] = useState("");

  const [passwordChanged, setPasswordChanged] = useState(false);

  const [resetModel, setResetModel] = useState(false);
  const [errorModel, setErrorModel] = useState(false);
  const [succesModel, setSuccesModel] = useState(false);
  const [freePkgId, setFreePkgId] = useState("");

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    var input = document.getElementById("inputPassword6");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
      }
    });
  }, []);

  useEffect(() => {
    const response = GetData.AllPackeges();

    response.then((value) => {
      if (value) {
        const findFree = value?.data?.packages?.find(
          (item) => item.name == "Free"
        );
        setFreePkgId(findFree?._id);
      }
    });
  }, []);

  const googleRes = (credentialResponse) => {
    googleLogin(credentialResponse);
  };
  // const fbRes = (credentialResponse) => {
  //   // facebookLogin(credentialResponse);
  //   console.log(credentialResponse);
  // };

  const googleLogin = async (body) => {
    axiosInstance
      .post("/users/googleLogin", {
        clientId: body.clientId,
        token: body.credential,
        select_by: body.select_by,
      })
      .then((value) => {
        setIsLoading(false);
        setSuccess(value.data.message);
        localStorage.setItem("user", JSON.stringify(value.data.user));
        localStorage.setItem("token", value.data.token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${value.data.token}`;
        if (!value.data.user.packageID) {
          handleFreeSubscription(
            freePkgId,
            value.data.token,
            value.data.user.email
          );
        }
        setSuccesModel(true);
      })
      .catch((err) => {
        if (err.response.data.code === 401) {
          message.error("This email is not registerd!");
        } else {
          message.error(err.response.data.message);
        }
      });
  };
  const fbRes = (credentialResponse) => {
    facebookLogin(credentialResponse);
  };

  const facebookLogin = async (body) => {
    axiosInstance
      .post("/users/facebookLogin", {
        userID: body.userID,
        accessToken: body.accessToken,
      })
      .then((value) => {
        setIsLoading(false);
        setSuccess(value.data.message);
        localStorage.setItem("user", JSON.stringify(value.data.user));
        localStorage.setItem("token", value.data.token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${value.data.token}`;
        if (!value.data.user.packageID) {
          handleFreeSubscription(
            freePkgId,
            value.data.token,
            value.data.user.email
          );
        }
        setSuccesModel(true);
      })
      .catch((err) => {
        if (err.response.data.code === 401) {
          message.error("This email is not registerd!");
        } else {
          message.error(err.response.data.message);
        }
      });
  };

  const handleFreeSubscription = (freePkgId, token, email) => {
    axiosNodeApi
      .post(
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
      )
      .then((res) => {})
      .catch((err) => {});
  };

  const loginHandler = (e) => {
    setIsLoading(true);

    e.preventDefault();
    // nextStep();
    const res = Acount.Login(
      email,
      password,
      setError,
      setErrorModel,
      setOtpModal
    );
    res
      .then((value) => {
        setIsLoading(false);
        setSuccess(value.data.message);
        localStorage.setItem("user", JSON.stringify(value.data.user));
        localStorage.setItem("token", value.data.token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${value.data.token}`;
        if (!value.data.user.packageID) {
          handleFreeSubscription(
            freePkgId,
            value.data.token,
            value.data.user.email
          );
        }
        if (value.statusText == "OK") {
          setSuccesModel(true);
        } else {
          setErrorModel(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  const resetPasword = (email) => {
    // nextStep();
    setEmail(email);
    const res = Acount.EnterEmail(email, setError, setErrorModel);
    res
      .then((value) => {
        if (value.data.success) {
          setOtpModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const verifyOtp = (otp) => {
    setOtp(otp);
    const res = Acount.verifyOtp(email, otp, setError, setErrorModel);
    res
      .then((value) => {
        if (value.data.success) {
          if (route === "forget") {
            setPasswordModel(true);
          } else {
            setSuccess(value.data.message);
            localStorage.setItem("user", JSON.stringify(value.data.user));
            localStorage.setItem("token", value.data.token);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${value.data.token}`;
            if (!value.data.user.packageID) {
              handleFreeSubscription(
                freePkgId,
                value.data.token,
                value.data.user.email
              );
            }
            setOtpModal(false);
            setSuccesModel(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ResendOtp = () => {
    const res = Acount.EnterEmail(email);
    res
      .then((value) => {
        setReset(value.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmPassword = (Password, PasswordNew) => {
    const res = Acount.confirmPassword(
      Password,
      otp,
      email,
      setError,
      setErrorModel
    );
    res
      .then((value) => {
        setSuccessMessage(value.data.message);
        if (value.data.success) {
          setPasswordChanged(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console
  // const accessToken = localStorage.getItem("user");

  // // If there is no access token we redirect to "/" page.
  // if (accessToken) {
  //   Router.replace("/Dashboard");
  //   return null;
  // }
  const GotoLogin = () => {
    window.location.href = "/Login";
  };

  return (
    <>
      <Head>
        <title>Login - REI Litics</title>
      </Head>

      <div>
        <Navbar />
        <div className={`${classes.bgLogin}`}>
          <div className="container">
            <div className="p-5 mx-auto col-11">
              <div className={`my-5 ${classes.bgBlue}`}>
                <div className="row">
                  <div className="my-auto col-md-6">
                    <div className="p-5 m-0 text-center ">
                      <img
                        src="logo-white.png"
                        className="w-50 side-bar-logo"
                        alt="reilitics"
                      />
                      <div>
                        <p className="mt-5 text-white fs-15">
                          Welcome, get started by logging into the REI Litics
                          platform.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-0 my-auto col-md-6 ">
                    <div className="p-5 login-right">
                      <p className="mt-5 text-center fs-40 Gothic_3D">LOG IN</p>
                      <p className="fs-15">Email</p>
                      <form onSubmit={loginHandler}>
                        <input
                          type="text"
                          id="inputPassword6"
                          className="my-2 form-control w-100 form-bg"
                          aria-describedby="passwordHelpInline"
                          name="firstName"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                          placeholder="Enter Email"
                        />
                        <p className="my-3 fs-15">Password</p>
                        <input
                          type="password"
                          id="inputPassword6"
                          className="form-control form-bg w-100"
                          aria-describedby="passwordHelpInline"
                          name="firstName"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                          placeholder="Enter Password"
                        />
                        <div className="mt-4 d-flex">
                          <p className="fs-13">
                            Forgot Password?
                            <span
                              className="link_color pointer-cursor ms-2"
                              type="primary"
                              onClick={() => {
                                setroute("forget"), setResetModel(true);
                              }}
                            >
                              Reset Now
                            </span>
                          </p>
                          <p className="fs-13 text-nowrap ms-auto">
                            Not a Member?{" "}
                            <Link
                              href="/SignUp"
                              className="ml-1 ms-1 fs-13 text-link pointer-cursor"
                            >
                              Sign up
                            </Link>
                          </p>
                        </div>
                        <div className="gap-2 mx-auto mt-3 d-grid col-6">
                          <button
                            id="myBtn"
                            className="btn btn-primary login-button fs-15 text-white"
                            type="submit"
                          >
                            {isLoading ? <Spin /> : " Log in"}
                          </button>
                        </div>
                      </form>
                      <div className="my-4 text-center">
                        <p className="fs-14">Sign up with a Social Media</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <GoogleOAuthProvider clientId="1006051285949-0lp8t1haosrvm7o3rjh5255u88dvmeo7.apps.googleusercontent.com">
                          <GoogleLogin
                            onSuccess={(credentialResponse) =>
                              googleRes(credentialResponse)
                            }
                            onError={() => {
                              message.error("Login Failed!");
                            }}
                            useOneTap
                          />
                        </GoogleOAuthProvider>
                      </div>
                      {/* <div className="d-flex justify-content-center mt-3">
                      <FacebookLogin
                        appId="601715668188244"
                        autoLoad={false}
                        icon="fa-facebook"
                        callback={fbRes}
                        className="fb-login-button"
                        data-width=""
                        data-size="medium"
                        data-button-type="login_with"
                        data-layout="default"
                        data-auto-logout-link="false"
                        data-use-continue-as="false"
                      ></FacebookLogin>
                    </div> */}
                      {/* <div className="my-5 text-center">
                      <img
                        src={"squareFb.svg"}
                        className="ms-2 social"
                        alt="facebook"
                      />
                      <img
                        src={"squareTwitter.svg"}
                        className="ms-3 social"
                        alt="facebook"
                      />
                      <img
                        src={"squareGmail.svg"}
                        className="ms-3 social"
                        alt="facebook"
                      />
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LoginModal
          title="Reset Your Password"
          isModalVisible={resetModel}
          closable={true}
          setResetModel={setResetModel}
          resetPasword={resetPasword}
          handleCancel={() => setResetModel(false)}
        />
        <CustomModal
          title="Succefull"
          isModalVisible={succesModel}
          closable={false}
        >
          <div className="p-5">
            <p className="p-5 text-center text-white fs-22">{success}</p>
            <div className="text-center">
              <Link href="/Dashboard" passHref>
                <button className="px-5 mx-auto btn login-button fs-14">
                  View your dashboard
                </button>
              </Link>
            </div>
          </div>
        </CustomModal>
        <CustomModal
          title="Error"
          setErrorModel={setErrorModel}
          isModalVisible={errorModel}
          handleClose={() => setErrorModel(false)}
          closable={true}
        >
          <p className="text-white">{error}</p>
        </CustomModal>
        <LoginModal
          isModalVisible={otpModal}
          verifyOtp={verifyOtp}
          OtpError={OtpError}
          closable={false}
          Resend={ResendOtp}
        />
        <OtpModal
          isModalVisible={otpModal}
          verifyOtp={verifyOtp}
          OtpError={OtpError}
          otp={reset}
          error={error}
          closable={true}
          Resend={ResendOtp}
          handleCancel={() => setOtpModal(false)}
        />
        <NewPassword
          isModalVisible={passwordModel}
          setPasswordModel={setPasswordModel}
          confirmPassword={confirmPassword}
        />
        {/* confirm password */}
        <CustomModal
          title="Error"
          isModalVisible={passwordChanged}
          setPasswordChanged={setPasswordChanged}
          handleClose={() => setPasswordChanged(false)}
          closable={true}
        >
          <p className="my-5 text-center text-white fs-30">{successMessage}</p>
          <div className="mx-auto text-center">
            <button
              onClick={GotoLogin}
              className="p-3 px-5 btn fs-22 email-buuton"
            >
              Go back to Login
            </button>
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default withAuth(Login);
