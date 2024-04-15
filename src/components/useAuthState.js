import { useState } from 'react';

export default function useAuthState() {
  // const [authState, setAuthState] = useState({
  //   token: getUserItem("token"),
  //   email: getUserItem("email"),
  //   clientId: getUserItem("clientid"),
  //   clientName: getUserItem("clientname"),
  // })

  const [token, setToken] = useState(getUserItem("token"))
  const [email, setEmail] = useState(getUserItem("email"))
  const [clientId, setClientId] = useState(getUserItem("clientid"))
  const [clientName, setClientName] = useState(getUserItem("clientname"))


  function getUserItem(item) {
    const userItem = localStorage.getItem(item);
    return userItem && userItem
  }


  function removeItems() {
    localStorage.clear();
    setToken(null);
    setEmail(null);
    setClientName(null);
    setClientId(null);
  }

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function saveEmail(userEmail) {
    localStorage.setItem('email', userEmail);
    setEmail(userEmail);
  };

  function saveClientId(userClientId) {
    localStorage.setItem('clientid', userClientId);
    setClientId(userClientId);
  };

  function saveClientName(userClientName) {
    localStorage.setItem('clientname', userClientName);
    setClientName(userClientName);
  };

  return {
    token,
    email,
    clientId,
    clientName,
    getUserItem,
    removeItems,
    saveClientId,
    saveClientName,
    saveEmail,
    saveToken
  }

}  


// function saveItem(itemName, userItem) {
  //   localStorage.setItem(itemName, userItem);
  //   setAuthState({...authState, [itemName]:userItem});
  // };