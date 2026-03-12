import { useContext } from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import { PetsContext } from "./context/PetsApi";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { pets, cartNav, setCartNav, cart } = useContext(PetsContext);

  return (
    <>
      <div className=" shadow-lg px-10  flex items-center justify-between">
        <div>
          <NavLink to="/">
            <img
              src="/public/assets/pets-lo.png"
              alt="logo"
              className="h-15 pt-1"
            />
          </NavLink>
        </div>

        <div className="flex items-center gap-8  font-medium">
          <div className="">
            <select className=" px-3 py-2 rounded-lg cursor-pointer text-[#7f5539ff] appearance-none outline-none ">
              <option>Pets</option>
              <option>Dogs</option>
              <option>Cats</option>
              <option>Chicks</option>
              <option>Fishes</option>
              <option>Birds</option>
            </select>

            <select className=" px-2 py-2 rounded-lg cursor-pointer text-[#7f5539ff] appearance-none outline-none">
              <option>Pet Services</option>
              <option>Pet Grooming</option>
              <option>Veterinary</option>
              <option>Pet Training</option>
              <option>Pet Transport </option>
            </select>

            <select className="px-2 py-2  rounded-lg cursor-pointer text-[#7f5539ff] appearance-none outline-none">
              <option>Pets Foods</option>
              <optgroup label="Dog Food">
                <option>Wet Food </option>
                <option>Grain-Free</option>
                <option>Raw Diet</option>
                <option>Puppy</option>
              </optgroup>
              <optgroup label="Cat Food">
                <option>Dry Kibble</option>
                <option>Wet Food</option>
                <option>Kitten Food</option>
                <option>Hairball</option>
              </optgroup>
              <optgroup label="Fish Food">
                <option>Flakes</option>
                <option>Pellets</option>
                <option>Wafers</option>
                <option>Dried</option>
                <option>Live Food</option>
                <option>Feeder</option>
              </optgroup>
            </select>
          </div>

          <div className="relative cursor-pointer text-3xl text-[#7f5539ff] w-fit">
            <NavLink to="/cart">
              {" "}
              <PiShoppingCartFill />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-950 text-[10px] font-bold text-white">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
          <button className=" bg-[#7f5539ff] text-white px-5 py-2 rounded-lg hover:bg-[#69462e]">
            Sell Your Pet
          </button>

          <button className=" bg-[#7f5539ff] text-white px-5 py-2 rounded-lg hover:bg-[#69462e]">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}
