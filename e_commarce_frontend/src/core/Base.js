import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="">
      <div className="jumbotron text-white text-center" style={{backgroundColor:"#100303"}}>
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
    </div>
      <div className={className}>{children}</div>
    {/* <footer className= "bg-dark mb-0 py-2">
      
      <div className="">
        <span className="text-muted">
          An Amazing <span className="text-white">SHOPPING</span> experience
        </span>
      </div>
    </footer> */}
  </div>
);

export default Base;
