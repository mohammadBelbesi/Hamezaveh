import React from "react";
import Home from "./pages/Home";
import Footer from "./components/homePage/Footer";
import Header from "./components/homePage/Header";
import Cart from "./pages/Cart";
import AboutPage from "./pages/AboutUs";
// import LoginPage from "./pages/LoginPage";
import {ShoppingPage} from "./pages/ShoopingPage/ShoppingPage";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";


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
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
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