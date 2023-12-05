import Password from "antd/lib/input/Password";
import { axiosInstance } from "../pages/_app";

class Acount {
  constructor() {
    this.result = [];
  }

  Registeration = (data, id, settingErrors) => {
    // alert('1')
    const res = async () => {
      const resp = await axiosInstance
        .post("/users", {
          firstName: data.firstName,
          lastName: data.familyName,
          city: data.city,
          state: data.state,
          dob: data.dob,
          phone: data.phone,
          image: data.profilePic,
          packageID: data.pkgId,
          email: data.email,
          password: data.password,
        })

        .catch(function(error) {
          alert("2");
          settingErrors(error.response.data.message);
        });
      return resp;
    };
    return res();
  };
  Login = (username, password, setError, setModel, setOtpModal) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/users/login", {
          email: username,
          password: password,
        })

        .catch(function(error) {
          setError(error.response.data.message);
          if (
            error.response.data.message ==
            "Your email is not verified. Kindly check your email for code verification"
          ) {
            setOtpModal(true);
          } else setModel(true);
        });
      return resp;
    };
    return res();
  };
  Contact = (userInput, setError, errorModel) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/contacts", {
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          phone: "0323233323",
          email: userInput.email,
          subject: userInput.subject,
          message: userInput.message,
        })

        .catch(function(error) {
          setError(error.response.data.message);
          errorModel(true);
        });
      return resp;
    };
    return res();
  };
  EnterEmail = (email, setError, errorModal) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/users/sendcode", {
          email: email,
        })

        .catch(function(error) {
          setError(error.response.data.message);
          errorModal(true);
        });
      return resp;
    };
    return res();
  };
  verifyOtp = (email, otp, setError) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/users/verifycode", {
          email: email,
          confirmation_code: otp,
        })

        .catch(function(error) {
          // alert(1)
          setError(error.response.data.message);
        });
      return resp;
    };
    return res();
  };
  confirmPassword = (Password, otp, email, setError, setErrorModel) => {
    const res = async () => {
      const resp = await axiosInstance
        .put("/users/changepassword", {
          email: email,
          confirmation_code: otp,
          newPassword: Password,
        })

        .catch(function(error) {
          setError(error.response.data.message);
          errorModal(true);
        });
      return resp;
    };
    return res();
  };
  userValidation = (
    firstName,
    lastName,
    email,
    password,
    state,
    country,
    DOB,
    region,
    Error
  ) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/users/verifysignup", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          country: country,
          state: state,
          region: region,
          dob: DOB,
        })

        .catch(function(error) {
          Error(error.response.data.message);
          errorModal(true);
        });
      return resp;
    };
    return res();
  };
  updateAccount = (
    userId,
    firstName,
    lastName,
    email,
    password,
    state,
    country
  ) => {
    const res = async () => {
      const resp = await axiosInstance
        .put(`users/${userId}`, {
          email: email,
          confirmation_code: otp,
          newPassword: Password,
        })

        .catch(function(error) {
          setError(error.response.data.message);
          errorModal(true);
        });
      return resp;
    };
    return res();
  };

  Return() {
    return this.result;
  }
}
export default new Acount();
