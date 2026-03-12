import { useContext } from "react";
import { PetsContext } from "./context/PetsApi";
import Footer from "./Footer";

export default function PetsPage() {
  const { pets, cartNav, setCartNav, addCart } = useContext(PetsContext);

  const handleAlert = () => {
    alert("Added to Cart successfully!");
  };

  return (
    <div>
      <div className="px-10 py-16 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-12">Available Pets</h1>

        <div className="grid grid-cols-4 gap-8">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-56 object-fill"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">{pet.name}</h2>

                <p className="text-gray-500">{pet.family}</p>

                <p className="text-sm text-gray-600 mt-1">Age: {pet.age}</p>

                <p className="text-lg font-bold text-[#69462e] mt-2">
                  ₹{pet.price}{" "}
                  <del className="text-gray-500 ml-2">₹{pet.oldPrice}</del>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCartNav(cartNav + 1);
                    addCart(pet);
                    handleAlert();
                  }}
                  className="mt-4 w-full bg-[#69462e] text-white py-2 rounded-lg hover:bg-[#523523]">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
