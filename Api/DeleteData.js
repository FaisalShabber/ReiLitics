import Password from "antd/lib/input/Password";
import { axiosInstance } from "../pages/_app";

class DeleteData {
  constructor() {
    this.result = [];
  }

  DeleteNote = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .delete(`/note/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function (error) {});
      return resp;
    };
    return res();
  };
  DeleteFavourite = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .delete(`/favorite/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .catch(function (error) {});
      return resp;
    };
    return res();
  };
  Return() {
    return this.result;
  }
}
export default new DeleteData();
