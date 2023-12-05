/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import GetData from "../../Api/GetData";
import PersonalDetails from "../../Component/PersonalDetails";
import Payment from "../../Component/Payment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { axiosInstance } from "../_app";
import moment from "moment";
import GraphData from "../../Api/Grapgh";
import {
  setItemToSessionStorage,
  removeItemFromSessionStorage,
} from "../../helpers/session-storage";
import { useRouter } from "next/router";
import { message, Modal } from "antd";
import { useRef } from "react";
import CustomModal from "../../Component/Modal";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import axiosNodeApi from "../../utils/axios";
import classes from "./EditProfile.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Stripe from "stripe";
import { toast } from "react-hot-toast";
import { LoadingOutlined } from "@ant-design/icons";
import { Switch } from "antd";

export const stripe = new Stripe(
  "sk_test_51Mw2BLFvfpbJnXSJUkI3g6z4NM90CBMvDpmp9p9xryx5EUbHQlPcRg097Eb9IZ9Rj8IJpuK68tbIKB7JiankVe8Z00f3xw37wE"
);

export default function EditProfile() {
  const scrollContainerRef = useRef(null);
  const Router = useRouter();
  const routerId = Router.query.id;
  const routerPrice = Router.query.price;
  const [loading, setLoading] = useState(false);
  const [loadingDefault, setLoadingDefault] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // If there is no access token we redirect to "/" page.
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.replace("/Login");
      return null;
    } else if (routerId) {
      onSelectPackage(routerId, routerPrice);
    }
  }, [Router, routerId, routerPrice]);

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  const [countrydata, setCountryData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [userPaymentStripe, setUserPaymentStripe] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [profileRegion, setProfileRegion] = useState("");
  const [image, setImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showPkgDetails, setShowPkgDetails] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [pkgPrice, setPkgPrice] = useState({});
  const [delUser, setdelUser] = useState(false);
  const [expiryDate, setExpiryDate] = useState();
  const [packageDetails, setPackageDetails] = useState();

  const [states, setStates] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [region, setRegion] = useState([]);
  const [regionlist, setRegionlist] = useState([]);
  const [filteredRegion, setFilteredRegion] = useState([]);
  const [freePkgId, setFreePkgId] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [defaultId, setDefaultId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  const scrollToBottom = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight - 1200;
    }
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
        const findFree = value?.data?.packages?.find(
          (item) => item.name == "Free"
        );
        setFreePkgId(findFree?._id);
      }
    });
  }, []);

  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <div className="form-group my-4">
            <label className="fs-17 mb-2">Reason</label>
            <input
              type="text"
              className="form-control"
              ref={ref}
              defaultValue=""
              placeholder="Reason"
            />
          </div>
          <div>Are you sure you want to cancel the Membership?</div>
        </div>
      ),
      okText: "Ok",
      cancelText: "Cancel",
      onOk() {
        if (ref.current.value.trim() === "") {
          message.error("Please write a valid reason!");
          return;
        }

        axiosNodeApi
          .post(
            "/payments/subscription",
            {
              email: email,
              package_id: freePkgId,
            },
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              message.success("Membership cancel Successfully!");
              window?.location?.reload();
            } else {
              message.error("Something went wrong!");
            }
          });
      },
    });
  };

  const Region = () => {
    const response = GraphData.marketRegion();
    response.then((value) => {
      if (value) {
        setRegionlist(value.data.Regions);
      }
    });
  };

  async function getStates() {
    const response = await axiosInstance.get(`/states/US`);
    if (response.data.success == true) {
      setStates(response.data.state);
    }
  }
  useEffect(() => {
    Region();
    getStates();
  }, []);

  useEffect(() => {
    setRegion("");
  }, [selectedRegion]);

  /**
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const filterRegionData = (e) => {
    const { value } = e.target;

    setSelectedRegion(value);
    const filterState = states.find((item) => item.isoCode === value);
    setItemToSessionStorage("state", filterState?.name);
    removeItemFromSessionStorage("region");
    setFilteredRegion(
      regionlist.filter((item) => item.RegionName.includes(value))
    );
  };

  function handleChangeState(e) {
    // setCountry(JSON.parse(e.target.value));
    setCountry(e.target.value);
    const { value } = e.target;
    const parsed = JSON.parse(value);
    setRegion(parsed.RegionID);
    setItemToSessionStorage("region", parsed.RegionName);
    setItemToSessionStorage("region_id", parsed.RegionID);
  }

  const handleChange = (input) => (e) => {
    if (input == "profilePic") {
      if (e.target.files[0]) {
        setProfileImage(URL.createObjectURL(e?.target?.files[0]));
        setSendImage(e?.target?.files[0]);
      }
    }
  };
  // const getUserData = () => {
  //   const response = GetData.EditGet();
  //   response.then((value) => {
  //     if (value) {
  //       setUser(value.data.user);
  //       setFirstName(value.data.user.firstName);
  //       setLastName(value.data.user.lastName);
  //       setEmail(value.data.user.email);
  //       setState(value.data.user.state);
  //       setCountry(value.data.user.country);
  //       setProfileImage(value.data.user.image);
  //       setUserId(value.data.user._id);
  //       setUserName(value.data.user.username);
  //       setProfileRegion(value.data.user?.region);
  //     }
  //   });
  // };

  const getUserData = useCallback(() => {
    const response = GetData.EditGet();
    response.then((value) => {
      if (value) {
        setUser(value.data.user);
        setFirstName(value.data.user.firstName);
        setLastName(value.data.user.lastName);
        setEmail(value.data.user.email);
        setState(value.data.user.state);
        setCountry(value.data.user.country);
        setProfileImage(value.data.user.image);
        setUserId(value.data.user._id);
        setProfileRegion(value.data.user?.region);
      }
    });
  }, []);

  function calculateExpiryDate(createdDate, time) {
    // Parse the createdDate string into a Date object
    const createdAt = new Date(createdDate);

    // Get the current month and year
    const currentMonth = createdAt.getMonth();
    const currentYear = createdAt.getFullYear();

    // Calculate the expiry date
    let expiryDate;
    if (time === "month") {
      expiryDate = new Date(currentYear, currentMonth + 1, createdAt.getDate());
    } else {
      expiryDate = new Date(currentYear + 1, currentMonth, createdAt.getDate());
    }

    // Return the expiry date as a string
    return expiryDate?.toDateString();
  }

  // const getUserPaymentData = () => {
  //   const response = GetData.UserPaymentGet();
  //   response.then((value) => {
  //     setUserPaymentStripe(value.data.get_payement);
  //     const expiryDate = calculateExpiryDate(
  //       value.data.get_payement.createdAt,
  //       value.data.get_payement.package.stripe_package_type
  //     );
  //     setExpiryDate(moment(expiryDate));
  //   });
  // };

  // const getUserPaymentData = useCallback(() => {
  //   const response = GetData.UserPaymentGet();
  //   response.then((value) => {
  //     console.log("value", value?.data);
  //     setUserPaymentStripe(value?.data?.get_payement);
  //     // const expiryDate = calculateExpiryDate(
  //     //   value.data.get_payement.createdAt,
  //     //   value.data.get_payement.package?.stripe_package_type
  //     // );
  //     // setExpiryDate(moment(expiryDate));
  //   });
  // }, []);

  useEffect(() => {
    getUserData();
    getPaymentMethods();
  }, [getUserData]);

  const getPaymentMethods = async () => {
    const response = await axiosNodeApi.get("/payments/get_payment_method", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    console.log("Payment Methods => ", response.data.paymentMethods);
    setPaymentMethods(response.data.paymentMethods);
  };

  const getUserProfileData = useCallback(() => {
    try {
      setIsLoading(true);
      const userToken = localStorage.getItem('token');
      
      if(userToken) {
        const response = GetData.UserProfilGet();
        response.then((value) => {
          setPackageDetails(value.data.user.packageID);
          const expiryDate = calculateExpiryDate(
            value.data.user.subscription_start_date,
            value.data.user.subscription_end_date
          );
          setExpiryDate(moment(expiryDate));

          const response2 = GetData.AllPackeges();
          if(value?.data?.user?.packageID === undefined) {
    
            // ASSING PACKAGE
            response2.then((value) => {
              if (value) {
                const pckg_id = value.data.packages.filter((pckg) => pckg.name === 'Free')[0]._id;
                setLoading(true);
        
                axiosNodeApi
                  .post(
                    "/payments/subscription",
                    {
                      email: value?.data?.user?.email,
                      package_id: pckg_id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.data.success) {
                      getUserProfileData();
                    } else {
                      message.error("Something went wrong!");
                    }
                  }).finally(() => {
                    handleCancel();
                    setLoading(false);
                  });
                setData(
                  value?.data?.packages.sort((a, b) => (a.name > b.name ? 1 : -1))
                );
              }
            });
          }
        }).finally(() => {
          setIsLoading(false);
        });
      }
    } catch (err) { 
      console.log(err)
    }
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const updateUser = (e) => {
    e.preventDefault(); // res

    let formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("region", profileRegion);
    formData.append("image", sendImage);

    axiosInstance
      .put(`/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((value) => {
        if (value.data.success == true) {
          setSuccessMessage("Profile Edited Successfully");
          window.location.reload();
        }
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(value.data.data));
      })
      .catch((error) => {
        console.log("er", error);
      });
  };

  const onSelectPackage = (id, price) => {
    setShowPaymentDetails(true);
    setShowPkgDetails(false);
    setPkgPrice({ id, price });
  };

  const userPackageUpdated = () => {
    setShowPaymentDetails(false);
    setShowPkgDetails(false);
    setPkgPrice({});
    getUserData();
  };

  let pkgExpDate,
    todayDate = moment();
  if (user?.packageID?.name != "Free" && user?.packageExpires) {
    pkgExpDate = new Date(user?.packageExpires);
  }

  const ResetPassword = () => {
    if (!password) {
      message.warning("Please enter the password");
      return;
    }
    axiosInstance
      .put(
        "/users/updatepassword",
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        message.success("Password Updated Successfully");
        setPassword("");
      })
      .catch(() => {
        message.error("Something went wrong!");
      });
  };

  // Delete User
  const deleteUser = () => {
    axiosInstance
      .delete(`/users/deleteUser`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((value) => {
        setdelUser(false);
        message.success("User Deleted Successfully");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/Login";
      })
      .catch((error) => {
        console.log("er", error.response);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    card_no: Yup.string()
      .required("Card number is required")
      .matches(
        /^(\d{4}\s){3}\d{4}$/,
        "Card number must be in the format XXXX XXXX XXXX XXXX"
      ),
    expiry_date: Yup.string()
      .required("Expiry Date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "Expiry Date must be in MM/YY format"
      ),
    cvc: Yup.string()
      .required("CVC is required")
      .matches(/^[0-9]{3,4}$/, "CVC must be a 3 or 4-digit number"),
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
      // Submit logic here
      console.log("Form submitted with values:", values);
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
            "/payments/create_payment_method",
            {
              card_token: response.id,
            },
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            toast.success("Payment method added successfully");
            formik.resetForm();
            getPaymentMethods();
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log("error => ", error);
        setLoading(false);
        toast.error(error.message);
      }
    },
  });

  const deleteCardHandler = (id) => {
    axiosNodeApi
      .post(
        "/payments/remove_payment_method",
        {
          payment_method_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        toast.success("Payment method deleted successfully");
        setPaymentMethods(
          paymentMethods.filter((paymentMethod) => paymentMethod.id !== id)
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const onChangeHandler = (id, e) => {
    setLoadingDefault(true);
    setDefaultId(id);
    axiosNodeApi
      .post(
        "/payments/set_default_payment_method",
        {
          payment_method_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        toast.success("Payment method set as default");
        getPaymentMethods();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoadingDefault(false);
      });
  };

  return (
    <>
      <Head>
        <title>Edit Profile - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div
          style={{ width: "inherit" }}
          className="overflow_class"
          ref={scrollContainerRef}
        >
          <div className="container mx-auto my-5 py-5">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="">
                <img src={profileImage} className="avatar-style" alt="" />
                <input
                  type="file"
                  accept="jpg, png, jpeg"
                  onChange={handleChange("profilePic")}
                  id="img"
                  className="d-none"
                />
                <label htmlFor="img" className="btn UploadBtn fs-15 ms-3 my-2">
                  Upload
                </label>
              </div>
              <button
                type="button"
                className="btn UploadBtn fs-15 ms-3 my-2"
                onClick={() => setdelUser(true)}
              >
                Delete Account
              </button>
            </div>
            <div className="row gx-5 py-5 my-5">
              <div className="col-md-6 col-sm-12">
                <div className="form-group my-4">
                  <label className="fs-17 mb-2">First Name</label>
                  <input
                    type="text"
                    // autoComplete={false}
                    className="form-control"
                    value={firstName}
                    name="firstName"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group my-4">
                  <label className="fs-17 mb-2">Email</label>
                  <input
                    type="email"
                    // autoComplete={false}
                    className="form-control"
                    value={email}
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                {country === "US" && (
                  <div className="form-group my-4">
                    <label className="fs-17 mb-2">State</label>
                    <select
                      className="mb-2 form-control form-select form-control-sm"
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                    >
                      <option value="">Select State</option>
                      {states.map((each) => {
                        return (
                          <option
                            key={each.isoCode}
                            value={each.name}
                            // selected={state === each.name ? true : false}
                          >
                            {each.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                <div className="form-group my-4">
                  <label className="fs-17 mb-2">City</label>
                  <input
                    type="text"
                    // autoComplete={false}
                    className="form-control"
                    value={profileRegion}
                    name="region"
                    id="region"
                    onChange={(e) => setProfileRegion(e.target.value)}
                    placeholder="Region"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="form-group my-4">
                  <label className="fs-17 mb-2">Last Name</label>
                  <input
                    type="text"
                    // autoComplete={false}
                    className="form-control"
                    value={lastName}
                    name="lastName"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group my-4">
                  <label className="fs-17 mb-2">Country</label>
                  {/* <input
                  type="text"
                  autoComplete={false}
                  className="form-control"
                  value={country}
                  name="country"
                  id="country"
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                /> */}
                  <select
                    className="mb-2 form-control form-select form-control-sm"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option value="">Select Country</option>
                    {countrydata.map((each) => {
                      return (
                        <option
                          key={each.isoCode}
                          value={each.isoCode}
                          // selected={country === each.isoCode ? true : false}
                        >
                          {each.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="my-4">
                <label className="fs-17 mb-2">Reset Password</label>
                <div className="d-flex gap-3">
                  <input
                    type="password"
                    // autoComplete={false}
                    style={{ flexGrow: 1 }}
                    className="form-control"
                    value={password}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                  />
                  <button
                    style={{
                      width: "100px",
                      height: "50px",
                      padding: "12px 16px",
                    }}
                    type="button"
                    className="no_brdr fs-15 btn_width btnYelow"
                    onClick={ResetPassword}
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="p-5 mt-3 bg-dash">
                <p className="fs-30 Gothic_3D fot-mon">YOUR MEMBERSHIP</p>
                <div className="p-5 bg-white">
                  <p className="fs-16 greyBlack">Membership Package</p>
                  <div className="mt-3 d-flex">
                    <p className=" fs-20 Bold greyBlack">
                      {packageDetails?.name}
                    </p>
                    <p className="ms-auto fs-22 Bold greyBlack">
                      ${packageDetails?.price}
                    </p>
                  </div>
                  {isLoading ? (
                    <>Loading...</>
                  ) : (
                    <>
                      {packageDetails?.packageType !== "Free" && (
                        <div className="mt-1 d-flex">
                          <p className="my-auto fs-16 greyBlack">Status</p>
                          {expiryDate > todayDate ? (
                            <div className="px-5 btn ms-auto light-btn-orange fs-14">
                              Active
                            </div>
                          ) : (
                            <div className="px-5 btn ms-auto light-btn-red fs-14">
                              Inactive
                            </div>
                          )}
                        </div>
                      )}
                      {packageDetails?.packageType !== "Free" && (
                        <div className="mt-2 d-flex">
                          <p className="my-auto fs-16 greyBlack">
                            Membership Renew date
                          </p>
                          <p className="my-auto ms-auto fs-16 greyBlack">
                            {moment(expiryDate).format("MMM DD YYYY")}
                          </p>
                        </div>
                      )}
                      <div className="mt-4 d-flex">
                        <div className="w-100 d-flex justify-content-end">
                          <div>
                            {(packageDetails?.stripe_package_type === "month" ||
                              packageDetails?.stripe_package_type === "year") &&
                              expiryDate > moment() &&
                              packageDetails?.name !== "Free" && (
                                <div className="p-0 col-lg-8 text-end">
                                  <button
                                    className="px-4 mx-2 btn ny-2 fs-14 opac btnYelow"
                                    onClick={confirm}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                          </div>
                          {(packageDetails?.name == "Monthly" ||
                            packageDetails?.name == "Yearly") &&
                            expiryDate > moment() && (
                              <div className="p-0 text-end">
                                <button
                                  className="px-4 mx-2 btn ny-2 fs-14 opac btnYelow"
                                  onClick={() => {
                                    Router.push("/SignUp/package");
                                  }}
                                >
                                  Upgrade
                                </button>
                              </div>
                            )}
                          {packageDetails?.name == "Free" && (
                            <div className="p-0 text-end">
                              <button
                                className="px-4 mx-2 btn ny-2 fs-14 opac btnYelow"
                                onClick={() => {
                                  Router.push("/SignUp/package");
                                }}
                              >
                                Upgrade
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="p-5 bg-dash">
                <p className="fs-30 Gothic_3D fot-mon">Payment Methods</p>

                {paymentMethods.map((paymentMethod, key) => (
                  <div
                    className="p-5 mt-3"
                    style={{ borderRadius: "30px", background: "#FAFBFF" }}
                    key={key}
                  >
                    <div className={classes.mastercard_container}>
                      {paymentMethod.brand === "visa" ? (
                        <img
                          src={"/visa.png"}
                          alt={"imac"}
                          className={classes.mastercard_img}
                        />
                      ) : (
                        <img
                          src={"/mastercard.png"}
                          alt={"imac"}
                          className={classes.mastercard_img}
                        />
                      )}
                      <div>
                        <div style={{ display: "flex" }}>
                          {loadingDefault && defaultId === paymentMethod.id && (
                            <div
                              style={{ marginTop: "14px", marginRight: "3rem" }}
                            >
                              {antIcon}
                            </div>
                          )}
                          <img
                            src={"/Delete.png"}
                            alt={"imac"}
                            className={classes.mastercard_delete_icon}
                            onClick={deleteCardHandler.bind(
                              this,
                              paymentMethod.id
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.mastercard_ending_with_container}>
                      <p className={classes.mastercard_ending_with}>
                        Mastercard ending in {paymentMethod.card.last4}
                      </p>
                    </div>
                    <div className={classes.mastercard_ending_with_container}>
                      <span className={classes.mastercard_name}>
                        {paymentMethod?.billing_details?.name || "_______"}
                      </span>
                      <span>
                        {" "}
                        <span className={classes.mastercard_expiry}>
                          <strong style={{ fontWeight: "700" }}>Expiry </strong>
                        </span>{" "}
                        -{" "}
                        {paymentMethod?.card?.exp_month +
                          "/" +
                          paymentMethod?.card?.exp_year}
                      </span>
                    </div>
                  </div>
                ))}

                <div
                  className="p-5"
                  style={{
                    borderRadius: "30px",
                    background: "#FAFBFF",
                    marginTop: "3rem",
                  }}
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
                          formik.setFieldValue("name", event.target.value)
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

                          for (let i = 0; i < formattedInput.length; i += 4) {
                            parts.push(formattedInput.substring(i, i + 4));
                          }

                          formik.setFieldValue("card_no", parts.join(" "));
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.card_no}
                      />
                      {formik.touched.card_no && formik.errors.card_no ? (
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
                        style={{ paddingLeft: "0px", paddingRight: "0px" }}
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
                              const numericValue = value.replace(/\D/g, "");

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

                              formik.setFieldValue("cvc", formattedInput);
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
                      disabled={loading}
                    >
                      {loading === true ? antIcon : "Add Card"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-success fs-20">{sucessMessage}</p>
              <button
                className="no_brdr fs-15 btn_width btnYelow"
                onClick={updateUser}
                style={{ borderRadius: "78px !important" }}
              >
                Update Profile
              </button>
            </div>
          </div>
          {showPkgDetails && (
            <PersonalDetails
              pkgId={user?.packageID?._id}
              custom={true}
              onSelectPackage={onSelectPackage}
              userPackageUpdated={userPackageUpdated}
            />
          )}
          {showPaymentDetails && (
            <Payment
              custom={true}
              values={pkgPrice}
              userPackageUpdated={userPackageUpdated}
            />
          )}
        </div>
        <CustomModal
          title="Succefull"
          isModalVisible={delUser}
          closable={true}
          handleClose={() => setdelUser(false)}
        >
          <div className="p-5">
            <p className="p-5 text-center text-white fs-22">
              Are you sure you want to delete user?
            </p>
            <div
              className="text-center"
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className="px-5 mx-auto btn UploadBtn  fs-14"
                onClick={() => setdelUser(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 mx-auto btn fs-14"
                style={{ backgroundColor: "#ef6921", width: "14rem" }}
                onClick={deleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </CustomModal>
      </div>
    </>
  );
}
