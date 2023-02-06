import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useGoTop from "./../api/useGoTop";
import { useDispatch } from "react-redux";
import { signUpApi } from "../features/authSlice";
import { Form, Button, FloatingLabel } from "react-bootstrap";

function Signup() {
  /* TODO need exam the validation */
  const location = useLocation();

  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  /*  
  這邊是為了配合動態更新第二次驗證密碼才使用useRef獲取節點value
  全部用一個obj,useState更新,包起來可能比較方便
  */
  const nameRef = useRef();
  const emailtRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useGoTop(location);
  useEffect(() => {
    if (validated && passwordRef.current?.value) {
      passwordConfirmRef.current.pattern = passwordRef.current?.value;
    }
  }, [validated, passwordRef.current?.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);
    if (e.currentTarget.checkValidity() === true) {
      const payload = {
        name: nameRef.current.value,
        email: emailtRef.current.value,
        password: passwordRef.current.value,
        passwordConfirm: passwordConfirmRef.current.value,
      };
      dispatch(signUpApi(payload));
    } else {
      return;
    }
  };

  return (
    /* placeholder is requied but not work when float label implment */
    <div
      className="d-flex flex-column align-items-center justify-content-center mt-4"
      style={{ height: "75vh" }}
    >
      <div className="fs-3">會員註冊</div>
      <Form
        className="border rounded border-primary mt-3 p-4"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <FloatingLabel controlId="formBasicName" label="請輸入名稱">
            <Form.Control
              ref={nameRef}
              type="text"
              placeholder="請輸入名稱"
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$"
              title="名稱須為6-12個字,僅限英文大小寫及數字"
              onChange={() => {
                setValidated(false);
              }}
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            名稱須為6-12個字,僅限英文大小寫及數字
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="formBasicEmail" label="請輸入信箱">
            <Form.Control
              ref={emailtRef}
              type="email"
              placeholder="name@example.com"
              required
              title="ex:name@example.com"
              onChange={() => {
                setValidated(false);
              }}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="formBasicPassword" label="請輸入密碼">
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="請輸入密碼"
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$"
              title="密碼須為8-12個字,僅限英文大小寫及數字"
              onChange={() => {
                setValidated(false);
              }}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <FloatingLabel
            className="123"
            controlId="formBasicPasswordConfirm"
            label="請再次輸入密碼"
          >
            <Form.Control
              ref={passwordConfirmRef}
              type="password"
              placeholder="請再次輸入密碼"
              required
              /* 密碼和2次驗證相符&&密碼驗證OK */
              title="請再次確認密碼"
              onChange={() => {
                setValidated(false);
              }}
            />
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit">
          註冊
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
