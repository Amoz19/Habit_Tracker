import React from "react";
import { Link } from "react-router-dom";
import { IcBaselineGreaterThan } from "../../util/icon";

const BreadCrumb = ({ breadCrumb }) => {
  return (
    <div className="flex my-8">
      {breadCrumb.map((data, i) => (
        <div className="flex items-center" key={data.name}>
          <Link
            to={data.path}
            className={`w-full px-2 hover:underline transition-all ${
              breadCrumb.length - 1 == i
                ? "text-blue-700 dark:text-indigo-300"
                : "text-black dark:text-slate-300"
            }`}
          >
            {data.name}
          </Link>
          {breadCrumb.length - 1 !== i ? (
            <IcBaselineGreaterThan className="text-3xl dark:text-slate-300" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
