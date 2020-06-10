import React,{useEffect,useState} from 'react';
import ImageHelper from './helper/ImageHelper';
import {Redirect} from "react-router-dom"
import {AddItemToCart, RemoveItemFromCart} from "./helper/carthelper"
const Card = ({
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

      const showAddToCart=()=>{
        return (
          addToCart && (
            <button
              onClick={addItemToCart}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
            Add to Cart
          </button>
          )
        )
      }

      const showRemoveFromCart=()=>{
        return (
          removeFromCart && (
            <button
              onClick={() => {
                RemoveItemFromCart(product._id)
                setReload(!reload)
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
            Remove from cart
          </button>
          )
        )
      }

      return (
        <div className="card text-white bg-dark border border-info ">
          <div className="card-header lead">{cardTitle}</div>
          <div className="card-body">
            {getARedirect()}
            <ImageHelper product={product} />
            <p className="lead bg-success font-weight-normal text-wrap">
              {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
            <div className="row">
              <div className="col-12">
                {showAddToCart()}
              </div>
              <div className="col-12">
                {showRemoveFromCart()}
              </div>
            </div>
          </div>
        </div>
      );
  };

  export default Card;