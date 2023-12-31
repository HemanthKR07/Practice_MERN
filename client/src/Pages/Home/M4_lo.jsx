import React from "react";
import "./M4_lo.css";

function M4_lo() {
  function toPurchase() {
    window.location.href = "/purchaseplus";
  }
  return (
    <>
      <div className="block_4">
        <h3 className="h3_4">
          Coursera <div className="p">Plus</div>
        </h3>
        <p className="p_4">
          Unlimited access to 7,000+ world-class courses, hands-on projects, and
          job-ready certificate programs—all included in your subscription
        </p>
        <p className="p1_4">₹4,912/month, cancel anytime</p>
        <button id="btn_4" onClick={toPurchase}>
          Start 7-day Free Trial
        </button>
        {/* link */}
        <p className="p2_4">or ₹33,220/year with 14-day money-back guarantee</p>
      </div>
    </>
  );
}

export default M4_lo;
