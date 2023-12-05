import Password from "antd/lib/input/Password";
import { axiosInstance } from "../pages/_app";

class PostData {
  constructor() {
    this.result = [];
  }

  CreateNewsLetter = (email, settingErrors) => {
    const res = async () => {
      const resp = await axiosInstance
        .post(
          "/newsletter",
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )

        .catch(function(error) {
          settingErrors(error.response.data.message);
        });
      return resp;
    };
    return res();
  };
  AddNotes = (title, detail, region, state) => {
    const res = async () => {
      const resp = await axiosInstance
        .post(
          "/note",
          {
            title: title,
            detail: detail,
            city: region,
            state: state,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )

        .catch(function(error) {
          settingErrors(error.response.data.message);
        });
      return resp;
    };
    return res();
  };
  AddFavouriteCity = (detail, state) => {
    const res = async () => {
      const resp = await axiosInstance
        .post(
          "/favorite",
          {
            regionID: detail.regionID,
            regionName: detail.region,
            state: state,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )

        .catch(function(error) {
          settingErrors(error.response.data.message);
        });
      return resp;
    };
    return res();
  };
  AddFavouriteStats = (id, region, state) => {
    const res = async () => {
      const resp = await axiosInstance
        .post(
          "/favorite",
          {
            regionID: id,
            regionName: region,
            state: state
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .catch(function(error) {
          settingErrors(error.response.data.message);
        });
      return resp;
    };
    return res();
  };
  Return() {
    return this.result;
  }
}
export default new PostData();
