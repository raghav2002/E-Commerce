import React,{useState} from 'react'
import ImageHelper from './helper/ImageHelper';

const  Test=({product})=>{

    const [quantity, setQuantity] = useState(2)

    const handleChange=(event)=>{
      console.log(event.target.value);
      setQuantity(quantity+1)
    }

    return (
        <div className="row">
      <div className="card">
        <div className="card-body">
      
          <div className="table-responsive">
      
            <table className="table product-table">
      
              <thead className="mdb-color lighten-5">
                <tr>
                  <th></th>
                  <th className="font-weight-bold">
                    <strong>Product</strong>
                  </th>
                  <th></th>
                  <th className="font-weight-bold">
                    <strong>Price</strong>
                  </th>
                  <th className="font-weight-bold">
                    <strong>QTY</strong>
                  </th>
                  <th className="font-weight-bold">
                    <strong>Amount</strong>
                  </th>
                  <th></th>
                </tr>
              </thead>
              
      
              <tbody>
                <tr>
                  <th scope="row">
                    {/* <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg" alt="" className="img-fluid z-depth-0" /> */}
                    <ImageHelper product={product}/>
                  </th>
                  <td>
                    <h5 className="mt-3">
                      <strong>{product.name}</strong>
                    </h5>
                    <p className="text-muted">Apple</p>
                  </td>
                  <td></td>
                  <td>${product.price}</td>
                  <td>
                    {/* <input type="number" value={quantity} onChange={handleChange}  className="form-control" style={{width: "100px"}} /> */}
                    <span><button className="btn btn-sm px-1 py-0 m-1 btn-primary">+</button>{quantity}<button className="btn btn-sm px-1 py-0 m-2 btn-primary">-</button></span>
                  </td>
                  <td className="font-weight-bold">
                    <strong>$800</strong>
                  </td>
                  <td>
                    <button type="button" className="btn btn-sm btn-primary"
                      title="Remove item">X
                    </button>
                  </td>
                </tr>
                    <tr>
                    <td colspan="3"></td>
                    <td>
                        <h4 className="mt-2">
                        <strong>Total</strong>
                        </h4>
                    </td>
                    <td className="text-right">
                        <h4 className="mt-2">
                        <strong>$2600</strong>
                        </h4>
                    </td>
                    <td colspan="3" className="text-right">
                        <button type="button" className="btn btn-primary btn-rounded">Complete purchase
                        <i className="fas fa-angle-right right"></i>
                        </button>
                    </td>
                    </tr>
      
              </tbody>
              
      
            </table>
      
          </div>
      
        </div>
      
      </div>
    </div>
    )
}


export default Test
