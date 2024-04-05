import React,{useEffect, useState} from "react";
import Card from "./Components/Card";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Animal from "./Components/Animal";
import Flower from "./Components/Flower";
import Nature from "./Components/Nature";
import LoadingBar from 'react-top-loading-bar'
import Login from "./Components/Login";
import { getAuth ,onAuthStateChanged } from "firebase/auth";
import { app } from "./Firebase/Firebase";
import SignUp from "./Components/SignUp";
import { ChakraProvider } from '@chakra-ui/react';





const App =(props)=> {

  
const auth = getAuth(app)  
// const navigate = useNavigae()
const [progress, setProgress] = useState(0) 
const [user, setUser] = useState(null)

useEffect(()=>{
  onAuthStateChanged(auth ,(user)=>{
    if(user){
      setUser(user)
    }
    else{
      setUser(null)
    }
  })
},[auth])


// console.log(user)

function Authentication ({children}){
  let token = user
  return token !== null && token !== undefined && token !== "" ? (
    <Outlet/>
  ):(
    <Navigate to="/signUp"/>
  )
}

  return (
    <>
      <ChakraProvider>    
        <BrowserRouter>
        <LoadingBar color='#f11946' progress={progress}height="5px"/>
        <Navbar/>
     
     <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signUp" element={<SignUp />}/>
       
      
           <Route element={<Authentication/>}>
              <Route  path="/" element={ <Card setProgress={setProgress}/>}/>  
              <Route path="/Flower" element={<Flower setProgress={setProgress}/>}/>
              <Route path="/Nature" element={<Nature setProgress={setProgress}/>}/>
              <Route path="/Animal" element={<Animal setProgress={setProgress}/>}/>
          </Route>
    </Routes>
    </BrowserRouter>
    </ChakraProvider>

  
    </>
  );
}

export default App;


