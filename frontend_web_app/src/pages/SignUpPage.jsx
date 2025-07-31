import React from "react";
import SignUpForm from "../components/SignUpForm";
import "../components/SignInForm.css";

/**
 * PUBLIC_INTERFACE
 * Sign-up page component that renders the sign-up form.
 * Uses the same styling as the sign-in page for consistency.
 */
function SignUpPage() {
  return (
    <div className="signin-page">
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
