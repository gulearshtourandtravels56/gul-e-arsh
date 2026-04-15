"use client";

import { useEffect, useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { getFAQs } from "@/services/dataService";
import Loader from "./loader";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQsSection() {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      const data = await getFAQs();
      setFaqs(data);
      setOpenId(data[0]?.id ?? null);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <section className="py-24 bg-gradient-to-bl from-dark to-primary-dark" id="faqs-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              <FiHelpCircle className="w-4 h-4" />
              FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Quick answers to common questions about bookings, travel plans, and our services.
            </p>
          </div>

          {faqs.length === 0 ? (
            <div className="text-center py-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50/60">
              <p className="text-gray-500">No FAQs available right now.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                    >
                      <span className="font-semibold text-dark">{faq.question}</span>
                      <FiChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
