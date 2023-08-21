/* eslint-disable */

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import CsLineIcons from "../../cs-line-icons/CsLineIcons";
import LayoutPage from "../../Components/Auth/LayoutPage";
import { API } from "../../string";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const title = "Login";
  const description = "Login Page";

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 chars!")
      .required("Password is required"),
  });
  const initialValues = { email: "", password: "" };
  const onSubmit = (values) => {
    axios.post(`${API}/auth`, {
        email: values.email,
        password: values.password
    }).then((res)=>{
        toast.success(res.data.message)
        localStorage.setItem("clarktoken", res.data.data.token)
        navigate("/dashboard")
    }).catch((error)=>{
        toast.error(error.response.data.message)
    })
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div
      className=""
      style={{
        backgroundColor:"#1ea8e7",
        width: "100%",
        padding: 35,
        height: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <div
        className="w-100 w-lg-75 w-xxl-50"
        style={{
          height: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Clark SaaS</h1>
            <h1 className="display-3 text-white">
              Ecommerce platform to register your business
            </h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            Dynamically target high-payoff intellectual capital for customized
            technologies. Objectively integrate emerging core competencies
            before process-centric communities...
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div
      className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border"
      style={{ height: "100vh" }}
    >
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          {/* <NavLink to="/">
            <div className="logo-default" />
          </NavLink> */}
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
          <p className="h6">
            If you are not a member, please{" "}
            <NavLink to="/onboard">register</NavLink>.
          </p>
        </div>
        <div>
          <form
            id="loginForm"
            className="tooltip-end-bottom"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <div className="d-block invalid-tooltip">{errors.email}</div>
              )}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Password"
              />
              <NavLink
                className="text-small position-absolute t-3 e-3"
                to="/forgot-password"
              >
                Forgot?
              </NavLink>
              {errors.password && touched.password && (
                <div className="d-block invalid-tooltip">{errors.password}</div>
              )}
            </div>
            <Button size="lg" type="submit" className="bg-primary">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <LayoutPage left={leftSide} right={rightSide} />
    </>
  );
};

export default LoginPage;
