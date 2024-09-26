import React, { useEffect, useState } from "react";
import SummerApi from "../common";
import moment from "moment";
import displayMMKCurrency from "../helpers/displayMMKCurrency";

const Order = () => {
  const [data, setData] = useState([]);
  const fetchOrderList = async () => {
    const fetchRes = await fetch(SummerApi.getOrderList.url, {
      method: SummerApi.getOrderList.method,
      credentials: "include",
    });
    const dataRes = await fetchRes.json();
    setData(dataRes.data);
    console.log(dataRes);
  };

  useEffect(() => {
    fetchOrderList();
  }, []);
  return (
    <div className="min-h-[calc(100vh-100px)]">
      {!data[0] && <p>No Order List</p>}
      <div className="p-4 w-full ">
        {data.map((el, index) => {
          return (
            <div key={index} className="">
              <p className="font-medium text-lg">
                {moment(el.createdAt).format("LL")}
              </p>
              <div className="border rounded">
                <div className="flex justify-between">
                  <div className="grid gap-2 mt-3 p-4 max-w-lg">
                    {el.productDetails.map((d, i) => {
                      return (
                        <div
                          key={d.name + i}
                          className="flex gap-3"
                        >
                          <img
                            src={d.image[0]}
                            className="w-28 h-28 object-scale-down bg-white p-2 "
                          />
                          <div className="">
                            <div className="font-medium text-lg text-ellipsis line-clamp-1">
                              {d.name}
                            </div>
                            <div className="flex gap-5 items-center mt-2">
                              <p className="text-red-600 text-lg">
                                {displayMMKCurrency(d.price)}
                              </p>
                              <p className="text-lg">Quantity: {d.quantiy}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <p className="font-medium text-lg">Payment Details: </p>
                      <p className=" ml-2">
                        Payment Method:{" "}
                        {el.paymentDetails.payment_method_types[0]}
                      </p>
                      <p className="ml-2">
                        Payment Status: {el.paymentDetails.payment_status}
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-lg">
                        Shipping Details:{" "}
                      </div>
                      {el.paymentDetails.shipping_options.map(
                        (shipping, index) => {
                          return (
                            <div
                              key={shipping.shipping_amount + index}
                              className=" ml-2"
                            >
                              Shipping Amount: {shipping.shipping_amount}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-auto w-fit lg:text-lg min-w-[300px ]">
                <p className="font-semibold">
                  Total Amount: {el.paymentDetails.totalAmount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
