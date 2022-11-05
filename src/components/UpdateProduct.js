import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate=useNavigate();

    console.log("params",params.id);
    useEffect(()=>{
       getUpdateProducts();
    },[])

    const getUpdateProducts=async()=>{
        const result=await fetch(`http://localhost:5000/products/${params.id}`)
        let data = await result.json();
        setName(data.name)
        setCategory(data.category)
        setCompany(data.company)
        setPrice(data.price)
        console.log(data);
    }

    const handleClick = async () => {
        let result = await fetch(`http://localhost:5000/products/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,company,category}),
            headers:{
               "Content-Type":"application/json"
            }
        })
        let data = await result.json();
        navigate("/productlist")
        console.log(data);

    }


    return (
        <div className=' flex flex-col justify-center items-center  '>
            <h1 className='text-black text-4xl font-bold mt-20 flex justify-start mb-6 w-80'>Update Product</h1>
            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter name' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name &&<span className='flex justify-start w-80 text-red-500'>Enter name</span>}
            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price &&<span className='flex justify-start w-80 text-red-500'>Enter price</span>}

            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category &&<span className='flex justify-start w-80 text-red-500'>Enter category</span>}

            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter company' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company &&<span className='flex justify-start w-80 text-red-500'>Enter company</span>}

            <button className='bg-blue-800 rounded mx-2  text-white p-2' onClick={handleClick}>Update Product</button>
        </div>
    )
}


export default UpdateProduct
