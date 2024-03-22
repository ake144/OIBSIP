import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [notAUser, setNotAUser] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3001/api/forgotPassword", values);
        if (response.status === 200) {
          setShowModal(true);
        } else {
          toast.error("Server error");
        }
      } catch (error) {
        if (error.response.status === 404) {
          setNotAUser(true);
        } else {
          toast.error("Server error");
        }
      }
    },
  });

  return (
    <div className="custom-body">
      <div className="custom-login-container">
        <p className="text-2xl justify-center items-center">Recover Account</p>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <button type="submit">Submit</button>
        </form>
      </div>
      {notAUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setNotAUser(false)}>
              &times;
            </span>
            <p className="user-verified">You need to sign up first!</p>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close text-red-500" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="modal-custom-container">
              <p className="text-sm ">Password reset link sent to your email.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
