import React, { useEffect, useState } from 'react'
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged ,GoogleAuthProvider , signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'


const SignUp = (props) => {

const toast = useToast()
const auth = getAuth()    

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)
const navigate = useNavigate()
const googleProvider = new GoogleAuthProvider()

const handleSignup = async()=>{
    if(email && password){
     await createUserWithEmailAndPassword(auth, email,password);
     await  toast({
        title: 'Success',
        description: "SignUp Successfully",
        status: 'success',
        isClosable: true,
        position:'top'
      })
    }
    else{ 
      toast({
        title: 'Warning',
        description:'Please Fill The Field Data',
        status: 'warning',
        isClosable: true,
        position:'top'
      })
    }
}

const SignGoogle = async()=>{

 await signInWithPopup(auth,googleProvider)
await  toast({
        title: 'Success',
        description: "SignUp Successfully",
        status: 'success',
        isClosable: true,
        position:'top-right',
      })
  
}

useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
       if(user){
        setUser(user)
       }
       else{
        setUser(null)
       }
    })
},[])

// console.log(user)
const isLoggedIn = user ? true : false

useEffect( ()=>{
   if(isLoggedIn){
      navigate('/')
   }
},[isLoggedIn,navigate])

const handleLogin = (e)=>{
  e.preventDefault()
  navigate('/login')
}
  return (
    <div>
      <div className='container mt-5 '>
    <h1 className='pt-5'>Sign Up</h1> 
    <h6 className='text-center'>"New User"</h6>
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
  <button type="button" className="btn btn-primary" onClick={handleSignup}>SignUp</button>
  <button type='button' className='btn btn-warning ms-2' onClick={SignGoogle}>Sign with Google</button>

</form>
 <p className='mt-3'>Already Have An Account ? <a href="/" className='fw-bold text-decoration-none' onClick={handleLogin}>login</a></p>
    </div>

     
    </div>


  )
}

export default SignUp
