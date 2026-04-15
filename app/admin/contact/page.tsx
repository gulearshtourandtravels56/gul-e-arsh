"use client";

import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";

interface SocialLink {
  id?: number;
  platform: string;
  url: string;
}

interface Contact {
  id: number;
  phone: string;
  email: string;
  address: string;
  address_link: string;
  social_links: SocialLink[];
}

export default function ContactAdmin() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    address_link: "",
    social_links: [] as SocialLink[],
  });
  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });
  const [editingSocialIndex, setEditingSocialIndex] = useState<number | null>(null);
  const socialPlatforms = ["instagram", "facebook", "whatsapp", "linkedin", "youtube", "twitter"];

  const fetchContact = async () => {
    try {
      const res = await fetch("/api/admin/contact", { cache: "no-store" });
      const result = await res.json();
      if (result.data) {
        setContact(result.data);
        setFormData({
          phone: result.data.phone || "",
          email: result.data.email || "",
          address: result.data.address || "",
          address_link: result.data.address_link || "",
          social_links: result.data.social_links || [],
        });
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleAddSocial = () => {
    if (newSocial.platform && newSocial.url) {
      if (editingSocialIndex !== null) {
        const updatedSocials = [...formData.social_links];
        updatedSocials[editingSocialIndex] = {
          ...updatedSocials[editingSocialIndex],
          platform: newSocial.platform,
          url: newSocial.url,
        };
        setFormData({ ...formData, social_links: updatedSocials });
        setEditingSocialIndex(null);
        setNewSocial({ platform: "", url: "" });
        return;
      }

      setFormData({
        ...formData,
        social_links: [...formData.social_links, newSocial],
      });
      setNewSocial({ platform: "", url: "" });
    }
  };

  const handleEditSocial = (index: number) => {
    setEditingSocialIndex(index);
    setNewSocial({
      platform: formData.social_links[index].platform,
      url: formData.social_links[index].url,
    });
  };

  const handleCancelSocialEdit = () => {
    setEditingSocialIndex(null);
    setNewSocial({ platform: "", url: "" });
  };

  const handleRemoveSocial = (index: number) => {
    setFormData({
      ...formData,
      social_links: formData.social_links.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchContact();
        alert("Contact info updated successfully!");
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Failed to save contact info");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Contact Information
        </h1>
        <p className="text-gray-600 mt-1">
          Update your contact details and social links
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading contact info...</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-200 p-8 space-y-6"
            >
              {/* Basic Contact Info */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 pb-4 border-b">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={formData.address_link}
                    onChange={(e) =>
                      setFormData({ ...formData, address_link: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4 pt-6 border-t">
                <h2 className="text-lg font-bold text-gray-900">
                  Social Media Links
                </h2>

                {formData.social_links.length > 0 && (
                  <div className="space-y-2">
                    {formData.social_links.map((social, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-linear-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200 hover:from-blue-50 hover:to-blue-50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {social.platform}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {social.url}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditSocial(index)}
                            className="px-3 py-2 text-primary bg-transparent hover:bg-primary/20 rounded-lg transition flex items-center gap-1.5 text-sm font-medium"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSocial(index)}
                            className="px-3 py-2 text-red-600 bg-transparent hover:bg-red-100 rounded-lg transition flex items-center gap-1.5 text-sm font-medium"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <select
                    value={newSocial.platform}
                    onChange={(e) =>
                      setNewSocial({ ...newSocial, platform: e.target.value })
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select platform</option>
                    {socialPlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                  <input
                    type="url"
                    value={newSocial.url}
                    onChange={(e) =>
                      setNewSocial({ ...newSocial, url: e.target.value })
                    }
                    placeholder="Profile URL"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddSocial}
                      className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-semibold shadow-md hover:shadow-lg"
                    >
                      <FiPlus size={18} /> {editingSocialIndex !== null ? "Update" : "Add"}
                    </button>
                    {editingSocialIndex !== null && (
                      <button
                        type="button"
                        onClick={handleCancelSocialEdit}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg transition"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white py-3 rounded-lg transition font-semibold shadow-md hover:shadow-lg"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
