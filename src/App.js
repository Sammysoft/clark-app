/* eslint-disable */
import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router";
import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/Authentication/Login";
import OnboardPage from "./Pages/Authentication/Onboard";
import { AuthContext } from "./Context/AuthContext";
import ProductPage from "./Pages/Products/ProductListPage";
import ProductDetailsPage from "./Pages/Products/ProductDetailsPage";
import StoreFrontPage from "./Pages/StoreFrontPage";

function App() {
  const [user, setUser] = useState({});
  const authContext = useMemo(() => {
    return {
      _setUser: (data) => {
        setUser(data);
      },
      _getUser: user,
    };
  });
  

  return (
    <>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/auth" exact element={<LoginPage />} />
        <Route path="/onboard" exact element={<OnboardPage />} />
        <Route
          path="/dashboard"
          exact
          element={
            <AuthContext.Provider value={authContext}>
              <DashboardPage />
            </AuthContext.Provider>
          }
        />
        <Route
          path="/store-products"
          exact
          element={
            <AuthContext.Provider value={authContext}>
              <StoreFrontPage />
            </AuthContext.Provider>
          }
        />
        {/* <Route
          path="/products"
          exact
          element={
            <AuthContext.Provider value={authContext}>
              <ProductPage />
            </AuthContext.Provider>
          }
        />
        <Route
          path="/product-details"
          exact
          element={
            <AuthContext.Provider value={authContext}>
              <ProductDetailsPage />
            </AuthContext.Provider>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
