import { cart, loginBlack, loginPerson, logo } from "../../assets/assetsindex";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { setLogin } from '../../redux/bazarSlice';
import { signOut } from "firebase/auth";
import { auth, database } from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
  const [userName, setUserName] = useState("");
  let login = useSelector((state) => state.bazar.isLogin);
  const productData = useSelector((state) => state.bazar.productData);
  const userEmail = useSelector((state) => state.bazar.email);

  const handleButtonClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/home");
        dispatch(setLogin(false));
        console.log("logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLogin(login);
    console.log(login);

    if (login && userEmail) {
      const fetchUserName = async () => {
        const usersCollectionRef = collection(database, "users");
        const q = query(usersCollectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          console.log(userData.name)
          setUserName(userData.firstname);
        }
      };

      fetchUserName();
    }
  }, [login, userEmail]);

  return (
    <div dir="ltr" className="w-full h-36 border-b-[1px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-20">
          {login && (
            <div>

              <BiLogOut
                className="logo w-18 h-16 mx-auto flex gap-20 rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500 shadow-md"
                onClick={handleButtonClick}
                onMouseOver={(e) => { e.target.style.opacity = 0.8; e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)'; }}
                onMouseOut={(e) => { e.target.style.opacity = 1; e.target.style.boxShadow = 'none'; }}
              />
              <span className="ml-2  text-2xl font-light text-white ">Wellcom {userName}</span>

            </div>

              
          )
          }

          <Link to="/login">
           
          {!login && (
            <div className="relative">
              <img
                className="h-16 w-16 mx-auto flex items-center gap-20 rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500 shadow-md"
                src={loginPerson}
                alt="userLogo"
                style={{ transition: 'all 0.3s' }}
                onMouseOver={(e) => { e.target.style.opacity = 0.8; e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)'; }}
                onMouseOut={(e) => { e.target.style.opacity = 1; e.target.style.boxShadow = 'none'; }}
              />
            </div>)}
          </Link>
          <Link to="/cart">
            <div className="relative">
              <img
                className="logo w-18 h-16 mx-auto flex gap-20 rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500 shadow-md"
                src={cart}
                alt="cartImg"
                style={{ transition: 'all 0.3s' }}
                onMouseOver={(e) => { e.target.style.opacity = 0.8; e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)'; }}
                onMouseOut={(e) => { e.target.style.opacity = 1; e.target.style.boxShadow = 'none'; }}
              />

              <span className="zero absolute w-12 h-10 mx-auto top-1 right-1 text-sm flex items-center justify-center font-serif">{productData.length}</span>
            </div>
          </Link>
         
          <ul className="flex items-center gap-20 ">
            <Link to="/about">
              <li className=" hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">אודות</li>
            </Link>
            <Link to="/shop">
              <li className=" hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">חנות</li>
            </Link>
            <Link to="/home">
              <li className=" hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">דף הבית</li>
            </Link>
          </ul>
        </div>
        <Link to="/home">
          <div className="ml-auto">
            <img className="logo w-auto h-36 mx-auto flex" src={logo} alt="logo" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
