import Layout from "../core/Layout";
import { isAuthenticated, calender } from "../auth/index";
import classes from "./Dashboard.module.css";
import { useState } from "react";
const Dashboard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const [dates, setDates] = useState({
    day: "",
    month: "",
    year: "",
    error: "",
    success: "",
    WeekDay: "",
  });

  const { day, month, year, success, error, WeekDay } = dates;

  const handleChange = (name) => (event) => {
    setDates({ ...dates, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setDates({ ...dates, error: false });
    calender({ day, month, year }).then((data) => {
      //   console.log(dates);
      if (data.error) {
        setDates({ ...dates, error: data.error, success: false });
      } else {
        setDates({
          ...dates,
          day: "",
          month: "",
          year: "",
          success: true,
          WeekDay: data.Day,
        });
        console.log(data);
      }
    });
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{"Registered User"}</li>
        </ul>
      </div>
    );
  };

  const getDay = () => {
    return (
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="dd">DD</label>
          <input
            onChange={handleChange("day")}
            id="dd"
            required
            type="number"
            value={day}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="mm">MM</label>
          <input
            onChange={handleChange("month")}
            id="mm"
            required
            type="number"
            value={month}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="yy">YYYY</label>
          <input
            onChange={handleChange("year")}
            id="yy"
            required
            type="number"
            value={year}
          ></input>
        </div>
        <div className={classes.action}>
          <button type="submit" onClick={clickSubmit}>
            Get WeekDay
          </button>
        </div>
      </form>
    );
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
        Here is the WeekDay {WeekDay}.
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`Good Day ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {showSuccess()}
          {showError()}
          {getDay()}
        </div>
        <div className="col-6">{userInfo()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
