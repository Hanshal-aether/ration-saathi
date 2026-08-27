"use client";

import { useEffect, useState } from "react";
import { useStateContext } from "../../components/providers";
import { StateGuard } from "../../components/state-guard";
import { ProtectedRoute } from "../../components/protected-route";
import Image from "next/image";

const SHOP_IMAGES = [
  "/images/shops/shop-1.svg",
  "/images/shops/shop-2.svg",
  "/images/shops/shop-3.svg",
];

function ShopsContent() {
  const { state } = useStateContext();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, [state]);

  const fetchShops = async () => {
    try {
      const res = await fetch(`/api/applications?state=${state}`);
      const data = await res.json();
      
      // Get unique shops
      const shopSet = new Map();
      if (data.shops) {
        data.shops.forEach((shop, idx) => {
          if (!shopSet.has(shop.name)) {
            shopSet.set(shop.name, {
              ...shop,
              image: SHOP_IMAGES[idx % SHOP_IMAGES.length],
            });
          }
        });
      }
      
      setShops(Array.from(shopSet.values()));
    } catch (err) {
      console.error("Failed to fetch shops:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StateGuard>
      <main className="pb-24 pt-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fair Price Shops</h1>
            <p className="text-gray-500">Find nearby shops in {state}</p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 h-32 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : shops.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🏪</div>
              <p className="text-gray-600 font-medium">No shops available yet</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon for {state}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shops.map((shop, idx) => (
                <div
                  key={shop.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-sky-500 hover:shadow-lg transition"
                >
                  {/* Shop Image */}
                  <div className="relative w-full h-40 bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Shop Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{shop.name}</h3>
                    
                    {/* Location */}
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-lg">📍</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{shop.address || "Address available soon"}</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                      <span>⏰</span>
                      <span>Mon - Sat, 10 AM - 6 PM</span>
                    </div>

                    {/* Available items indicator */}
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <div className="flex-1 text-center">
                        <div className="text-xs text-gray-500 mb-1">Rice</div>
                        <div className="text-lg">🍚</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-gray-500 mb-1">Wheat</div>
                        <div className="text-lg">🌾</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-gray-500 mb-1">Sugar</div>
                        <div className="text-lg">🥄</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-4 pb-4">
                    <button className="w-full py-2 px-3 bg-sky-50 hover:bg-sky-100 text-sky-600 font-semibold rounded-lg transition text-sm">
                      Book Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </StateGuard>
  );
}

export default function ShopsPage() {
  return (
    <ProtectedRoute>
      <ShopsContent />
    </ProtectedRoute>
  );
}
