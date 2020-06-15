import React,{useEffect,useState} from 'react';
import {Redirect, Link} from "react-router-dom"
import {AddItemToCart, RemoveItemFromCart} from "./helper/carthelper"
import ImageHelper from "../core/helper/ImageHelper"
import { API } from '../backend';
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


      const handleClick=()=>{
        RemoveItemFromCart(product._id)
        setReload(!reload)
        
      }

      const image=()=>{
        const imgurl = product ?`${API}/product/photo/${product._id}` : `https://picsum.photos/400/300`
        return (
          <div>
              <img
                src={imgurl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
          </div>
      )
    }
      
      return (
        <div className="border border-top-0 border-warning">
          {image()}
          <p className="m-0">{cardTitle}</p>
          <h4><span className="badge badge-warning">${cardPrice}</span>  <span className="badge badge-danger" onClick={handleClick}><i class="fa fa-trash"></i></span></h4>
        </div>
      );
  };

  export default Cart_Card;
