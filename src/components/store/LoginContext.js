import { createContext } from "react";


export const LoginContext = createContext(
    {
    clientId:null,
    clientName:null,
    token:null,
    email:null,
    //updateAuthContext: () => {}
});