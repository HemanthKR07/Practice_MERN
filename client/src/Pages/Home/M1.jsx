import React from "react";
import Button from "@mui/material/Button";
import "./M1.css";
import bki from "C:\\Users\\Hemanth KR\\OneDrive\\Desktop\\Practice\\client\\src\\images\\1.png";

function M1() {
  function toPurchase() {
    window.location.href = "/purchaseplus";
  }
  return (
    <>
      <div className="main11">
        <h3 className="h3_1">Coursera Plus</h3>
        <h5 className="h5_1">
          Unlimited access to 7,000+ world-class courses, hands-on projects, and
          job-ready certificate programs—all included in your subscription.
        </h5>
        <img src={bki} alt="background-image" class="bk_img" />
        <Button id="btn" variant="outlined" onClick={toPurchase}>
          Try Now
        </Button>
      </div>
    </>
  );
}

export default M1;
