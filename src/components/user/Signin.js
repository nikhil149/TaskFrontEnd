import { useState } from "react";
import { signIn, authenticate, isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";
import classes from "./UserForm.module.css";

import Layout from "../core/Layout";
const Signin = () => {
  const [values, setValues] = useState({
    email: "nikhil123@gmail.com",
    password: "Nikhil#123",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const SignInForm = () => {
    return (
      <form className={classes.auth}>
        <div className={classes.control}>
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            value={email}
            className="form-control"
          ></input>
        </div>
        <div className={classes.control}>
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            value={password}
            className="form-control"
          ></input>
        </div>
        <button onClick={clickSubmit} type="button" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
    // console.log("Hi Helow")
  };
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user) {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Sign In Page"
      description="This is Sign In Page"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {SignInForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default Signin;
