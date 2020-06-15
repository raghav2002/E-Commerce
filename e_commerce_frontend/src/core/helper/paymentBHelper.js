import { API } from "../../backend";

export const getMeToken=(userId,token)=>{
    return fetch(`${API}/payment/gettoken/${userId}`,{
        method:"GET",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const processPayment=(userId,token,paymentInfo)=>{
    return fetch(`${API}/payment/braintree/${userId}`,{
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify(paymentInfo)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const pushOrderInPurchaseList=(userId,token,products,transaction_id,next)=>{
    return fetch(`${API}/orders/push/${userId}`,{
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({products,transaction_id})
    })
    .then(response=>{
        next();
    })
    .catch(err=>console.log(err))
}