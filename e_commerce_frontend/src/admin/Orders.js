import React,{useState,useEffect} from "react"
import {getAllOrder} from "../core/helper/orderhelper"
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { withRouter, Link } from "react-router-dom";


const Orders=()=>{
    const [orders,setOrders] = useState([]);
    const [error,setError] = useState(false);
    const {user,token} = isAuthenticated()

    const getOrders=()=>{
        getAllOrder(user._id,token)
        .then(res=>{
            console.log(res);
           if(res.error){
               setError(res.error)
           }else{
               setOrders(res)
           }
           
       })
       .catch(err=>{console.log(err)})
    }

    useEffect(() => {
       getOrders();
       console.log(orders);
       
    }, [])

    

    return (
        <Base title="Orders" description="orders placed by customers" className="bg-primary container">
        <Link className="btn btn-sm btn-warning mb-3" to="/admin/dashboard"><i class="fa fa-arrow-left fa-fw"></i>Back</Link>
            <div className="table-responsive">
            <table className="table text-white table-hover">
            <thead>
                <tr>
                <th scope="col">Product</th>
                <th scope="col">Amount</th>
                <th scope="col">Tx-id</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">user</th>
                <th scope="col">email</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order,index)=>{
                    return (<tr key={index}>
                    <th>{order.products.length}<i class="fa fa-fw fa-shopping-bag"></i></th>
                    <th>${order.amount}</th>
                    <th>{order.transaction_id}</th>
                    <th>{order.createdAt}</th>
                    <th>{order.status}</th>
                    <th>{order.user.name}</th>
                    <th>{order.user.email}</th>
                    </tr>)
                })}
            </tbody>
            </table>
        </div>
        </Base>
    )
}

export default Orders


