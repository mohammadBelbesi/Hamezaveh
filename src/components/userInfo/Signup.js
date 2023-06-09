
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "../../loginAboutUs.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
    await signUp(email, password);

      const user = {
        firstname: firstname, 
        lastname:lastname, // Get the user's name from the input field
        email: email,
        phone: phoneNumber,
        isMember : false, // Get the user's phone from the input field
        isAdmin: false
      };
      await addDoc(collection(database, "users"), user); // Add user to the "users" collection
      navigate("/login");
      
    } catch (err) {
      setError(" נא לוודא שכל השדות תקינות! ");
      return;
    }
  };

  


  return (
    <>
      <div className="p-4 box">
        
        <h2 className="mb-3">הרשמה</h2>
        
        <div className={error ? "error-message" : "normal-message"}>{error}</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Control
              type="text"
              required
              placeholder="שם משתמש"
              onChange={(e) => setFirstName(e.target.value)}
             
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              required
              placeholder="שם משפחה"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              required
              placeholder="סיסמה"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          
          <Form.Group className="mb-3" >
            <Form.Control
              type="tel"
              required
              placeholder="מס טלפון"
              onChange={(e) => setPhoneNumber(e.target.value)} // Updated to set phone number
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="Email"
              required
              placeholder="מייל"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          
          


          <div className="d-grid gap-2">
            <Button variant="primary" className = "button" type="Submit">
             אישור
            </Button>
          </div>
        </Form>
        <br/>
        <div>
          יש לך כבר חשבון ?<Link to="/login" className="link-text" >כניסה למערכת</Link>
      </div>
      </div>
      
    </>
  );
};

export default Signup;