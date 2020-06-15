import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {signup} from "../auth/helper/index"

const Signup = () => {
    const [values,setValues]  = useState({
        name:"",
        email:"",
        password:"",
        error : "",
        success:false
    })

    const handleChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value,error:false});
    }

    const onSubmit = (event)=>{
        event.preventDefault()
        signup({name:values.name,email:values.email,password:values.password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({
                    ...values,
                    name : "",
                    email : "",
                    password : "",
                    error : "",
                    success : true
                })
            }
        })
        .catch(console.log("error in signup"))
    }

    const successMessage = ()=>{
        return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
                    style={{display:values.success?"":"none"}}
                    >
                    User Account Created Successfully.Please
                    <Link to="/signin">Login here</Link>
                </div>
            </div>
        </div>
        )
    }

    const errorMessage = ()=>{
        return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
                    style={{display:values.error?"":"none"}}
                    >
                    {values.error}
                </div>
            </div>
        </div>
        )
    }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input className="form-control" name="name" value={values.name} onChange={handleChange} type="text" />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" name="email" value={values.email} onChange={handleChange} type="text" />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" name="password" value={values.password} onChange={handleChange} type="password" />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};
export default Signup;
