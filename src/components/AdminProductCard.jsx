import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProductCard from "./AdminEditProductCard";
import displayMMKCurrency from "../helpers/displayMMKCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProductCard, setEditProductCard] = useState(false);
  return (
    <div className="px-4 py-3 bg-white rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data.productImage[0]}
            alt={data.productName}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          {" "}
          <p className="font-semibold">
            {displayMMKCurrency(data.sellingPrice)}
          </p>
        </div>

        <div
          className="ml-auto w-fit bg-green-100 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white"
          onClick={() => setEditProductCard(true)}
        >
          <MdModeEdit />
        </div>
        {editProductCard && (
          <AdminEditProductCard
            productData={data}
            onClose={() => setEditProductCard(false)}
            fetchAllData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductCard;
