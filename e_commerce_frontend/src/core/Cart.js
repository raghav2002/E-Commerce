import React,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Cart_Card from "./Cart-Card"
import { loadCart } from "./helper/carthelper";
import { Link } from "react-router-dom";
import PaymentB from "./paymentB";
import { isAuthenticated } from "../auth/helper";



const Cart=()=>{

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProduct=()=>{
        return (
            <div>
            <h2 className="h2 text-muted">Products in Cart</h2>
            {products.map((product,index)=>{
                return (<Cart_Card
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
        <Base title="Your Shoppings" description="Checkout your awesome collections">
            {!isAuthenticated()?(
                <div className="text-center text-muted">
                <h3 >please <Link to="/signin" className="text-white">LogIn</Link> to your check cart
                </h3>
                </div>
            )
            :(
                !products || products.length===0 ?
            (
                <div className="text-center">
                <h3 >no items in <span className="display-4"><i class=" fa fa-shopping-cart fa-fw"></i></span>
                </h3>
                <Link to="/" className="btn btn-block btn-dark">shop now</Link>
                </div>
            )
            :(
                <div className="container-fluid row text-center">
                    <div className="col-md-6">{loadAllProduct()} </div>
                    <div className="col-md-6">
                    <PaymentB products={products} setReload={setReload}/>
                    </div>
                </div>
            )

            )}
        </Base>
    );
}
export default Cart