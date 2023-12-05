import React, { useEffect, useState } from "react";
import Price from "./Price";
import Navbar from "../Component/Navbar";
import PersonalInfo from "./PersonalInfo";
import Link from "next/link";

import CustomModal from "./Modal";
import GetData from "../Api/GetData";
import { Spin } from "antd";
import { useRouter } from "next/router";
import axiosNodeApi from "../utils/axios";

const PersonalDetails = ({
  custom = false,
  pkgId = null,
  prevStep,
  nextStep,
  userPackageId,
  values,
}) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [errorModel, setErrorModel] = useState(false);
  const [succesModel, setSuccesModel] = useState(false);
  const [succesModel2, setSuccesModel2] = useState(false);

  // const Continue = (id, price) => {
  //   // e.preventDefault();
  //   handleDirectChange("price", price);
  //   handleDirectChange("pkgId", id);
  //   // props.SelectPrice(data)
  //   router.push("/SignUp/payments");
  // };

  useEffect(() => {
    const response = GetData.AllPackeges();

    response.then((value) => {
      if (value) {
        setData(
          value?.data?.packages.sort((a, b) => (a.price > b.price ? 1 : -1))
        );
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (router.pathname === "/EditProfile") {
      window.scrollBy(0, 750);
    } else {
      window.scrollBy(0, 0);
    }
  }, [router.pathname]);

  const handleFreeSubscription = (freePkgId) => {
    axiosNodeApi
      .post(
        "/payments/subscription",
        {
          email: values.email,
          package_id: freePkgId
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setSuccesModel2(true);
        } else {
          message.error("Something went wrong!");
        }
      });
  };

  return (
    <div>
      {!custom && <Navbar />}

      <div className="container-fluid theme_bg p-5">
        <div className="py-5">
          {!custom && (
            <div className="mb-5">
              <PersonalInfo values={2} handleStep={2} />
            </div>
          )}
          <div className="container">
            <div className="col-sm-11 mt-3 mx-auto">
              <div className="row bg-pric brdr_div">
                <div className="uper-color p-4 mb-4">
                  <p className="text-white fs-40 Gothic_3D mb-0 p-4 ms-5 fot-mon">
                    Pick a plan below
                  </p>
                </div>
                <div className="row bg-pric p-3">
                  {loading ? (
                    <Spin />
                  ) : (
                    <>
                      {data.map((x) => {
                        return (
                          <div className="col-sm-4 mx-auto" key={x._id}>
                            <Price
                              setSuccesModel={setSuccesModel}
                              setSuccesModel2={setSuccesModel2}
                              Name={x.name}
                              Packages={x.packageType}
                              Amount={x.price}
                              Tags={x.options}
                              id={x._id}
                              custom={custom}
                              pkgId={pkgId}
                              options={x.options}
                              userPackageId={userPackageId}
                              handleFreeSubscription={handleFreeSubscription}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <CustomModal
            title="Succefull"
            isModalVisible={succesModel}
            handleOk={nextStep}
            closable={false}
          >
            <div className="p-5">
              <p className="fs-22 text-white text-center p-5">
                Your Account Has Been Created Succefully
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
          <CustomModal
            title="Succefull"
            isModalVisible={succesModel2}
            handleOk={nextStep}
            closable={false}
          >
            <div className="p-5">
              <p className="fs-22 text-white text-center p-5">
                You have successfully updated your subscription
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
          <CustomModal
            title="Error"
            isModalVisible={errorModel}
            handleOk={prevStep}
            handleClose={() => setErrorModel(false)}
            closable={true}
          >
            {error}
          </CustomModal>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
