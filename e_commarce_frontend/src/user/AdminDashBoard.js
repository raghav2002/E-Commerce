import React from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import {isAuthenticated} from "../auth/helper/index"
const AdminDashBoard = ()=>{

    const {user:{name,email,role}} = isAuthenticated();

    

    return (
        <Base title= {`Welcome ${name}`}
        description="manage all your user and product here"
        className=""
        >
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h5 className="text-center text-muted">Admin Navigation</h5>
                    <Link to="/admin/create/categories" className="btn btn-warning btn-block">Create Categories</Link>
                    <Link to="/admin/create/product" className="btn btn-warning btn-block">Create Product</Link>
                    <Link to="/admin/products" className="btn btn-warning btn-block">Manage Product</Link>
                    <Link to="/admin/orders" className="btn btn-warning btn-block">Manage Order</Link>
                </div>
            </div>
        </Base>
    )
}

export default AdminDashBoard