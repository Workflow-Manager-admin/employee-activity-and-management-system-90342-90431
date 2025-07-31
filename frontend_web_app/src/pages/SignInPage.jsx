import React from "react";
import SignInForm from "../components/SignInForm";
import "../components/SignInForm.css";

/**
 * PUBLIC_INTERFACE
 * Dedicated sign-in page with proper responsive layout and form alignment.
 * Ensures email and password fields are properly sized and aligned within the container.
 */
function SignInPage() {
  return (
    <div className="signin-page">
      <SignInForm />
    </div>
  );
}

export default SignInPage;
