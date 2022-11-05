import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
 const auth=localStorage.getItem("user");
 const navigate=useNavigate();

 const logOut=()=>{
  localStorage.clear();
  navigate("/signup")
 }

  return (
    <div>
      {
        auth? <ul className='bg-red-100 flex'>
        <li className='m-2 p-2'><Link to="/">Home</Link></li>
        <li className='m-2 p-2'><Link to="/add">Add products</Link></li>
        <li className='m-2 p-2'><Link to="/productlist">Products List</Link></li>
        <li className='m-2 p-2'><Link onClick={logOut} to="/signup">logout ({JSON.parse(auth).name})</Link></li> 
      </ul>:
      <ul  className='bg-red-100 flex justify-end px-20'>
         <li className='m-2 p-2'><Link to="/signup">Sign Up</Link></li>
        <li className='m-2 p-2'><Link to="/login">Log in</Link></li>
      </ul>
      }
      
    </div>
  )
}

export default Navbar
