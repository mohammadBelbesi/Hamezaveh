import React from "react";
<<<<<<< HEAD
=======
import Home from "./pages/Home";
import Footer from "./components/homePage/Footer";
import Header from "./components/homePage/Header";
import Cart from "./pages/Cart";
import AboutPage from "./pages/AboutUs";
// import LoginPage from "./pages/LoginPage";
import {ShoppingPage} from "./pages/ShoopingPage/ShoppingPage";

>>>>>>> 94029e0968b54c0f80493f7ecda82179fecdac7c
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  Routes,
  Route,
} from "react-router-dom";
 import SignupPage from "./pages/SignupPage";
// import Forggot from "./components/ForggotP";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Home from "./pages/Home";
import Footer from "./components/homePage/Footer";
import Header from "./components/homePage/Header";
import Cart from "./pages/Cart";
import AboutPage from "./pages/AboutUs";
import ForggotPage from "./pages/ForggotPage";
import LoginPage from "./pages/LoginPage";
import { ShoppingPage } from "./pages/ShoopingPage/ShoppingPage";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: (
                <UserAuthContextProvider>
                  <Routes>
                    <Route
                      path="/"
                      element={
                       
                          <LoginPage />
                     
                      }
                    />
                    {/* <Route path="/forggot password" element={<Forggot />} /> */}
                    {/* <Route path="/signup" element={<Signup />} /> */}
                  </Routes>
                </UserAuthContextProvider>
             
        ),
      },

      {
        path: "/forggotpassword",
        element: (
                <UserAuthContextProvider>
                  <Routes>
                    <Route
                      path="/"
                      element={
                       
                          <ForggotPage />
                     
                      }
                    />
                    {/* <Route path="/forggot password" element={<Forggot />} /> */}
                    {/* <Route path="/signup" element={<Signup />} /> */}
                  </Routes>
                </UserAuthContextProvider>
             
        ),
      },


      {
        path: "/signup",
        element: (
                <UserAuthContextProvider>
                  <Routes>
                    <Route
                      path="/"
                      element={
                       
                          <SignupPage />
                      }
                    />
                    {/* <Route path="/forggot password" element={<Forggot />} /> */}
                    {/* <Route path="/signup" element={<Signup />} /> */}
                  </Routes>
                </UserAuthContextProvider>
             
        ),
      },
      {
        path: "/home",
        element: <Home />,
      },
    
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      
      {
        path: "/shop",
        element: <ShoppingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      // {
      //   path: "/login",
      //   element: <LoginPage />,
      // },
    ],
  },
]);

function App() {
  return (
    
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
