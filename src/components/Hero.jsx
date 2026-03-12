import Footer from "./Footer";
import PetsPage from "./PetsPage";

export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/public/assets/slide1.jpg')" }}>
      <div className="h-full w-full bg-white/20 flex items-center justify-center text-center">
        <div>
          <h1 className="text-7xl font-bold text-black/80 mb-4">
            Find Your Perfect Pet
          </h1>

          <p className="text-gray-900 text-lg mb-6">
            Discover dogs, cats, birds, fishes and more.
          </p>

          <button className="bg-[#69462e] text-white px-6 py-3 rounded-lg hover:bg-[#523523]">
            Explore Pets
          </button>
        </div>
      </div>
      <PetsPage />
    </section>
  );
}
