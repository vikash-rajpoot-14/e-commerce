import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
   const [name, setName] = useState("")
   const [email,setEmail] = useState("")
   const [password, setPassword] = useState("")
   const navigate=useNavigate();
   useEffect(()=>{
    const auth=localStorage.getItem("user")
    if(auth){
      navigate("/");
    }
   })

   const handleClick=async ()=>{
    console.log(name,email,password);
    let result=await fetch("http://localhost:5000/register",{
      method:"post",
      body:JSON.stringify({name,email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    result = await result.json();
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result))
    if(result){
      navigate("/")
    }
   }
  return (
    <div className='m-2 p-2 flex flex-col justify-center items-center '>
      <h1 className='text-black text-4xl font-bold mt-20 flex justify-start mb-6 w-80'>Sign Up</h1>
      <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
      <input  className='m-2 p-2 w-80  border-2 border-solid border-red-600 rounded'type="text" placeholder='email'value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button className='m-2 p-2 bg-blue-700 rounded text-white' onClick={handleClick}>Sign Up</button> 
    </div>
  )
}

export default SignUp
