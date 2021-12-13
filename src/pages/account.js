import React from "react"
import { Link } from "gatsby"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}

const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }
  const user = getProfile()

  return (
    <BrowserRouter>
      <nav>
        <Link to="/account">Home</Link>{" "}
        <Link to="/account/settings">Settings</Link>{" "}
        <Link to="/account/billing">Billing</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Routes>
        <Route path="/account" element={<Home user={user} />} />
        <Route path="/account/settings" element={<Settings />} />
        <Route path="/account/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Account
