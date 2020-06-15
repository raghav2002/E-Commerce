import React,{useEffect,useState} from 'react';
import ImageHelper from './helper/ImageHelper';
import {Redirect, Link} from "react-router-dom"
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

      const showRemoveFromCart=()=>{
        return (
          removeFromCart && (
            <div>
              <p className="text-center text-warning my-0">${product.price}</p>
            <button
              onClick={() => {
                RemoveItemFromCart(product._id)
                setReload(!reload)
              }}
              className="btn btn-sm btn-outline-danger mt-2 mb-2"
            >
            Remove from cart
          </button>
            </div>
          )
        )
      }

      
      return (
            <div class="card text-white" style={{backgroundColor:"black"}}>
              {getARedirect()}
              <ImageHelper product={product}/>
              <div class="card-body card-body-cascade text-center border border-top-0 border-light">
                <p className="class-text lead bg-black font-weight-normal text-wrap mt-0">{cardDescription}</p>
                <h5 class="card-title text-muted">
                  {cardTitle+" "}
                </h5>
                <div class="card-footer">
                  {addToCart && (
                    <div>
                      <span class="float-left text-warning">${cardPrice}</span>
                      <span class="float-right">
                        <span className="text-white" onClick={addItemToCart} title="Add to Cart"><i class="fas fa fa-shopping-cart mr-3"></i></span>
                        <Link  title="Share"><i class="fas fa fa-share-alt mr-3"></i></Link>
                        <Link className="active"  title="Added to Wishlist"><i class="fas fa fa-heart"></i></Link>
                      </span>
                    </div>
                  )}
                  {showRemoveFromCart()}
                </div>
              </div>
            </div>
      );
  };

  export default Card;