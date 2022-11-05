import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let products = await fetch("http://localhost:5000/products");
        let result = await products.json();
        setProducts(result)
    }
    const handleUpdate = (id) => {
        navigate(`/update/${id}`)
    }

    const handleClick = async (id) => {
        let result = await fetch(`http://localhost:5000/products/${id}`, {
            method: "delete"
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }
    const handlechange = async (event) => {
        const key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json();
            setProducts(result)
        }else{
            getProducts();
        }

    }

    return (
        <div className='absolute left-44'>
            <h1 className='text-black text-4xl font-bold mt-10 flex justify-start mx-10 mb-6 w-80'>Product List</h1>
            <input type="text" placeholder='search...' className='border-solid border-2 border-black flex mx-48 mb-2 w-1/2 font-medium justify-center text-center text-2xl' onChange={handlechange} />
            <ul className='flex mx-10 '>
                <li className='flex justify-center border-solid border-black w-44 border-2 p-3  font-semibold text-xl'>S.NO</li>
                <li className='flex justify-center border-solid border-black w-44 border-2 p-3  font-semibold text-xl'>Name</li>
                <li className='flex justify-center border-solid border-black w-44 border-2 p-3  font-semibold text-xl'>Price</li>
                <li className='flex justify-center border-solid border-black w-44 border-2 p-3  font-semibold text-xl'>category</li>
                <li className=' flex justify-center border-solid border-black w-44 border-2 p-3 font-semibold text-xl'>company</li>
                <li className=' flex justify-center border-solid border-black w-44 border-2 p-3 font-semibold text-xl'>Operation</li>
            </ul>
            {products.length > 0 ? products.map((item, index) =>
                <ul key={index} className='flex  mx-10 ' >
                    <li className='flex justify-center border-solid border-black w-44 border-2  items-center px-2 py-1 '>{index + 1}.</li>
                    <li className='flex justify-center border-solid border-black w-44 border-2  items-center px-2 py-1 '>{item.name}</li>
                    <li className='flex justify-center border-solid border-black w-44 border-2  items-center px-2 py-1 '>₹ {item.price}</li>
                    <li className='flex justify-center border-solid border-black w-44 border-2  items-center px-2 py-1 '>{item.category}</li>
                    <li className='flex justify-center border-solid border-black w-44 border-2  items-center px-2 py-1'>{item.company}</li>
                    <li className='flex justify-center border-solid border-black w-44 border-2  items-center px-2 py-1' ><button className='bg-slate-400 border-solid border-2 border-black rounded px-2 mx-1'
                        onClick={() => handleClick(item._id)} >Delete</button><button className='bg-slate-400 border-solid border-2 border-black rounded px-2 mx-1' onClick={() => handleUpdate(item._id)}>Update</button></li>
                </ul>
            ) :
                <h1 className='text-black text-4xl font-bold  flex justify-center items center mt-8'>No result Found</h1>
            }
        </div>
    )
}

export default ProductList
