import React from "react";
import { Route, Routes } from "react-router";
import { Home, Notes, User } from "../pages/home/components/NavBarHome";
import UserLayout from "../pages/user/UserLayout";
import AdminLayout from "../pages/admin/AdminLayout";
import HomeLayout from "../pages/home/HomeLayout";
import logo from "../imagenes/logo-removebg-preview.png";
import AuthLayout from "../pages/auth/AuthLayout";
import Register from "../pages/auth/components/Register";
import Login from "../pages/auth/components/Login";
import axios from "axios";

const Router = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://clicklunchrender.onrender.com/api")
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        setData(err);
      });
  }, []);

  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="">
              {!data ? "Loading..." : <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
          </header>
        }
      />
      <Route path="/home" element={<HomeLayout />}>
        <Route index path="" element={<Home />} />
        <Route path="notes" element={<Notes />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="/user" element={<UserLayout />} />
      <Route path="/admin" element={<AdminLayout />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route index path="" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default Router;
