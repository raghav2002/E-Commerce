import React, { useState } from "react";
import Base from "../core/Base";
import {Link,Redirect} from "react-router-dom";
import {signin,authenticate,isAuthenticated } from "../auth/helper"

const Signin = () => {
    const [values,setValues] = useState({
        email : "",
        password : "",
        error : "",
        loading : false,
        didRedirect : false
    })

    const {user} = isAuthenticated(); //

    const handleChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value,error:false});
    }

    const performRedirect = ()=>{
        if(values.didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email:values.email,password:values.password})
        .then((data)=>{
            console.log("inside then");
            if(data.error){
                setValues({...values,error:data.error,loading:false}) 
            }else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        didRedirect:true,
                    })
                })
            }
        })
        .catch(console.log("signin request failed"))
    }

    const loadingMessage = ()=>{
        return (
            values.loading && (
                <div className="alert alert-info">
                    <h2>Loading....</h2>
                </div>
            )
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


    const signInForm = () => {
        return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
            <form>
                <div className="form-group">
                <label className="text-light">Email</label>
                <input name="email" value={values.email} onChange={handleChange} className="form-control" type="email" />
                </div>

                <div className="form-group">
                <label className="text-light">Password</label>
                <input name="password" value={values.password} onChange={handleChange} className="form-control" type="password" />
                </div>
                <button onClick={onSubmit}  className="btn btn-success btn-block">Submit</button>
            </form>
            </div>
        </div>
        );
    };

    return (
        <Base title="Sign In page" description="A page for user to sign in!">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        </Base>
    );
};

export default Signin;
