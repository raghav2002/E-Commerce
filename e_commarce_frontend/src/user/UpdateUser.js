import React,{useState,useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getUser, updateUser } from './helper/userapicalls'
import Base from '../core/Base'


const UpdateUser=({match,history})=>{

    const [userDetails, setUserDetails] = useState({
        name : "",
        email : "",
        userId : "",
        error:false,
        success : false
    })

    const {user:{_id},token} = isAuthenticated()
    const preload=()=>{
        getUser(match.params.userId,token)
        .then(response=>{
            if(response.error){
                setUserDetails({error:response.error})
            }else{                
                setUserDetails({email:response.email,name:response.name,userId:response._id})
            }
        })
    }

    useEffect(() => {
       preload()
    }, [])

    const handleChange=(event)=>{
        const v = event.target.value
        setUserDetails({...userDetails,[event.target.name]:v})
    }

    const onSubmit=(event)=>{
        event.preventDefault()
        
        updateUser(_id,{name:userDetails.name,email:userDetails.email},token)
        .then(res=>{
            if(res.error){
                setUserDetails({error:res.error})
            }else{
                setUserDetails({success:true})
            }
        })
        .catch(err=>{console.log(err)})
    }

    const successMessage=()=>{
        if(userDetails.success){
            return <p className="alert alert-success text-center">info updated successfully...redirecting</p>
        }
    }

    const redirect=()=>{
        const fun=()=>{
            history.push("/user/dashboard")
        }
        if(userDetails.success){
            setTimeout(fun,2000)
        }
    }

   

    const form = () => {
        return (
          <div className="row">

            <div className="col-md-6 offset-sm-3 text-left">
        <Link className="btn btn-sm btn-warning mb-3" to="/user/dashboard"><i class="fa fa-arrow-left fa-fw"></i>Back</Link>
              <form>
                <div className="form-group">
                  <label className="text-light">Name</label>
                  <input className="form-control" name="name" value={userDetails.name} onChange={handleChange} type="text" />
                </div>
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input className="form-control" name="email" value={userDetails.email} onChange={handleChange} type="text" />
                </div>
                <button className="btn btn-success btn-block" onClick={onSubmit} >Submit</button>
              </form>
            </div>
          </div>
        );
      };

      return (
          <Base title="Update Profile" description="change your info">
              {successMessage()}
              {form()}
              {redirect()}
          </Base>
      )
}
export default UpdateUser