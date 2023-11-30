import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ breadCrumb }) => {
  //   console.log(breadCrumb[0].name);
  return (
    <div className="flex justify-center lg:justify-start">
      {breadCrumb.map((data) => (
        <div className="flex ">
          <Link to={data.path} key={data.name} className="bg-red-100 w-full">
            {data.name}
          </Link>
          <p>.</p>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
