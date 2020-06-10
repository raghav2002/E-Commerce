import React,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card"
import { loadCart } from "./helper/carthelper";
import { Link } from "react-router-dom";
import PaymentB from "./paymentB";


const Cart=()=>{
    
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])
    
    const loadAllProduct=()=>{
        return (
            products && products.length==0 ? 
            <Link to="/" className="nav-link alert alert-success">Cart is Empty! shop Now</Link>:
            <div>
            <h2>product in Cart</h2>
            {products.map((product,index)=>{
                return (<Card 
                    key={index}
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                />)
            })}
        </div>
        )
    }
   
    
    return (
        <Base title="Home Page" description="Welcome to the Tshirt Store">
            <div className="row text-center">
                <div className="col-md-6">{loadAllProduct()}</div>
                <div className="col-md-6">
                    <PaymentB products={products} setReload={setReload}/>
                </div>
            </div>
        </Base>
    );
}
export default Cart