import React from "react";

const Third = ({ page, setPage, formData, setFormData }) => {
  return (
    <form>
      <h4>Enter OTP</h4>

      <input type="text" maxLength={6} />

      <div className="next-prev-btn">
        <button
          className="button"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={() => {
            alert("You've successfully Created an Account");
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Third;
