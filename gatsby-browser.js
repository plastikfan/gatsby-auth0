import React from "react"
import { silentAuth } from "./src/utils/auth"

class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    )
  }
}

// "You might intuitively think that silentAuth should be called in the Account
// component before the login function is called. This is actually not the case.
// In order to implement silentAuth correctly, it needs to be called in the root
// component. The root component only mounts once, while the other page elements
// (like the Account component) un-mount and re-mount when you navigate. If you
// implemented silentAuth in the Account component, you would run silentAuth every
// time you clicked a link. Wrapping the root element will only run silentAuth
// when the page loads."
//
export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>
}
