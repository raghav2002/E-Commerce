import React,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card"
import getProducts from "./helper/coreapicalls";


export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadAllProducts=()=>{
    getProducts()
    .then(data=>{
      if(data.error){
        setError(data.error)
      }else{
        setProducts(data)
      }
    })
  }

  useEffect(() => {
   loadAllProducts()
  }, [])

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
        <h3 className="text-muted text-center py-4">Deals of the day
        <span><p className="badge badge-warning">offers</p></span>
        </h3>
        <div className="row">
          {products.map((product,index)=>{
            return (<div key={index} className="col-md-3 mb-4">
              <Card product={product} />
            </div>)
          })}
        </div>
    </Base>
  );
}
