import { createContext, useState } from "react";
import { PetsContext } from "./PetsApi";

export default function PetsProvider({ children }) {
  const pets = [
    {
      id: 1,
      name: "Golden Retriever",
      family: "Dog",
      age: "2 years",
      oldPrice: 30000,
      price: 25000,
      image:
        "https://i.pinimg.com/736x/60/b4/81/60b481981f4c4c7b2b3a63bf00e52d1d.jpg",
    },
    {
      id: 2,
      name: "Labrador",
      family: "Dog",
      age: "1.5 years",
      oldPrice: 26000,
      price: 22000,
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    },
    {
      id: 3,
      name: "German Shepherd",
      family: "Dog",
      age: "2 years",
      oldPrice: 35000,
      price: 30000,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    },
    {
      id: 4,
      name: "Persian Cat",
      family: "Cat",
      age: "1 year",
      oldPrice: 18000,
      price: 15000,
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
    },
    {
      id: 5,
      name: "Siamese Cat",
      family: "Cat",
      age: "8 months",
      oldPrice: 15000,
      price: 12000,
      image:
        "https://i.pinimg.com/736x/24/2e/32/242e3261aeac93e93ef7b9e088db4112.jpg",
    },
    {
      id: 6,
      name: "Parrot",
      family: "Bird",
      age: "6 months",
      oldPrice: 4000,
      price: 3000,
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3",
    },
    {
      id: 7,
      name: "Love Birds",
      family: "Bird",
      age: "5 months",
      oldPrice: 3000,
      price: 2500,
      image:
        "https://i.pinimg.com/1200x/21/30/e0/2130e0d734544fbff738259ad6c7fbdb.jpg",
    },
    {
      id: 8,
      name: "Cockatiel",
      family: "Bird",
      age: "7 months",
      oldPrice: 5000,
      price: 4000,
      image:
        "https://i.pinimg.com/1200x/4a/91/fd/4a91fddd2204089262510847ddeb9721.jpg",
    },
    {
      id: 9,
      name: "Betta Fish",
      family: "Fish",
      age: "4 months",
      oldPrice: 700,
      price: 500,
      image:
        "https://i.pinimg.com/1200x/6c/01/6a/6c016aca9ead794b0581360ba82af920.jpg",
    },
    {
      id: 10,
      name: "Gold Fish",
      family: "Fish",
      age: "6 months",
      oldPrice: 500,
      price: 300,
      image:
        "https://i.pinimg.com/736x/30/fb/4b/30fb4b7c6aed05a725b80566d0abff3c.jpg",
    },
    {
      id: 11,
      name: "Koi Fish",
      family: "Fish",
      age: "1 year",
      oldPrice: 2500,
      price: 2000,
      image:
        "https://i.pinimg.com/736x/7c/6b/f3/7c6bf33646dd4c729f053622eaa93dd8.jpg",
    },
    {
      id: 12,
      name: "White Rabbit",
      family: "Mammal",
      age: "8 months",
      oldPrice: 2000,
      price: 1500,
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308",
    },
    {
      id: 13,
      name: "Hamster",
      family: "Rodent",
      age: "4 months",
      oldPrice: 1000,
      price: 800,
      image:
        "https://i.pinimg.com/1200x/87/a9/af/87a9affc5dcfdf6fe1b920bdad55e11c.jpg",
    },
    {
      id: 14,
      name: "Guinea Pig",
      family: "Rodent",
      age: "6 months",
      oldPrice: 1500,
      price: 1200,
      image:
        "https://i.pinimg.com/736x/9a/07/5a/9a075ae4c8528d64d63418796214dbca.jpg",
    },
    {
      id: 15,
      name: "Bulldog",
      family: "Dog",
      age: "2 years",
      oldPrice: 40000,
      price: 35000,
      image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
    },
    {
      id: 16,
      name: "Pomeranian",
      family: "Dog",
      age: "1 year",
      oldPrice: 22000,
      price: 18000,
      image:
        "https://i.pinimg.com/736x/d4/c7/4c/d4c74ccd105f1e31e63fe4ff9de05de0.jpg",
    },
    {
      id: 17,
      name: "Maine Coon",
      family: "Cat",
      age: "1.5 years",
      oldPrice: 24000,
      price: 20000,
      image:
        "https://i.pinimg.com/1200x/79/f4/ee/79f4eef0ac4b4ad30f3c2c44673eedbe.jpg",
    },
    {
      id: 18,
      name: "Budgerigar",
      family: "Bird",
      age: "5 months",
      oldPrice: 2000,
      price: 1500,
      image: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe",
    },
    {
      id: 19,
      name: "Angelfish",
      family: "Fish",
      age: "7 months",
      oldPrice: 900,
      price: 700,
      image:
        "https://i.pinimg.com/736x/65/f2/b4/65f2b48df266744d9daab17905808725.jpg",
    },
    {
      id: 20,
      name: "Silkie Chicken",
      family: "Bird",
      age: "1 year",
      oldPrice: 1500,
      price: 1200,
      image:
        "https://i.pinimg.com/736x/da/96/43/da96439cce102ccfb4b165162fd5e203.jpg",
    },
  ];

  const [cartNav, setCartNav] = useState(0);
  const [cart, setCart] = useState([]);

  const addCart = (pet) => {
    const exists = cart.find((item) => item.id === pet.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === pet.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...pet, qty: 1 }]);
    }
  };

  return (
    <PetsContext.Provider
      value={{ pets, cartNav, setCartNav, cart, setCart, addCart }}>
      {children}
    </PetsContext.Provider>
  );
}
