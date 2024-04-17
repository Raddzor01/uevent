import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import styles from "../styles/LoginForm.module.css";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <Container
      fluid
      className={`d-flex justify-content-center align-items-center ${styles.container}`}
    >
      <Form
        onSubmit={isLoginForm ? handleLogin : null}
        className={`bg-dark p-4 rounded-lg shadow-lg text-light ${styles.form}`}
      >
        <h2 className="mb-4 text-center">
          {isLoginForm ? "Login" : "Register"}
        </h2>

        {/* Login field */}
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="bg-dark text-light mb-3"
          />
        </Form.Group>

        {/* Email field */}
        {!isLoginForm && (
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-dark text-light mb-3"
            />
          </Form.Group>
        )}

        {/* Password field */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-dark text-light mb-3"
          />
        </Form.Group>

        {/* Additional field for password confirmation in registration form */}
        {!isLoginForm && (
          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              className="bg-dark text-light mb-3"
            />
          </Form.Group>
        )}

        {/* Submit button */}
        <Button
          variant="info"
          type="submit"
          className={`${styles.submitButton}`}
        >
          {isLoginForm ? "Login" : "Register"}
        </Button>

        <Button variant="link" className={`${styles.customButton}`}>
          Forgot your password?
        </Button>

        {/* Toggle form button */}
        <Button
          variant="link"
          onClick={handleToggleForm}
          className={`${styles.customButton}`}
        >
          {isLoginForm ? "Is not Registered?" : "Back to Login"}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
