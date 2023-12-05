import React, { useEffect, useState } from "react";
import SidebarDesktop from "./sidebar.desktop";
import SidebarMobile from "./sidebar.mobile";

const NewSidebar = () => {
  const [user, setUser] = useState("");
  const [menuCollapse, setMenuCollapse] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setMenuCollapse(true);
    } else {
      setMenuCollapse(false);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    handleResize(); // Set initial menu collapse value

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return menuCollapse ? (
    <SidebarMobile user={user} />
  ) : (
    <SidebarDesktop user={user} />
  );
};

export default NewSidebar;
