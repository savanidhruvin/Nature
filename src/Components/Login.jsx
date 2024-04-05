import React ,{useEffect, useState} from 'react'
import {getAuth ,signInWithEmailAndPassword  ,onAuthStateChanged} from 'firebase/auth'
import { app } from '../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '@chakra-ui/react'
import '../App.css'

const Login = () => {
  

const [email, setEmail] = useState('')    
const [password, setPassword] = useState('')


const toast = useToast()
const auth = getAuth(app)

const [user, setUser] = useState(null)
const navigate = useNavigate()

const handleLogin = async()=>{
   await signInWithEmailAndPassword(auth,email,password)
    .then((value)=>{;
         toast({
          title: 'Success',
          description: "Login Successfully",
          status: 'success',
          isClosable: true,
          position:'top-right'
        })
      })
      .catch((error) => {
        toast({
          title: 'Warning',
          description:'Please Fill The Field Data',
          status: 'warning',
          isClosable: true,
          position:'top'
        })
      });

      setEmail('')
      setPassword('')
}



useEffect(()=>{
   onAuthStateChanged(auth, (user)=>{
    if(user){
      setUser(user)
    }
    else{
      setUser(null)
    }
   })
},[auth])

const isLoggedIn = user ? true:false

useEffect(()=>{
  if(isLoggedIn){
  return  navigate('/')
  }
},[isLoggedIn])

const goToSignUP =()=>{
    navigate('/signUp')
}


  return (
    <div className='container pt-5 '>
    
        <h1 className='mt-5'>Login</h1>
    <h6 className='text-center'>"Old User"</h6>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>
  <button type="button" className="btn btn-success" onClick={handleLogin}>Login</button>
   
</form>
  <div className='mt-2'>Don't Have An Account ? <a className='fw-bold text-decoration-none ' style={{cursor:'pointer'}} onClick={goToSignUP}>Sing Up</a></div>
  {/* <ToastContainer position="top-center"/>  */}
    </div>





  )
}

export default Login

