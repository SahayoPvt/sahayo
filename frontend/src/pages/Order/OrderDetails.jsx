import React from "react";

const OrderDetails = () => {
  const date = new Date();
  const delivereyDate = new Date();
  delivereyDate.setDate(date.getDate() + 10);

  const productSpecifications = [
    {
      styleTitle: "Neck Style (Front)",
      specification: "Collar Neck",
    },
    {
      styleTitle: "Neck Style (Back)",
      specification: "Round Back",
    },
    {
      styleTitle: "Sleeve Style",
      specification: "Full Sleeve",
    },
    {
      styleTitle: "Opening Style",
      specification: "Back Opening",
    },
    {
      styleTitle: "Padded Style",
      specification: "With Padding",
    },
    {
      styleTitle: "Fastening Style",
      specification: "Hook & Eye",
    },
    {
      styleTitle: "Piping Style",
      specification: "With Piping",
    },
  ];

  return (
    <div className="mx-8 mt-24 flex flex-col gap-3">
      <h2 className="text-2xl uppercase text-shadow-md">Order Details</h2>
      <section className="flex justify-between">
        <section className="flex flex-col gap-3">
          <div className="">
            Order Placed{" "}
            <span className="font-medium">{date.toDateString()}</span> | Order
            Number <span className="font-medium">#SAH1234</span>
            <br />
            Order Delivered{" "}
            <span className="font-medium">{delivereyDate.toDateString()}</span>
          </div>
          <table className="h-fit text-sm">
            <thead className="border-b-[1.5px] text-base">
              <tr>
                <th scope="col" className="px-6 py-2">
                  Style Category
                </th>
                <th scope="col" className="px-6 py-2">
                  Specifications
                </th>
              </tr>
            </thead>
            <tbody>
              {productSpecifications.map((productSpecification) => (
                <tr className="border-b *:px-6 *:py-2">
                  <td className="">{productSpecification.styleTitle}</td>
                  <td className="">{productSpecification.specification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="flex flex-col gap-4">
          <div className="rounded border px-6 py-3 shadow-md">
            <p className="text-lg font-medium">Shipping Address</p>
            <p className="text-lg font-medium">Yash Singhal</p>
            <p className="">
              <span className="font-medium">Contact: </span>9893838921
            </p>
            <p className="w-50">
              Tata Consultancy Services, Tigariya Badshah, Indore, 452001 M.P.
              INDIA
            </p>
          </div>
          <div className="rounded border px-6 py-3 shadow-md">
            <p className="text-lg font-medium">Order Summary</p>
            <div className="flex justify-between gap-5">
              <span>Item(s) Subtotal:</span>
              <span>₹499.00</span>
            </div>
            <div className="flex justify-between gap-5">
              <span>Shipping:</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between gap-5">
              <span>Total:</span>
              <span>₹499.00</span>
            </div>
            <div className="flex justify-between gap-5 text-red-500">
              <span>Promotion Applied:</span>
              <span>-₹30.00</span>
            </div>
            <hr className="my-1" />
            <div className="flex justify-between gap-5 font-medium text-blue-900">
              <span>Promotion Applied:</span>
              <span>₹469.00</span>
            </div>
            <p className="text-sm">
              Paid by:<span className="font-medium"> BHIM UPI</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
