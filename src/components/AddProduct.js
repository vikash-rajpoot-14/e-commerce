import React, { useState } from 'react'

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const handleClick = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem("user"))._id
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json();
        alert("product added")
        console.log(result);
    }


    return (
        <div className=' flex flex-col justify-center items-center  '>
            <h1 className='text-black text-4xl font-bold mt-20 flex justify-start mb-6 w-80'>Add Product</h1>
            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter name' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name &&<span className='flex justify-start w-80 text-red-500'>Enter name</span>}
            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price &&<span className='flex justify-start w-80 text-red-500'>Enter price</span>}

            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category &&<span className='flex justify-start w-80 text-red-500'>Enter category</span>}

            <input className='m-2 p-2 w-80 border-2 border-solid border-red-600 rounded' type="text" placeholder='enter company' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company &&<span className='flex justify-start w-80 text-red-500'>Enter company</span>}

            <button className='bg-blue-800 rounded mx-2  text-white p-2' onClick={handleClick}>Add Product</button>
        </div>
    )
}

export default AddProduct
