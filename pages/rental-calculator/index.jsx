import React, { useCallback, useEffect } from "react";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";

import Head from "next/head";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import CalculatorForm from "../../Component/rental-calclator/calculator-form";
import GetData from "../../Api/GetData";
import CustomModal from "../../Component/Modal";
import Link from "next/link";

const RentalCalculator = () => {
  const [userData, setUserData] = React.useState({});
  const [succesModel, setSuccessModel] = React.useState(false);

  const getUserProfileData = useCallback(() => {
    const response = GetData.UserProfilGet();
    response.then((value) => {
      setUserData(value.data.user?.packageID);
    });
  }, []);

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);
  return (
    <>
      <Head>
        <title>Rental Calculator - REI Litics</title>
      </Head>
      <NewNavbar />
      <div
        className="d-inline-flex w-100 calcu-main"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div
            style={{
              width: "inherit",
              background: "white",
              borderRadius: "23px",
              width: "100%",
              maxWidth: "1148px",
            }}
            className="overflow_class calcu"
          >
            {/* <div className='container'> */}
            <div className="">
              <p className="fs-40 Gothic_3D fot-mon">Rental Calculator</p>
            </div>
            <CalculatorForm
              userData={userData}
              setSuccessModel={setSuccessModel}
            />
          </div>
        </div>

        <CustomModal
          title="Succefull"
          isModalVisible={succesModel}
          closable={false}
        >
          <div style={{ position: 'relative' }}>
            <span 
              style={{ cursor: 'pointer', position: 'absolute', right: '10px', color: 'white' }}
              onClick={() => setSuccessModel(false)}
            >
              X
            </span>
            <div className="p-5">
              <p className="p-5 text-center text-white fs-22">
                Feature available to paid subscribers
              </p>
              <div className="text-center">
                <Link href="/#Prices" passHref>
                  <button className="px-5 mx-auto btn login-button fs-14">
                    Unlock
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default RentalCalculator;
