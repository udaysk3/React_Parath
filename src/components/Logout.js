import logo from '../logo.svg'
import axios from "axios";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function Logout() {

  function logMeOut({logoutHandler}) {
    axios({
      method: "POST",
      url:"https://flo-trace-api-prod-ugyxg.ondigitalocean.app/logout",
    })
    .then((response) => {
      logoutHandler()
      //authState.token
      //handleRemoveToken()
      //  removeItem("token");
      //  removeItem("email");
      //  removeItem("clientid");
      //  removeItem("clientname");
      //  removeItem("isloggedin");
    }).catch((error) => {
      if (error.response) {
        console.log("LOGOUT causing an error")
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <Button onClick={logMeOut} variant="contained" >Logout</Button>
    )
}

export default Logout;