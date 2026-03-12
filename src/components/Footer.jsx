export default function Footer() {
  return (
    <footer className="bg-[#ede0d4ff] text-[#7f5539ff] font-bold ">

      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">

        
        <h2 className="text-xl font-bold">
          <img src="/public/assets/pets-lo.png" alt="" className="h-10"/>
        </h2>

       
        <div className="flex gap-6 text-sm cursor-pointer">
          <p className="cursor-pointer hover:text-amber-900">Home</p>
          <p className="cursor-pointer hover:text-amber-900">Pets</p>
          <p className="cursor-pointer hover:text-amber-900">Services</p>
          <p className="cursor-pointer hover:text-amber-900">Cart</p>
        </div>

        
      </div>

      <div className="text-center text-gray-400 text-sm pb-4">
        © 2026 <span>PetsZone</span>. All Rights Reserved. Designed by <span>Saran 💗.</span>
      </div>

    </footer>
  );
}