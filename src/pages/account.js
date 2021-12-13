import React from "react"
import { Link } from "gatsby"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => (
  <BrowserRouter>
    <nav>
      <Link to="/account">Home</Link>{" "}
      <Link to="/account/settings">Settings</Link>{" "}
      <Link to="/account/billing">Billing</Link>{" "}
    </nav>
    <Routes>
      <Route path="/account" element={<Home />} />
      <Route path="/account/settings" element={<Settings />} />
      <Route path="/account/billing" element={<Billing />} />
    </Routes>
  </BrowserRouter>
)

export default Account
