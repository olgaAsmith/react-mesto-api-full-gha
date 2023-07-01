import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const date = new Date();
  return (
    <footer className="footer">
      <p className="footer__copyright">{(location.pathname === "/sign-in" || location.pathname === "/sign-up") ? "" : `© ${date.getUTCFullYear()} Mesto Russia`}
      </p>
    </footer>
  );
}

export default Footer;
