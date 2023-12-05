import TwitterLogin from "react-twitter-login";

// TODO: change this with actual twitter consumer keys
/**
 * @type {string|undefined}
 */
const consumerKey = undefined;

export const TwitterSignIn = () => {
  const authHandler = (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
  };

  const twitterIcon = (
    <img
      src={"squareTwitter.svg"}
      className="ms-3 s-social twitter-login-image"
      alt="facebook"
    />
  );

  if (!consumerKey) {
    return twitterIcon;
  }

  return (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey={consumerKey}
      consumerSecret={"CONSUMER_SECRET"}
      className="twitter-login"
      disabled
    >
      {twitterIcon}
    </TwitterLogin>
  );
};

export default TwitterSignIn;
