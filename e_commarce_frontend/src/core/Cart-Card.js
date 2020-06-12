import React,{useEffect,useState} from 'react';
import ImageHelper from './helper/ImageHelper';
import {Redirect, Link} from "react-router-dom"
import {AddItemToCart, RemoveItemFromCart} from "./helper/carthelper"
const Cart_Card = ({
  product,
  addToCart=true,
  removeFromCart=false,
  setReload=f=>f, //function(f)=>{return f}
  reload=undefined
})=>{
      const [redirect, setRedirect] = useState(false)

      const cardTitle = product ? product.name : "Default Name";
      const cardDescription = product ? product.description : "Default Description";
      const cardPrice = product ? product.price : "Default";

      const addItemToCart=()=>{
        AddItemToCart(product,()=>{setRedirect(true)})
      }

      const getARedirect=()=>{
        if(redirect){
          return <Redirect to="/cart"/>
        }
      }

      const showRemoveFromCart=()=>{
        return (
          removeFromCart && (
            <button
              onClick={() => {
                RemoveItemFromCart(product._id)
                setReload(!reload)
              }}
              className="btn btn-danger btn-block py-2"
            >
            Remove from cart
          </button>
          )
        )
      }

      
      return (
        <div class="container-fluid">
        {getARedirect()}
              <div class="row">
                  <div className="col-6 mt-3 px-0">
                    <ImageHelper product={product}/>
                  </div>
                  <div className="col-6 mt-3">
                    <div className="card row bg-dark">
                      <div className="col-12 card-header">
                        <h5>{product.name}</h5>
                      </div>
                      <div className="col-12">
                        <p>{product.description}</p>
                      </div>
                      <div className="col-12 text-warning">
                        <p>Price: ${product.price}</p>
                      </div>
                      {showRemoveFromCart()}
                    </div>
                  </div>
              </div>
          </div>
      );
  };

  export default Cart_Card;