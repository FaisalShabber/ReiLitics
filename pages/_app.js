import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { hotjar } from "react-hotjar";
import TagManager from "react-gtm-module";

// axios.defaults.baseURL = "https://d568-111-119-187-15.ngrok-free.app/api";
export const axiosInstance = axios.create({
  baseURL: 'https://admin.reilitics.com/api',
});

axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful (status code 2xx), just return it as is
    return response;
  },
  (error) => {
    // Check if the error response has a status code of 401
    if (error.response && error.response.status === 401 && (window.location.pathname !== '/Login')) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// axios.defaults.baseURL = "http://localhost:8000/api";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
    import("bootstrap/dist/js/bootstrap");
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }, []);

  return (
    <div className="my-global-styles">
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=484921740118151&autoLogAppEvents=1"
        nonce="ej3CNUd8"
      ></Script>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
