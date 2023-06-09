import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../../loginAboutUs.css";
import { useDispatch } from "react-redux";
import { setEmailf, setMember, setLogin } from "../../redux/bazarSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  let login = useSelector((state) => state.bazar.isLogin);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email)
    dispatch(setEmailf(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);
      console.log("login" + login);

      const a = collection(database, "users"); // checking if input email is an Admin
      const b = query(a, where("email", "==", email));
      const c = await getDocs(b);
      if (c.size > 0) {
        const userDoc = c.docs[0];
        const userData = userDoc.data();
        dispatch(setMember(userData.isMember));
      }

      const usersCollectionRef = collection(database, "users"); // checking if input email is an Admin
      const q = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        if (userData.isAdmin  )  { 
          console.log(email);
        // here is the checking if user or admin to route it
          navigate("/admin");
        } else {
          navigate("/home");
          dispatch(setLogin(true));

          console.log(email);
        }
      } else {
        setError("Error logging in. Please try again.");
      }
    } catch (err) {
      setError("נא לוודא שהמייל וסיסמה תקינים  !");
    }
  };



  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">כניסה למערכת</h2>
        <Form onSubmit={handleSubmit}>
          <div className={error ? "error-message" : "normal-message"}>
            {error}
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="מייל"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="סיסמה"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" className="button" type="submit">
              כניסה למערכת
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          אין לך חשבון ?<Link to="/signup" style={{ color: "black" }}>
            הרשמה
          </Link>{" "}
          או{" "}
          <Link to="/forgotpassword" style={{ color: "black" }}>
            שכחתי סיסמה
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
