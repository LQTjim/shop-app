import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGoTop from "./../api/useGoTop";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, initialize } from "../features/authSlice";
import { BiCommentError } from "react-icons/bi";
import { Form, Button, FloatingLabel } from "react-bootstrap";

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [user, setUser] = useState({});
  const hasErrorHint = status === "REJECTED" || false;

  useGoTop(location);
  useEffect(() => {
    return () => {
      if (status === "REJECTED") {
        dispatch(initialize());
      }
    };
  }, [status, dispatch]);

  function handleUser(payload) {
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
  }
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
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
          <Button variant="primary" type="submit">
            登入
          </Button>
          {hasErrorHint ? (
            <spsn>
              <BiCommentError size={28} color="red" />
              <span className="text-danger"> 帳號或密碼錯誤</span>
            </spsn>
          ) : null}
        </div>
      </Form>
    </div>
  );
}

export default Login;