import React, { useState, useEffect } from "react";
import First from "./First";
import Second from "./Second";
import Third from "./Third";

const SignupForm = ({ onPageChange }) => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    subscriptionType: "",
  });
  console.log(formData);
  const componentList = [
    <First
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,
    <Second
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,
    <Third
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,
  ];
  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);
  return <>{componentList[page]}</>;
};

export default SignupForm;
