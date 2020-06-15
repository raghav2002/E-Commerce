import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getProducts, deleteProduct } from './helper/adminapicall'

const ManageProducts = ()=>{

    const [products, setProducts] = useState([])
    const {user,token} = isAuthenticated()

    const preload=()=>{
        getProducts()
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const removeProduct=(productId)=>{
        deleteProduct(productId,user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                preload()
            }
        })
    }

    return (
    <Base title="Welcome admin" description="Manage products here" className="container">

        <Link className="btn btn-sm btn-warning mb-3" to="/admin/dashboard"><i class="fa fa-arrow-left fa-fw"></i>Back</Link>
        <h2 className="text-center text-white mb-4">All products</h2>
        <div className="row">
            <div className="col-12">
            <h5 className="text-center text-muted my-3">Total <span className="text-white">{products.length}</span> products</h5>

            {products.map((product,index)=>{
                return (<div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                    <p className="text-white text-left">{product.name}</p>
                    </div>
                    <div className="col-4">
                    <Link
                        className="badge badge-pill badge-primary"
                        to={`/admin/product/update/${product._id}`}
                    >
                        <span className="">Update</span>
                    </Link>
                    </div>
                    <div className="col-4">
                    <button onClick={() => {removeProduct(product._id)}} className="badge badge-pill badge-danger">
                        Delete
                    </button>
                    </div>
                </div>)
            })}
            </div>
        </div>
    </Base>
    )
}

export default ManageProducts