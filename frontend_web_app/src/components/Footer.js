import React from "react";

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Employee Activity & Management System –
      <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        {" "}
        Powered by React
      </a>
    </footer>
  );
}

export default Footer;
