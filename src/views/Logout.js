import React, { Component } from "react";
// import apiClient from "../services/resorts";


export default class Logout extends Component {

  componentDidMount(){
    console.log("logout")
    const {logout} = this.props;
    logout()
  };

  render() {
    return <div></div>
    // return null;
  }
}


// export default function Logout(props) {
//   return props.handleLogout()   //esto espera JSX
// }