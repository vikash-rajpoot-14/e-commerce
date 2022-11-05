import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate =useNavigate();

  const handleLogin= async()=>{
       console.log(email,password);
       let result=await fetch("http://localhost:5000/login",{
      method:"post",
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    result = await result.json();
    console.log(result);
    if(result.name){
      localStorage.setItem("user",JSON.stringify(result))
      navigate("/")

    }else{
      alert("please enter valid credentials")
    }
  }
  return (
    <Fragment>
      <div className=' flex flex-col justify-center items-center  '>
        <h1 className='text-black text-4xl font-bold mt-20 flex justify-start mb-6 w-80'>Log In</h1>
        <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className=' m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button className='bg-blue-800 rounded mx-2  text-white p-2' onClick={handleLogin}>Login</button>
      </div>
    </Fragment>
  )
}

export default Login
