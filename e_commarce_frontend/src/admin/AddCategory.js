import React,{useState} from "react"
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import crateCategory from "./helper/adminapicall"
import {createCategory} from "./helper/adminapicall";

const AddCategory =()=>{

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token} = isAuthenticated()

    const goBack = ()=>{
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-warning mb-3" to="/admin/dashboard"><i class="fa fa-arrow-left fa-fw"></i>Back</Link>
            </div>
        )
    }

    const handleChange = (event)=>{
        const newName = event.target.value
        setSuccess(false)
        setError("")
        setName(newName)
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(data.error)
                setSuccess(false)
            }else{
                setError("")
                setSuccess(true)
                setName("");
            }
        })
        .catch(err=>console.log(err));
    }

    const successMessage = ()=>{
        if(success){
            return <h4 className="text-success">Category Created Successfully</h4>
        }
    }
    const errorMessage = ()=>{
        if(error){
            return <h4 className="text-success">{error}</h4>
        }
    }

    const myCategoryForm = ()=>{
        return (<form>
            <div className="form-group">
                <p className="h2 text-muted">Enter your Category</p>
                <input className="form-control my-3"
                    autoFocus
                    required
                    placeholder="for ex: Summer"
                    onChange={handleChange}
                    value={name}
                />
                <button onClick={onSubmit} className="btn btn-warning btn-block">Create Category</button>
            </div>
        </form>)
    }


    return (
        <Base title="Add Categories" description="Crate a new Category for your product"
        className="container">
        <div className="row text-white ">
            <div className="col-md-4 offset-md-4 text-center">
                {goBack()}
                {successMessage()}
                {errorMessage()}
                {myCategoryForm()}
            </div>
        </div>

        </Base>
    )
}

export default AddCategory;