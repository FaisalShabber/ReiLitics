import { GoogleLogin } from "react-google-login";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const client_id =
  "315705813496-1jutaj22ffa1qtgveugj0pr7ibfdhjfo.apps.googleusercontent.com";
export const GoogleSignIn = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: "profile",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const googleSuccess = (response) => {
    console.log(response.profileObj);
  };

  const googleError = (error) => {
    console.error(error);
  };
  return (
    <GoogleLogin
      clientId={client_id}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className={"google-btn"}
        >
          <img
            src={"squareGmail.svg"}
            className="ms-3 s-social google-social-image"
            alt="facebook"
          />
        </button>
      )}
      buttonText={undefined}
      onSuccess={googleSuccess}
      //   autoLoad={false}
      onFailure={googleError}
      //   cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSignIn;
