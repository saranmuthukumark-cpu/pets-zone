import { useContext, useState } from "react";
import { PetsContext } from "../context/PetsApi";
import { MdDelete } from "react-icons/md";

import Footer from "../Footer";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(PetsContext);
  const [address, setAddress] = useState("");
  //total
  const totalCart = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  console.log(totalCart);

  // alert
  const handleAlert = () => {
    alert("Pet removed successfully!");
  };

  const handleIncrease = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item,
    );

    setCart(newCart);
  };

  const handleDecrease = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item,
    );

    setCart(newCart);
  };

  const handleDelete = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  //  Payment
  const handlePayment = () => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay failed to load. Check your internet connection.");
      return;
    }
    var option = {
      key: "rzp_test_SPuGoebdfYwF11",
      key_secret: "FJHbFmDWPDwHpWsqo8qJWuAa",
      amount: totalCart * 100,
      currency: "INR",
      name: "Pets_Zone",
      description: "for Testing",
      image: "https://i.ibb.co/BVMSn5xR/pets-lo.png",
      handler: function (response) {
        alert(
          `Payment Successfull Payement id:${response.razorpay_payment_id}`,
        );
      },
      prefill: {
        name: "Pets_zone",
        email: "saranmuthukumar.k@gmail.com",
        contact: "6379745451",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#7f5539ff",
      },
    };
    var pay = new window.Razorpay(option);
    pay.open();
  };

  return (
    <div className="bg-gray-100  ">
      <div className="flex gap-8 h-screen px-8 pt-10">
        {/* cart*/}
        <div className="w-2/3">
          <h1 className="text-2xl font-bold mb-6">My Cart ({cart.length})</h1>

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 flex items-center justify-between mb-4 shadow">
              <img
                src={item.image}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1 ml-4">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-sm">{item.family}</p>
                <p className="font-bold">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="w-8 h-8 bg-gray-200 rounded">
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => handleIncrease(item.id)}
                  className="w-8 h-8 bg-gray-200 rounded">
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  handleDelete(item.id);
                  handleAlert();
                }}
                className="ml-4 text-red-600 text-2xl">
                <MdDelete />
              </button>
            </div>
          ))}

          <div className="bg-[#69462e] text-white p-4 rounded-xl mt-6 flex justify-between font-bold">
            <span className="text-xl font-medium">Total Amount:</span>
            <span className="text-2xl">₹{totalCart}</span>
          </div>
        </div>

        {/* buy form */}
        {cart.length > 0 && (
          <div className="w-1/3 h-screen">
            <div className="bg-white p-6 rounded-lg shadow space-y-6 ">
              <div>
                <h2 className="font-semibold mb-2">
                  Set Your Delivery Address
                </h2>
                <input
                  type="text"
                  onChange={(event) => {
                    (setAddress(event.target.value), console.log(address));
                  }}
                  placeholder="Enter your address"
                  className="w-full px-2 py-3 border border-amber-800 rounded-lg outline-none "
                />
              </div>

              <div>
                <h2 className="font-semibold mb-3">
                  SELECT YOUR PAYMENT METHOD
                </h2>

                <label className="flex items-center gap-2 border  border-amber-800 p-3 rounded-lg cursor-pointer mb-3">
                  <input type="radio" name="payment" defaultChecked />
                  Online Payment
                </label>

                <label className="flex items-center gap-2 border p-3  border-amber-800 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" />
                  Cash on Delivery
                </label>
              </div>
              <hr />
              <div>
                {" "}
                <h2 className="font-semibold mb-3 flex justify-center">
                  BILL DETAILS
                </h2>
                <div className="flex justify-between pt-4">
                  <span>Item Total </span>{" "}
                  <span className="font-bold">₹{totalCart}</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span>Delivery Partner Fee</span>{" "}
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span>Packing & Handling Fee</span>{" "}
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between pt-4 text-xl">
                  <span className="font-bold">To Pay</span>{" "}
                  <span className="font-bold">₹ {totalCart}</span>
                </div>
              </div>
              <button
                disabled={address.length == 0}
                className="w-full bg-[#69462e] text-white py-3 rounded-lg"
                onClick={handlePayment}>
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
