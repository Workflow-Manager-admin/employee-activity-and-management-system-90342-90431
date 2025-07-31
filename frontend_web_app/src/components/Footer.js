import React from "react";

/**
 * PUBLIC_INTERFACE
 * Footer component showing brand copyright only.
 */
function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} TATA ELXSI
    </footer>
  );
}

export default Footer;
