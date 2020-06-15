import { API } from "../../backend";

export const getUser=(userId,token)=>{
    return  fetch(`${API}/user/${userId}`,{
        method:"GET",
        headers:{
            Accept : "application/json",
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
        }
        })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}

export const updateUser=(userId,user,token)=>{
    console.log(user);
    return  fetch(`${API}/user/${userId}`,{
        method:"PUT",
        headers:{
            Accept : "application/json",
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({name : user.name,email:user.email})
        })
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .catch(err=>console.log(err))
}