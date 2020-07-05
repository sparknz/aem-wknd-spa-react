import React from "react";
import wkndLogoDark from "../../media/wknd-logo-dk.png";

export default () => {
  return (
    <header className="Header">
      <div className="Header-container">
        <div className="Logo">
          <img className="Logo-img" src={wkndLogoDark} alt="WKND SPA" />
        </div>
      </div>
    </header>
  );
};
