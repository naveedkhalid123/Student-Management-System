import React from 'react'
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Routes from "./pages/Routes"
import Sidebar from "./pages/Dashboard/Siderbar";

function App() {
  return (
    <>
      <Sidebar />
      <Routes />

      
     <ToastContainer
     position="bottom-left"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light">

     </ToastContainer>


    </>
  );
}

export default App;
