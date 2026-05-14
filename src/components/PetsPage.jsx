import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { PetsContext } from "./context/PetsApi";
import Footer from "./Footer";
import supabase from "../../utils/supabase";
export default function PetsPage() {
  const { cartNav, setCartNav, addCart } = useContext(PetsContext);
  //supabase data fetch

  const [petsZone, setPetsZone] = useState([]);

  useEffect(() => {
    async function petPage() {
      const { data } = await supabase.from("pets_zone").select();
      setPetsZone(data);
    }
    petPage();
  }, []);

  const handleAlert = () => {
    alert("Added to Cart successfully!");
  };
  // delete

  async function handleDelete(id) {
    const { error } = await supabase.from("pets_zone").delete().eq("id", id);

    if (error) {
      alert("Failed to delete", error);
    } else {
      window.confirm("Are you sure you want to delete this Pet?");
      setPetsZone(petsZone.filter((dbpet) => dbpet.id !== id));
    }
  }

  return (
    <div>
      {petsZone.length > 0 ? (
        <div className="px-10 py-16 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold text-center mb-12">
            Available Pets
          </h1>

          <div className="grid grid-cols-4 gap-8">
            {petsZone.map((dbpet) => (
              <div
                key={dbpet.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img
                  src={dbpet.image}
                  alt={dbpet.name}
                  className="w-full h-56 object-fill"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold">{dbpet.name}</h2>

                  <p className="text-gray-500">{dbpet.family}</p>

                  <p className="text-sm text-gray-600 mt-1">Age: {dbpet.age}</p>

                  <p className="text-lg font-bold text-[#69462e] mt-2">
                    ₹{dbpet.price}{" "}
                    <del className="text-gray-500 ml-2">₹{dbpet.oldPrice}</del>
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCartNav(cartNav + 1);
                      addCart(dbpet);
                      handleAlert();
                    }}
                    className="mt-4 w-full bg-[#69462e] text-white py-2 rounded-lg hover:bg-[#523523]">
                    Add to Cart
                  </button>
                  <div className=" flex justify-around  ">
                    <Link
                      to={`/addpetform/${dbpet.id}`}
                      className="w-[45%] bg-blue-500 py-2 rounded-lg items-center mt-4 flex justify-center ">
                      {" "}
                      <button className="   text-white  ">Edit</button>
                    </Link>
                    <button
                      className="mt-4 w-[45%] bg-red-500 text-white py-2 rounded-lg"
                      onClick={() => handleDelete(dbpet.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-2xl font-bold text-center py-10">Loading</div>
      )}
      <Footer />
    </div>
  );
}
