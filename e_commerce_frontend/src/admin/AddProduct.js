import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import {getCategory, createProduct} from "./helper/adminapicall"
import { isAuthenticated } from '../auth/helper'

const  AddProduct = ()=>{

    const {user,token} = isAuthenticated();

    const [values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo : "",
        categories : [],
        category : "",
        error : "",
        loading : false,
        createdProduct : "",
        getRedirect : false,
        formData : ""
    })
    const {name,description,price,stock,categories,category,loading,error,createdProduct,getRedirect,formData} = values

    const preload = ()=>{ //load all the  categories to be selected by the user
        getCategory().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                // console.log(data[0]);
                setValues({...values,categories:data,formData:new FormData()})
            }
        })
    }

   useEffect(() => {
       preload();
   }, [])

    const handleChange=name=>event=>{
        const value = name ==="photo"?event.target.files[0]:event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const onSubmit=(event)=>{

        event.preventDefault();
        createProduct(user._id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name : "",
                    description:"",
                    price:"",
                    photo:"",
                    loading:false,
                    createdProduct:data.name,
                    error:""
                })
            }
        })
        .catch(err=>{console.log(err);
        })

    }

    const successMessage = ()=>{
        return (<div className="alert alert-success mt-3"
        style={{display: createdProduct?"":"none"}}
        >
        <h4>{createdProduct} created successfully</h4>
        </div>)
    }
    const errorMessage = ()=>{
        return (<div className="alert alert-success mt-3"
        style={{display: error?"":"none"}}
        >
        <h4>{error}</h4>
        </div>)
    }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-info">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate,index)=>{
                  return <option key={index} value={cate._id}>{cate.name}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-warning btn-block mb-3">
            Create Product
          </button>
        </form>
      );


    return (
        <Base
        title="Create a Product Here"
        description="Welcome to product creation section"
        className="container p-4"
        >
        <Link className="btn btn-sm btn-warning mb-3" to="/admin/dashboard"><i class="fa fa-arrow-left fa-fw"></i>Back</Link>
        <div className="row  text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {createProductForm()}
            </div>
        </div>
        </Base>
    )
}
export default AddProduct