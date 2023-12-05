import { axiosInstance } from "../pages/_app";
import React from "react";
import { message } from "antd";
class GetData {
  constructor() {
    this.result = [];
  }

  AllPackeges = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/package", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  SinglePackage = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`/package/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  BlogComponent = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/article", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  BlogDetail = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`/article/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  BlogCatagory = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/category", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  GetMerchantId = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/config/paypal", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  AllNotes = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/note", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  NotesDetail = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`/note/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  RentalGrowth = (pageNo, regions) => {
    if (regions === "all") {
      const res = async () => {
        const resp = await axiosInstance
          .get(`/stats/rentalGrowth?pageNumber=${pageNo}`)
          .catch(function(error) {});
        return resp;
      };
      return res();
    } else {
      const res = async () => {
        const resp = await axiosInstance
          .get(`/stats/rentalGrowth?pageNumber=${pageNo}&keyword=${regions}`)
          .catch(function(error) {});
        return resp;
      };
      return res();
    }
  };
  Aprecation = (pageNo, regions) => {
    if (regions === "allStates") {
      const res = async () => {
        const resp = await axiosInstance
          .get(`/stats/appreciation?pageNumber=${pageNo}`)
          .catch(function(error) {});
        return resp;
      };
      return res();
    } else {
      const res = async () => {
        const resp = await axiosInstance
          .get(`/stats/appreciation?pageNumber=${pageNo}&keyword=${regions}`)
          .catch(function(error) {});
        return resp;
      };
      return res();
    }
  };

  AprecationMerged = () => {
    const res = async () => {
      const resp = await axiosInstance.get(`/stats/merged`).catch(function(error) {});
      return resp;
    };
    return res();
  };

  EditGet = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/users/profile", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };

  UserPaymentGet = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/users/getUserPyment", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  UserProfilGet = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/users/profile", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };

  Resource = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/resource", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };

  Podcast = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/podcast", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };

  showNotes = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`/note/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  CountryData = (id) => {
    const res = async () => {
      const resp = await axiosInstance.get("/countries").catch(function(error) {});
      return resp;
    };
    return res();
  };
  StatesData = (country) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`states/${country}`)
        .catch(function(error) {});
      return resp;
    };
    return res();
  };

  Favourite = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/favorite", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  getFavourite = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/favorite", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  NotificationsData = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`/notification/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function(error) {});

      return resp;
    };
    return res();
  };
  Region = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/market/region_names")
        .catch(function(error) {});

      return resp;
    };
    return res();
  };
  MarketRegion = () => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/stats/allStates")
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  RegionId = (regions) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`/stats/appreciation?keyword=${regions}`)
        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  AprecationId = (regions) => {
    const res = async () => {
      const resp = await axiosInstance
        .get(`/stats/appreciation?keyword=${regions}`)
        .catch(function(error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
}
export default new GetData();
