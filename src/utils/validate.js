export const checkValidData = (isSignInForm, name, email, password) => {
  if (!isSignInForm) {
    return !(name.trim().length > 2) && "Please enter valid name";
  }

  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

  /*
   * Passwords must be
   * - At least 8 characters long, max length anything
   * - Include at least 1 lowercase letter
   * - 1 capital letter
   * - 1 number
   * - 1 special character => !@#$%^&*
   */
  const isPasswordValid =
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
