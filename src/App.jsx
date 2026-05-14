import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Cart from "./components/cart/cart";
import PetsProvider from "./components/context/PetsContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import AddPetForm from "./components/add-pet/AddPetForm";
import PetsPage from "./components/PetsPage";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";

export default function App() {
  return (
    <>
      <PetsProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Hero />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/petspage" element={<PetsPage />} />

            <Route path="/addpetform/:id" element={<AddPetForm />} />
            <Route path="/addpetform" element={<AddPetForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* <Route path="/orderpage" element={<OrderPage />} /> */}
          </Routes>
        </BrowserRouter>
      </PetsProvider>
    </>
  );
}
