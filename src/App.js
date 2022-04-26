import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Court from "./Pagess/Courts/Court";
import "./index.css";
import Home from "./Component/Home";
import Lay from "./Component/Lay";
import Member from "./Pagess/Member/Member";
import MemberShip from "./Pagess/Membership/Membership";
import Inventory from "./Component/Inventory";
import Product from "./Pagess/Products/Products";
import MemberDetail from "./Pagess/MemberDetail";
import Category from "./Pagess/Category/Category";
import CourtBooking from "./Pagess/CourtBooking";

function App() {
  return (
    <Routes>
      <Route exact path="/" index element={<Navigate to="/branch" />} />
      <Route path="/branch" element={<Home />} />
      <Route path="/branch/:id" element={<Lay />}>
        <Route path="courts" index element={<Court />} />
        <Route
          path="courts/:courtId/court-booking"
          element={<CourtBooking />}
        />
        <Route path="member" element={<Member />} />
        <Route
          path="member/:memberId/member-details"
          element={<MemberDetail />}
        />
        <Route path="membership" element={<MemberShip />} />
      </Route>
      <Route path="branch/:branchId/inventory/:InvId" element={<Inventory />}>
        <Route index element={<Category />} />
        <Route path="category/:categoryId/products" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
