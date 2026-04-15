"use client";

import { useEffect, useState } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { getGalleryItems } from "@/services/dataService";
import Loader from "@/components/loader";

interface GalleryItem {
  id: number;
  title: string;
  location: string | null;
  description: string | null;
  image: string | null;
  created_date: string | null;
}

export default function GalleryClient() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      const data = await getGalleryItems();
      setItems(data);
      setLoading(false);
    };
    fetchGallery();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <section className="pt-32 pb-24 bg-gradient-to-b from-dark to-primary-dark bg-cover bg-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-50 mb-4">
              Customer <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real moments captured by our travelers across Kashmir.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-14 rounded-2xl border border-dashed border-gray-300 bg-white/60">
              <p className="text-gray-500">No gallery images available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="h-56 bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-dark">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-1">
                      {item.location && (
                        <span className="inline-flex items-center gap-1">
                          <FiMapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      )}
                      {item.created_date && (
                        <span className="inline-flex items-center gap-1">
                          <FiCalendar className="w-3.5 h-3.5" />
                          {item.created_date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
