import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Court from "./Component/Courts/Court";
import "./index.css";
import Home from "./Pages/Home";
import Lay from "./Pages/Lay";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/branch" />} />
      <Route path="/branch" element={<Home />} />
      <Route path="/branch/:id" element={<Lay />}>
        <Route path="courts" element={<Court />} />
      </Route>
    </Routes>
  );
}

export default App;
