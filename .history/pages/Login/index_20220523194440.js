import React from "react";
import Navbar from "../../Component/Navbar";
import classes from "./Login.module.css";
import Acount from "../../Api/Acount";
import { useState, useEffect } from "react";
import CustomModal from "../../Component/Modal";
import Link from "next/link";
import LoginModal from "../../Component/Login/EnterEmail";
import OtpModal from "../../Component/Login/Otp";
import NewPassword from "../../Component/Login/NewPassword";
import Modal from "antd/lib/modal/Modal";
import { useRouter } from "next/router";
import axios from "axios";
import withAuth from "../../Component/unAuth";
import { Spin } from "antd";

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

  useEffect(() => {
    var input = document.getElementById("inputPassword6");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
      }
    });
  }, []);

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
        console.log(value);
        setSuccess(value.data.message);
        localStorage.setItem("user", value.data.user);
        localStorage.setItem("token", value.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${value.data.token}`;
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
        console.log("value", value.data);
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
        console.log("value", value.data);
        if (value.data.success) {
          if (route === "forget") {
            setPasswordModel(true);
          } else {
            setOtpModal(false);
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
        console.log("value", value.data);
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
        console.log("value", value.data.message);
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
    <div>
      <Navbar />
      <div className={`${classes.bgLogin}`}>
        <div className="container">
          <div className="col-11 mx-auto p-5">
            <div className={`my-5 ${classes.bgBlue}`}>
              <div className="row">
                <div className=" col-md-6 my-auto">
                  <div className=" text-center p-5 m-0">
                    <img
                      src="logo-black.png"
                      className="w-50"
                      alt="reilitics"
                    />
                    <div>
                      <p className="text-white mt-5 fs-15">
                        Welcome, get started by logging into the REI Litics
                        platform.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 my-auto px-0 ">
                  <div className="login-right p-5">
                    <p className="fs-40 Gothic_3D text-center mt-5">LOG IN</p>
                    <p className="fs-15">Email</p>
                    <form onSubmit={loginHandler}>
                      <input
                        type="text"
                        id="inputPassword6"
                        className="form-control w-100 form-bg my-2"
                        aria-describedby="passwordHelpInline"
                        name="firstName"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder="Enter Email"
                      />
                      <p className="fs-15 my-3">Password</p>
                      <input
                        type="password"
                        id="inputPassword6"
                        className="form-control form-bg  w-100"
                        aria-describedby="passwordHelpInline"
                        name="firstName"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder="Enter Password"
                      />
                      <div className="mt-2 d-flex">
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
                          Not a Member{" "}
                          <Link
                            href="/SignUp"
                            className="ms-1 fs-13 text-link pointer-cursor"
                          >
                            {" "}
                            Sign up
                          </Link>
                        </p>
                      </div>
                      <div className="d-grid gap-2 col-12 mt-3 mx-auto">
                        <button
                          id="myBtn"
                          className="btn btn-primary login-button fs-15"
                          type="submit"
                        >
                          {isLoading ? <Spin /> : " Log in"}
                        </button>
                      </div>
                    </form>
                    <div className="text-center my-4">
                      <p className="fs-14">Sign up with a Social Media</p>
                    </div>
                    <div className="text-center my-5">
                      <img
                        src={"squareFb.svg"}
                        className="ms-2  social"
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
                    </div>
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
        closable={false}
        setResetModel={setResetModel}
        resetPasword={resetPasword}
      />
      <CustomModal
        title="Succefull"
        isModalVisible={succesModel}
        closable={false}
      >
        <div className="p-5">
          <p className="fs-22 text-white text-center p-5">{success}</p>
          <div className="text-center">
            {/* {success} */}
            {/* <p className='text-white fs-30'>you are login now</p> */}
            <Link href="/Dashboard">
              <button className="btn login-button fs-14 px-5 mx-auto">
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
        closable={false}
        Resend={ResendOtp}
        // isModalVisiblee={resetModel}
        // setResetModel={setResetModel}
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
        <p className="text-white text-center my-5 fs-30">{successMessage}</p>
        <div className="mx-auto text-center">
          <button
            onClick={GotoLogin}
            className="btn p-3 px-5 fs-22 email-buuton"
          >
            Go back to Login
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default withAuth(Login);
