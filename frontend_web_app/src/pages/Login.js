import React from "react";
import SignInForm from "../components/SignInForm";
import "../components/SignInForm.css";

/**
 * PUBLIC_INTERFACE
 * Enhanced login page with properly aligned sign-in form.
 * Uses dedicated SignInForm component for better maintainability and responsive design.
 */
function Login() {
  return <SignInForm />;
}

export default Login;
