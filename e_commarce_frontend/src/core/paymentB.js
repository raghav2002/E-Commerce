import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { loadCart, EmptyTheCart } from './helper/carthelper'
import { getMeToken, processPayment, pushOrderInPurchaseList } from './helper/paymentBHelper'
import {createOrder} from "./helper/orderhelper"
import { isAuthenticated } from '../auth/helper'

import DropIn from "braintree-web-drop-in-react"


const PaymentB = ({products,setReload=f=>f,reload=undefined})=>{

    const [info, setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken=(userId,token)=>{
        getMeToken(userId,token)
        .then(response=>{
            if(response.error){
                setInfo({...info,error:response.error})
            }else{
                const clientToken=response.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showbtdropIn=()=>{
        return (
            <div>
                {info.clientToken!=null && products.length>0 ?(
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
                    </div>
                ):(<h3>add something to cart or login</h3>)}
            </div>
        )
    }

    const onPurchase=()=>{
        setInfo({...info,loading:true})
        let nonce;
        let getnonce = info.instance.requestPaymentMethod()
        .then(data=>{
            nonce=data.nonce
            const paymentData={
                paymentMethodNonce:nonce,
                amount : getAmount()
            }
            processPayment(userId,token,paymentData)
            .then(response=>{
                console.log(response);
                setInfo({...info,success:response.success,loading:false})
                console.log("PAYMENT SUCCESS");
                EmptyTheCart(()=>{
                    setReload(!reload)
                })
                pushOrderInPurchaseList(userId,token,products,response.transaction.id,()=>{
                    console.log("successfully add order ot purchase list");
                })
            })
            .catch(err=>{
                setInfo({loading:false,success:false})
                
                console.log("PAYMENT failed");

            })
        })
    }

    const getAmount=()=>{
        let amount=0
        products.map(p=>{
            amount+=p.price
        })
        return amount
    }

    useEffect(() => {
       getToken(userId,token)
    }, [])

    return (
        <div>
            <h1 className="mb-0 pb-0">Total Amount <span className="text-warning">${getAmount()}</span></h1>
            {showbtdropIn()}
            {info.success && <p>Payment Successful<span><i class="fa fa-check-circle fa-fw"></i></span></p>}
        </div>
    )
}

export default PaymentB
