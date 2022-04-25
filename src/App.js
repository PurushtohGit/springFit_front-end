import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Court from "./Pagess/Courts/Court";
import "./index.css";
import Home from "./Component/Home";
import Lay from "./Component/Lay";
import Member from "./Pagess/Member/Member";
import MemberShip from "./Pagess/Membership/Membership";
import Inventory from "./Component/Inventory";
import Inven from "./Component/InventoryProduct";

function App() {
  return (
    <Routes>
      <Route exact path="/" index element={<Navigate to="/branch" />} />
      <Route path="/branch" element={<Home />} />
      <Route path="/branch/:branchid" element={<Lay />}>
        <Route path="courts" index element={<Court />} />
        <Route path="member" element={<Member />} />
        <Route path="membership" element={<MemberShip />} />
      </Route>
      <Route path="/branch/:id/inventory/:id/" element={<Inventory />}>
        <Route path="category/:categoryid/products" element={<Inven />} />
      </Route>
    </Routes>
  );
}

export default App;
