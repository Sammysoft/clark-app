/* eslint-disable */
import React from "react";

const LayoutPage = ({ left, right }) => {
  return (
    <>
      {/* Background Start */}
      <div className="" />
      {/* Background End */}

      <div className="container-fluid p-0 h-100 position-relative">
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height:"100vh"
          }}
        >
          {/* Left Side Start */}
          <div className="" style={{flex:2}}>{left}</div>
          {/* Left Side End */}

          {/* Right Side Start */}
          <div className="" style={{flex: 1}}>{right}</div>
          {/* Right Side End */}
        </div>
      </div>
    </>
  );
};

export default LayoutPage;
