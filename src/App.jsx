import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Cart from "./components/cart/cart";
import { PetsContext } from "./components/context/PetsApi";
import PetsProvider from "./components/context/PetsContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PetsPage from "./components/PetsPage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <PetsProvider>
        <BrowserRouter>
          <Navbar />

        
          <Routes>
            <Route path="/" element={<Hero />} />

            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/orderpage" element={<OrderPage />} /> */}
          </Routes>
        
        </BrowserRouter>
      </PetsProvider>
    </>
  );
}
