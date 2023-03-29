import React from "react";

const First = ({ page, setPage, formData, setFormData }) => {
  return (
    <form>
      <h3>Create Account</h3>
      <h4>Personal Details</h4>

      <input
        type="text"
        placeholder="Name"
        value={formData.name} //setting the value of the form to the props value
        onChange={
          (e) => setFormData({ ...formData, name: e.target.value }) //setting the formData to the value input of the textfield
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email} //setting the value of the form to the props value
        onChange={
          (e) => setFormData({ ...formData, email: e.target.value }) //setting the formData to the value input of the textfield
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password} //setting the value of the form to the props value
        onChange={
          (e) => setFormData({ ...formData, password: e.target.value }) //setting the formData to the value input of the textfield
        }
      />
      <button
        className="button"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </form>
  );
};

export default First;
