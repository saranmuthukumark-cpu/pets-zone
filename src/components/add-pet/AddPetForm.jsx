import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPetForm() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    if (id) {
      const { error } = await supabase
        .from("pets_zone")
        .update(formData)
        .eq("id", id);
      alert("Pet Updated Successfully");
      navigate("/");
      e.target.reset();

      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from("pets_zone").insert(formData);
      alert("Pet Added Successfully");
      e.target.reset();

      if (error) alert(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      async function getPet() {
        const { data } = await supabase
          .from("pets_zone")
          .select()
          .eq("id", id)
          .single();
        setPet(data);
      }
      getPet();
    }
  }, [id]);

  return (
    <>
      <section className="">
        <div className="h-screen   bg-gray-100 ">
                  <h2 className="text-2xl font-bold text-center py-10 flex justify-center"><img src="/public/assets/pets-lo.png" alt="" className="h-20" /></h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-100 space-y-4 mx-auto ">
              
            <input
              type="text"
              name="name"
              defaultValue={pet?.name}
              placeholder="Pet Name"
              className="w-full border border-amber-900 p-2 rounded outline-none "
              required
            />

            <input
              type="text"
              name="family"
              defaultValue={pet?.family}
              placeholder="Family "
              className="w-full border  border-amber-900 p-2 rounded outline-none "
              required
            />

            <input
              type="text"
              name="age"
              defaultValue={pet?.age}
              placeholder="Age"
              className="w-full border  border-amber-900 p-2 rounded outline-none "
              required
            />

            <input
              type="number"
              name="oldPrice"
              defaultValue={pet?.oldPrice}
              placeholder="Old Price"
              className="w-full border  border-amber-900 p-2 rounded outline-none "
              required
            />

            <input
              type="number"
              name="price"
              defaultValue={pet?.price}
              placeholder="Price"
              className="w-full border  border-amber-900 p-2 rounded outline-none "
              required
            />

            <input
              type="text"
              name="image"
              defaultValue={pet?.image}
              placeholder="Image url"
              className="w-full border  border-amber-900 p-2 rounded outline-none "
              required
            />

            <button
              type="submit"
              className="w-full bg-[#7f5539ff] text-white p-2 rounded ">
              {id ? "Update Pet" : "Add Pet"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
