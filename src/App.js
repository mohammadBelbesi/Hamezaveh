import React from "react";
import SignupPage from "./pages/SignupPage";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Home from "./pages/Home";
import Footer from "./components/homePage/Footer";
import Header from "./components/homePage/Header";
import Cart from "./pages/Cart";
import AboutPage from "./pages/AboutUs";
import ForgotPage from "./pages/ForgotPage";
import LoginPage from "./pages/LoginPage";
import { ShoppingPage } from "./pages/ShoopingPage/ShoppingPage";
import Admin from "./admin/Admin";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  Routes,
  Route,
} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
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
              <Route path="/" element={<LoginPage />} />
              {/* <Route path="/forggot password" element={<Forggot />} /> */}
              {/* <Route path="/signup" element={<Signup />} /> */}
            </Routes>
          </UserAuthContextProvider>
        ),
      },

      {
        path: "/forgotpassword",
        element: (
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<ForgotPage />} />
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
              <Route path="/" element={<SignupPage />} />
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
      {
        path: "/admin/qowiuepr%&$qwej82309148zcmxv-nczxvnjkla&d%&$as&djkd-naosd879-23nmNFJ-AKSDL-FNFND-JASLFN%&$ALNF-U983$24732-47%&$67NKA-NSM%&$$ASFD-ASDFAD%&$$F883-283877KK$KLMV%&$NDG$HYKE9/*",
        element: <Admin />,
      },
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
