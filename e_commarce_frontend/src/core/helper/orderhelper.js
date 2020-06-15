import { API } from "../../backend";

export const createOrder = (userId, token, order) => {
    console.log("inside order helper");
    
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({order})
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllOrder=(userId,token)=>{
    console.log(userId);
    
    return fetch(`${API}/order/all/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
}
