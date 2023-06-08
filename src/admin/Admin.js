import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import {
  eventsColumns,
  flattenedOrdersColumns,
  ordersColumns,
  productsColumns,
  usersColumns,
} from "./data/tableData";
import {
  getEvents,
  getFlattenedOrders,
  getOrders,
  getProducts,
  getUsers,
  updateEvent,
  updateOrder,
  updateProduct,
  updateUser,
} from "./services/firebase";
import {
  getDummyEvents,
  getDummyOrders,
  getDummyProducts,
  getDummyUsers,
} from "./services/dummyFirebase";
import EventPage from "./pages/EventPage";
import Dashboard from "./pages/Dashboard";

function Admin() {
  return (
    // <BrowserRouter>
    <div className="App">
      <Sidenav />
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/products" element={<ProductPage />} />
          {/* <Route
            path="/orders"
            element={
              <AdminPage
                key={2}
                pageName={"Orders"}
                // getObjects={getDummyOrders}
                getObjects={getFlattenedOrders}
                objectsColumns={flattenedOrdersColumns}
                updateObject={updateOrder}
                // updateObject={() => {}}
              />
            }
          /> */}
          <Route
            path="/users"
            element={
              <AdminPage
                key={3}
                pageName={"לקוחות"}
                // getObjects={getDummyUsers}
                getObjects={getUsers}
                objectsColumns={usersColumns}
                updateObject={updateUser}
                // updateObject={() => {}}
              />
            }
          />
        </Routes>
      </div>
    </div>
    // </BrowserRouter>
  );

  // movieList && (
  //   <Table data={movieList} columns={columns} update={updateMovie} />
  // )
}

export default Admin;
