import React from "react";
import { Link } from "react-router-dom";
import { IcBaselineGreaterThan } from "../../util/icon";

const BreadCrumb = ({ breadCrumb }) => {
  //   console.log(breadCrumb[0].name);
  return (
    <div className="flex justify-center lg:justify-start my-8">
      {breadCrumb.map((data, i) => (
        <div className="flex items-center" key={data.name}>
          <Link
            to={data.path}
            className="w-full px-2 hover:underline transition-all text-zinc-700 "
          >
            {data.name}
          </Link>
          {breadCrumb.length - 1 !== i ? (
            <IcBaselineGreaterThan className="text-xl outline outline-1" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
