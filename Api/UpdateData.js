import Password from "antd/lib/input/Password";
import { axiosInstance } from "../pages/_app";

class UpdateData {
  constructor() {
    this.result = [];
  }

  EditNotes = (id, title, details) => {
    console.log(details);
    const res = async () => {
      const resp = await axiosInstance
        .put(
          `/note/${id}`,
          {
            title: title,
            detail: details,
            city: "lahore",
            state: "pakistan",
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )

        .catch(function(error) {
          console.error(error.response);
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
export default new UpdateData();
