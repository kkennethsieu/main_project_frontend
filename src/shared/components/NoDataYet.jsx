// components/NoDataYet.jsx
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const NoDataYet = ({
  message = "No data yet.",
  actionText,
  onAction,
  user = null,
}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-orange-50 p-8 border border-orange-200 rounded-lg text-gray-800">
      <ExclamationCircleIcon className="mb-4 w-12 h-12 text-orange-600" />
      <p className="mb-4 font-semibold text-lg">{message}</p>

      {actionText && user ? (
        <button
          onClick={onAction}
          className="bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-md text-white transition"
        >
          {actionText}
        </button>
      ) : !user && actionText ? (
        <p className="text-orange-800 text-sm">
          Log in to {actionText.toLowerCase()}.
        </p>
      ) : null}
    </div>
  );
};

export default NoDataYet;
