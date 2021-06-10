import { useState } from "react";
import { signUp } from "../auth/index";
import { Link } from "react-router-dom";
import classes from './UserForm.module.css'

import Layout from "../core/Layout";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const SignUpForm = () => {
    return (
      <form className={classes.auth}>
        <div className={classes.control}>
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          ></input>
        </div>
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

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New Account is created. Please <Link to="/signin">Sign In</Link>
      </div>
    );
  };
  return (
    <Layout
      title="SignUp Page"
      description="This is Sign Up Page"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {SignUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
