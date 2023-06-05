import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { Button } from "react-bootstrap";


const ForggotP = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { ForggotPass } = useUserAuth();
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ForggotPass(email);
      setMessage("המייל לשחזור סיסמה נשלח לך בהצלחה ");// Send the password reset email using Firebase
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Delay navigation for 2 seconds
    } catch (error) {
      setMessage("!נא לבדוק שהמייל תקין");
      console.log("Error:", error)

    } 
  };

  return (
    <div className="p-4 box">
      <h2 className="mb-3" >  שחזור סיסמה </h2>

      {message && <div>{message}</div>}
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="מייל"
            required
          />
           </Form.Group>

        
        <Button variant="primary" className = "button" type="Submit">
          אישור
        </Button>
      </Form>
    </div>
  );
};

export default ForggotP;