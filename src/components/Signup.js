import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUpApi } from "./../features/authSlice";
import { Form, Button, InputGroup, FloatingLabel } from "react-bootstrap";

function Signup() {
  /* TODO need exam the validation */
  const [validated, setValidated] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailtRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      const payload = {
        name: nameRef.current.value,
        email: emailtRef.current.value,
        password: passwordRef.current.value,
        passwordConfirm: passwordConfirmRef.current.value,
      };

      dispatch(signUpApi(payload));
    }

    setValidated(true);
  };

  return (
    /* placeholder is requied but not work when float label implment */
    <div className="d-flex align-items-center justify-content-center mt-5 flex-shrink-0">
      <Form validated={validated} className="border border-primary mt-3 p-4">
        <InputGroup hasValidation>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="formBasicName" label="請輸入帳號">
              <Form.Control
                c
                ref={nameRef}
                type="email"
                placeholder="請輸入帳號"
              />
            </FloatingLabel>

            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
        </InputGroup>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="formBasicEmail" label="請輸入信箱">
            <Form.Control
              ref={emailtRef}
              type="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="formBasicPassword" label="請輸入密碼">
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="請輸入密碼"
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <FloatingLabel
            controlId="formBasicPasswordConfirm"
            label="請再次輸入密碼"
          >
            <Form.Control
              ref={passwordConfirmRef}
              type="password"
              placeholder="請再次輸入密碼"
            />
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          註冊
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
