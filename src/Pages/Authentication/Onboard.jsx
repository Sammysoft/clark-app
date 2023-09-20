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
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "semantic-ui-react";

const OnboardPage = () => {
  const [load, setLoad] = useState(Boolean);
  const title = "Register";
  const description = "Register Page";

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 chars!")
      .required("Password is required"),
    terms: Yup.bool().required().oneOf([true], "Terms must be accepted"),
  });
  const initialValues = { name: "", email: "", password: "", terms: false };
  const onSubmit = (values) => {
    setLoad(true)
    axios
      .post(`${API}/user/onboard`, {
        full_name: values.name,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        navigate("/auth");
        setLoad(false)
        toast.success(res.data.message);
      })
      .catch((error) => {
        setLoad(false)
        toast.error(error.response.data.message);
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div
      className="banner"
      style={{
        backgroundColor: "#1ea8e7",
        width: "100%",
        padding: 35,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
      className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border long"
      style={{ height: "100vh" }}
    >
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get the ball rolling!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use the form to register.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/auth">login</NavLink>.
          </p>
        </div>
        <div>
          <form
            id="registerForm"
            className="tooltip-end-bottom"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && (
                <div className="d-block invalid-tooltip">{errors.name}</div>
              )}
            </div>
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
              {errors.password && touched.password && (
                <div className="d-block invalid-tooltip">{errors.password}</div>
              )}
            </div>
            <div className="mb-3 position-relative form-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="terms"
                  onChange={handleChange}
                  value={values.terms}
                />
                <label className="form-check-label">
                  I have read and accept the{" "}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
                {errors.terms && touched.terms && (
                  <div className="d-block invalid-tooltip">{errors.terms}</div>
                )}
              </div>
            </div>
            <Button size="lg" type="submit" className="bg-primary">
              {load ? (
                <>
                  <Loader active inline="centered" />
                </>
              ) : (
                <>Signup</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return <LayoutPage left={leftSide} right={rightSide} />;
};

export default OnboardPage;
