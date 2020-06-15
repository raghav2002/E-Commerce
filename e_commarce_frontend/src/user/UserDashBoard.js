import React,{useState,useEffect} from "react"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { getUser } from "./helper/userapicalls";
import { Link } from "react-router-dom";
import ImageHelper from "../core/helper/ImageHelper"


const UserDashBoard = ()=>{

    const {user:{_id},token} = isAuthenticated()
    const [userDetails, setUserDetails] = useState({
        name : "",
        email : "",
        purchases:[],
        error : false
    })

    useEffect(() => {
        getUser(_id,token)
        .then(data=>{
            if(data.error){
                setUserDetails({error : data.error})
            }else{
                setUserDetails(data)
            }
        })
    }, [])
    
    return (
        <Base title= {`Welcome ${userDetails.name}`} description={<p>manage your <span className="text-warning">account</span> here</p>}>
                <div className="row">
                    <div className ="col-md-6 offset-md-3 col-sm-12">
                        <Link to={`/user/update/${_id}`} className="btn btn-warning btn-block">Manage Account</Link>
                        <Link to="/" className="btn btn-warning btn-block">Show Now</Link>
                        {userDetails.purchases.length===0?<h5 className="text-muted text-center mt-2">NO orders found in your account</h5>:
                        (<div>
                        <h5 className="text-muted text-center mt-2">your purchase history</h5>
                        <table className="text-center table table-dark" style={{backgroundColor:"black"}}>
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">transaction-id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.purchases.map((product,index)=>{
                                    return (
                                        <tr key={index}>
                                        <th scope="row"><i class="fa fa-fw fa-shopping-bag"></i></th>
                                            <td>{product.name} <span className="text-muted">tshirt</span></td>
                                            <td>${product.amount}</td>
                                            <td>{product.transaction_id}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                           </table>
                           </div>)}
                    </div>
                </div>
        </Base>
    )
}
export default UserDashBoard