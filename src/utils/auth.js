
import auth0 from "auth0-js"
import { navigate } from "gatsby"

const isBrowser = typeof window !== "undefined"

const auth = isBrowser
  ? new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    redirectUri: process.env.AUTH0_CALLBACK,
    responseType: "token id_token",
    scope: "openid profile email",
  })
  : {}

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  auth.authorize()
}

const setSession = (cb = () => { }) => (err, authResult) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    // navigating back to "/account", is really primitive and is not production
    // worthy. This would have to be replaced with something more sensible.
    //
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", true)
    navigate("/account")
    cb()
  }
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }

  auth.parseHash(setSession())
}

export const getProfile = () => {
  console.log(`=== getting user profile '${JSON.stringify(user, null, "  ")}'... ===`);

  return user
}

export const silentAuth = callback => {
  // "It would be nice if, when the user refreshed the page, the app remembered if the
  // user was logged in.The isLoggedIn flag in local storage is part of the solution,
  // but there are no tokens or user profile information on refresh.It's bad practice
  // to store these in local storage. To solve this, Auth0 provides a checkSession
  // function that checks whether a user is logged in and, if so, returns valid tokens
  // and user profile information for use in the application without requiring user
  // interaction."
  //
  if (!isAuthenticated()) {
    return callback()
  }
  auth.checkSession({}, setSession(callback))
}

export const logout = () => {
  localStorage.setItem("isLoggedIn", false)
  auth.logout()
}
