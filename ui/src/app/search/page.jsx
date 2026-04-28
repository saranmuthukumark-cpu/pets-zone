"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { useData } from "@/context/LivestockContext";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const q = query.toLowerCase().trim();

  const { pets, livestocks, supplies, veterinary, pharmacy, loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading
      </div>
    );
  }

  const matchedPets = (pets || []).filter(
    (p) =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.family || "").toLowerCase().includes(q) ||
      (p.location || "").toLowerCase().includes(q)
  );

  const matchedLive = (livestocks || []).filter(
    (l) =>
      (l.animal || "").toLowerCase().includes(q) ||
      (l.breed || "").toLowerCase().includes(q) ||
      (l.location?.district || "").toLowerCase().includes(q) ||
      (l.location?.village || "").toLowerCase().includes(q)
  );

  const matchedSupplies = (supplies || []).filter(
    (s) =>
      (s.name || "").toLowerCase().includes(q) ||
      (s.category || "").toLowerCase().includes(q) ||
      (s.brand || "").toLowerCase().includes(q) ||
      (s.location || "").toLowerCase().includes(q)
  );

  const matchedVeterinary = (veterinary || []).filter(
    (v) =>
      (v.name || "").toLowerCase().includes(q) ||
      (v.specialization || "").toLowerCase().includes(q) ||
      (v.location || "").toLowerCase().includes(q)
  );

  const matchedPharmacy = (pharmacy || []).filter(
    (p) =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.details || "").toLowerCase().includes(q)
  );

  const total = matchedPets.length + matchedLive.length + matchedSupplies.length + matchedVeterinary.length + matchedPharmacy.length;

  return (
    <div className="min-h-screen bg-[#fff8f5] px-4 md:px-12 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Search Results for{" "}
          <span className="text-[#7f5539]">&ldquo;{query}&rdquo;</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {total} result{total !== 1 ? "s" : ""} found
        </p>
      </div>

      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <SearchX size={64} strokeWidth={1.2} />
          <p className="text-lg font-medium">No results found for &ldquo;{query}&rdquo;</p>
          <Link
            href="/"
            className="mt-4 px-6 py-2 bg-[#7f5539] text-white rounded-full text-sm hover:bg-[#6b4430] transition"
          >
            back
          </Link>
        </div>
      ) : (
        <div className="space-y-10">

          {matchedPets.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                Pets ({matchedPets.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedPets.map((pet) => (
                  <Link
                    key={pet._id || pet.id}
                    href={`/pets-detailed-view/${pet._id || pet.id}`}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
                  >
                    <div className="relative h-44">
                      <Image
                        src={pet.image || pet.images?.[0] || "/placeholder.png"}
                        alt={pet.name || "Pet"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                      <p className="text-xs text-gray-500">{pet.family} · {pet.age}</p>
                      <p className="text-sm font-bold text-[#7f5539] mt-1">₹{pet.price || pet.price_inr}</p>
                      <p className="text-xs text-gray-400">{pet.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {matchedLive.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                Livestock ({matchedLive.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedLive.map((animal) => (
                  <div key={animal._id || animal.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group">
                    <div className="relative h-44">
                      <Image
                        src={animal.image || animal.images?.[0] || "/placeholder.png"}
                        alt={animal.animal || "Livestock"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{animal.animal} — {animal.breed}</h3>
                      <p className="text-xs text-gray-500">Age: {animal.age} yrs</p>
                      <p className="text-sm font-bold text-[#7f5539] mt-1">₹{(animal.price_inr || animal.price || 0).toLocaleString("en-IN")}</p>
                      <p className="text-xs text-gray-400">{animal.location?.village || animal.location}, {animal.location?.district}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {matchedSupplies.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                Pet Supplies ({matchedSupplies.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedSupplies.map((item) => (
                  <div key={item._id || item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group">
                    <div className="relative h-44">
                      <Image
                        src={item.image || item.images?.[0] || "/placeholder.png"}
                        alt={item.name || "Item"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.brand} · {item.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[#7f5539]">₹{item.price || item.price_inr}</span>
                        {item.oldPrice && <span className="text-xs text-gray-400 line-through">₹{item.oldPrice}</span>}
                      </div>
                      <p className="text-xs text-gray-400">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {matchedVeterinary.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                Veterinary Doctors ({matchedVeterinary.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedVeterinary.map((doc) => (
                  <div key={doc._id || doc.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group">
                    <div className="relative h-44">
                      <Image
                        src={doc.image || doc.images?.[0] || "/placeholder.png"}
                        alt={doc.name || "Doctor"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                      <p className="text-xs text-gray-500">{doc.specialization}</p>
                      <p className="text-sm font-bold text-[#7f5539] mt-1">₹{doc.fees}</p>
                      <p className="text-xs text-gray-400">{doc.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {matchedPharmacy.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-[#e9d5c8] pb-2">
                Pharmacy ({matchedPharmacy.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedPharmacy.map((med) => (
                  <div key={med._id || med.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group">
                    <div className="relative h-44">
                      <Image
                        src={med.image || med.images?.[0] || "/placeholder.png"}
                        alt={med.name || "Medicine"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{med.name}</h3>
                      <p className="text-xs text-gray-500">{med.brand} · {med.category}</p>
                      <p className="text-sm font-bold text-[#7f5539] mt-1">₹{med.price}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{med.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Searching</div>}>
      <SearchResults />
    </Suspense>
  );
}
