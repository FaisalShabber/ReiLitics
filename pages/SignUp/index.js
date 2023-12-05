import React, { Component } from "react";
import Head from "next/head";
import UserDetails from "../../Component/UserDetail";
import PersonalDetails from "../../Component/PersonalDetails";
import Payment from "../../Component/Payment";
import Success from "../../Component/Success";
import withAuth from "../../Component/unAuth";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import moment from "moment";

class Signup extends Component {
  state = {
    step: 1,
    profilePic: "./User.svg",
    email: "",
    state: "",
    username: "",
    password: "",
    price: -1,
    pkgId: "",
    firstName: "",
    familyName: "",
    DOB: "",
    country: "",
    sendImage: "",
    region: "",
  };

  handleStep = (value) => {
    this.setState({ step: value });
  };

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    if (input == "profilePic") {
      if (e.target.files[0]) {
        this.setState({
          [input]: URL.createObjectURL(e?.target?.files[0]),
          sendImage: e?.target?.files[0],
        });
      }
    } else if (input === "DOB") {
      const selectedDate = moment(e.target.value).format("MM-DD-YYYY");
      this.setState({ [input]: selectedDate });
    } else {
      this.setState({ [input]: e.target.value });
    }
  };

  handleDirectChange = (name, value) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }

  render() {
    const {
      step,
      profilePic,
      sendImage,
      email,
      cardName,
      cvv,
      price,
      pkgId,
      year,
      username,
      password,
      firstName,
      cardNumber,
      familyName,
      state,
      country,
      DOB,
      region,
    } = this.state;
    const values = {
      step,
      profilePic,
      sendImage,
      email,
      cvv,
      price,
      pkgId,
      year,
      cardName,
      username,
      familyName,
      cardNumber,
      state,
      password,
      firstName,
      country,
      DOB,
      region,
    };

    switch (values.step) {
      case 1:
        return (
          <>
            <Head>
              <title>Signup - REI Litics</title>
            </Head>
            <UserDetails
              handleStep={this.handleStep}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleDirectChange={this.handleDirectChange}
              values={values}
            />
          </>
        );
      case 2:
        return (
          <>
            <Head>
              <title>Signup - REI Litics</title>
            </Head>
            <PersonalDetails
              handleStep={this.handleStep}
              prevStep={this.prevStep}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleDirectChange={this.handleDirectChange}
              values={values}
            />
          </>
        );
      case 3:
        return (
          <>
            <Head>
              <title>Signup - REI Litics</title>
            </Head>
            <Payment
              handleStep={this.handleStep}
              prevStep={this.prevStep}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
            />
          </>
        );
      case 5:
        return (
          <>
            <Head>
              <title>Signup - REI Litics</title>
            </Head>
            <Success />
          </>
        );
      default:
      // do nothing
    }
  }
}

export default withAuth(Signup);
