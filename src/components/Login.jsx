import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGoTop from "./../api/useGoTop";

import { useDispatch, useSelector } from "react-redux";
import { loginApi, initialize } from "../features/authSlice";
import { BiCommentError } from "react-icons/bi";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import PendingModal from "./PendingModal";
import { useFormik } from "formik";
import { loginSchema } from "../yupSchemas";

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const hasErrorHint = status === "REJECTED" || false;

  const { handleBlur, handleSubmit, handleChange, errors, touched } = useFormik(
    {
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: (value) => {
        dispatch(loginApi(value));
        setShow(true);
      },
    }
  );

  useGoTop(location);
  useEffect(() => {
    return () => {
      if (status === "REJECTED") {
        dispatch(initialize());
      }
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (status !== "PENDING") {
      return setShow(false);
    }
  }, [status]);

  /* function handleUser(payload) {
    setUser((prev) => {
      return { ...prev, ...payload };
    });
  }
    function handleSubmit(e) {
    e.preventDefault();

    if (!user?.email || !user?.password) {
      return;
    }
    dispatch(loginApi(user));
    setShow(true);
  } */
  return (
    <div className="d-flex h-75 flex-column align-items-center justify-content-center">
      <div className="fs-4  mb-2">會員登入</div>
      <PendingModal show={show}>登入中，請稍待。</PendingModal>
      <Form className="border rounded p-3" noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-1" controlId="email">
          <FloatingLabel controlId="email" label="請輸入信箱">
            <Form.Control
              type="email"
              placeholder=" "
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FloatingLabel>
        </Form.Group>
        {errors.email && touched.email ? (
          <span className="mb-1 text-danger">
            <BiCommentError size={15} color="red" />
            <span className="text-danger"> {errors.email}</span>
          </span>
        ) : null}
        <Form.Group className="mb-2" controlId="password">
          <FloatingLabel controlId="password" label="請輸入密碼">
            <Form.Control
              type="password"
              placeholder=" "
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FloatingLabel>
        </Form.Group>
        {errors.password && touched.password ? (
          <div className="mb-1 text-danger">
            <BiCommentError size={15} color="red" />
            <span className="text-danger"> {errors.password}</span>
          </div>
        ) : null}
        {hasErrorHint ? (
          <div>
            <BiCommentError size={15} color="red" />
            <span className="text-danger"> 帳號或密碼錯誤</span>
          </div>
        ) : null}
        <Button type="submit" className="w-100">
          登入
        </Button>
        <hr />
        <div className="d-flex justify-content-between align-items-center mt-1">
          <Button
            className="me-1"
            variant="primary"
            type="button"
            onClick={() => {
              dispatch(
                loginApi({
                  email: "312@gmail.com",
                  password: "test1234",
                })
              );
              setShow(true);
            }}
          >
            Admin登入
          </Button>
          <Button
            className="me-1"
            variant="primary"
            type="button"
            onClick={() => {
              dispatch(
                loginApi({
                  email: "testuser123@gmail.com",
                  password: "test1234",
                })
              );
              setShow(true);
            }}
          >
            User登入
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;

/* <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="fs-3">會員登入</div>
      <PendingModal show={show}>登入中，請稍待。</PendingModal>
      <Form
        className="border rounded border-primary mt-3 p-4 "
        noValidate
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="Email">
          <FloatingLabel controlId="Email" label="請輸入信箱">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
              onChange={(e) => {
                handleUser({ email: e.target.value });
              }}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password">
          <FloatingLabel controlId="Password" label="請輸入密碼">
            <Form.Control
              type="password"
              placeholder="請輸入密碼"
              required
              onChange={(e) => {
                handleUser({ password: e.target.value });
              }}
            />
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center">
          <Button className="me-1" variant="primary" type="submit">
            登入
          </Button>

          {hasErrorHint ? (
            <span>
              <BiCommentError size={28} color="red" />
              <span className="text-danger"> 帳號或密碼錯誤</span>
            </span>
          ) : null}
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mt-1">
          <Button
            className="me-1"
            variant="primary"
            type="button"
            onClick={() => {
              dispatch(
                loginApi({
                  email: "312@gmail.com",
                  password: "test1234",
                })
              );
              setShow(true);
            }}
          >
            Admin登入
          </Button>
          <Button
            className="me-1"
            variant="primary"
            type="button"
            onClick={() => {
              dispatch(
                loginApi({
                  email: "testuser123@gmail.com",
                  password: "test1234",
                })
              );
              setShow(true);
            }}
          >
            User登入
          </Button>
        </div>
      </Form>
    </div> */
