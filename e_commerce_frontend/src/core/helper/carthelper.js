import React from 'react';

export const AddItemToCart=(item,next)=>{
    let cart = [];
    if(typeof widow != undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
    }
    cart.push(item)
    localStorage.setItem("cart",JSON.stringify(cart))
    next();
}

export const loadCart = ()=>{
    if(typeof widow != undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return []; //to handle if there's no item in the cart
}

export const RemoveItemFromCart=(productId)=>{
    let cart = [];
    if(typeof widow != undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
    }
    cart = cart.filter(item=>{
        return item._id!==productId
    })
    localStorage.setItem("cart",JSON.stringify(cart))
    return cart

   //FIXME: if we have more then one same tshirt,removing any one will remove all the tees 

}

export const EmptyTheCart=(next)=>{
    if(typeof window !=undefined){
        let cart=[]
        localStorage.removeItem("cart")
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
    
}