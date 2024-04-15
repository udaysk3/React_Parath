import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login';
import AddDevice from './components/AddNewForms/AddDevice';
import AddTest from './components/AddNewForms/AddTest';
import AddContact from './components/AddNewForms/AddContact';
import AddCompany from './components/AddNewForms/AddCompany';
import AddTechnician from './components/AddNewForms/AddTechnician';
import useAuthState from './components/useAuthState'
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import TechniciansTable from './components/TechniciansTable';
import ContactsTable from './components/ContactsTable';
import background from "./background.png"



function App() {

  const {
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
  } = useAuthState();


  const router = createBrowserRouter([
    // {path:'/', element: <p>Test app with no HTTP requests</p>},
    {path:'/', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<Dashboard clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/contacts', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<ContactsTable clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/technicians', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<TechniciansTable clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/adddevice', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddDevice clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/addtest', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddTest clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/addcontact', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddContact clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/addcompany', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddCompany clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/addtechnician', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddTechnician clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},
    {path:'/map', element:!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<Map clientId={clientId} clientName={clientName} handleLogout = {removeItems} />},

  ])



//   const [authContext, setAuthContext] = useState({
//     clientId:clientId,
//     clientName:clientName,
//     token:token,
//     email:email,
//     }
// )

//   const authCtxHandler = (loggedIn, token, email, clientId, clientName) => {
//     setAuthContext((prevState) => {
//       return {
//       loggedIn:loggedIn,
//       clientId:clientId,
//       clientName:clientName,
//       token:token,
//       email:email
//       }
//     })
//   }

  // useEffect(() => {
  //   console.log('Auth State', authContext)},
  //   [authContext])


  // const ctxValue = {
  //   ...authContext,
  //   updateAuthContext:authCtxHandler
  // }
  //loginHandler={authCtxHandler}
  
return (
  <div className="App" style={{ 
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"}}>
    <RouterProvider router={router} />
  </div>
)




  // return (
  //   // <LoginContext.Provider value={authContext}>
  //     <BrowserRouter>
  //       <div className="App">
  //         <Routes>
  //           <Route path='/' exact element={!token && token=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<Dashboard clientId={clientId} clientName={clientName} handleLogout = {removeItems} />} />
  //           <Route path='/contacts' exact element={!token && token!=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<ContactsTable2 clientId={clientId} clientName={clientName} handleLogout = {removeItems} />} />
  //           <Route path='/technicians' exact element={!token && token!=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<TechniciansTable clientId={clientId} clientName={clientName} handleLogout = {removeItems} />} />
  //           <Route path='/adddevice' exact element={!token && token!=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddDevice clientId={clientId} clientName={clientName} handleLogout = {removeItems} />} />
  //           <Route path='/addtest' exact element={!token && token!=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddTest clientId={clientId} clientName={clientName} handleLogout = {removeItems} />} />
  //           <Route path='/addcontact' exact element={!token && token!=="" && token!==undefined? <Login saveClientId={saveClientId} saveClientName={saveClientName} saveEmail={saveEmail} saveToken={saveToken} />:<AddContact clientId={clientId} clientName={clientName} handleLogout = {removeItems} />} />
  //         </Routes>
  //       </div>
  //     </BrowserRouter>
  //   // </LoginContext.Provider>
  // )
}

export default App;



