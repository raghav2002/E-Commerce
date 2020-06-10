import React from 'react'
import { API } from '../../backend';

const ImageHelper=({product})=>{
    const imgurl = product ?`${API}/product/photo/${product._id}` : `https://picsum.photos/400/300`
    return (
        <div className="rounded border border-success p-2">
            <img
              src={imgurl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
        </div>
    )
}
export default ImageHelper;
