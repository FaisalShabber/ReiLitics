// HOC/withAuth.jsx
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    // checks whether we are on client / browser or server.
    const Router = useRouter();
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/Login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };

  // Add a display name to the component for easier debugging
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component"})`;

  return ComponentWithAuth;
};

export default withAuth;
