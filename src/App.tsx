import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AccountList from "./pages/AccountList";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import { useNavigate, useLocation } from "react-router-dom";
import storage from "./utils/storage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const token = storage.get("TOKEN");
    if (token !== null && pathname === "/") navigate("/accounts");
    else if (token === null) navigate("/");
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/accounts" element={<AccountList />} />
    </Routes>
  );
}

export default App;
