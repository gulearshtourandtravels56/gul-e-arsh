"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface Company {
  id: number;
  name: string;
  tagline: string;
  description: string;
  mission: string;
  created_at: string;
  updated_at: string;
}

interface CompanyStat {
  id: number;
  company_id: number;
  value: string;
  label: string;
}

export default function CompanyAdmin() {
  const [company, setCompany] = useState<Company | null>(null);
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsSaving, setStatsSaving] = useState(false);
  const [showStatForm, setShowStatForm] = useState(false);
  const [editingStatId, setEditingStatId] = useState<number | null>(null);
  const [statFormData, setStatFormData] = useState({ company_id: 1, value: "", label: "" });
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    mission: "",
  });

  const fetchCompany = async () => {
    try {
      const res = await fetch("/api/admin/company", { cache: "no-store" });
      const result = await res.json();
      if (result.data) {
        setCompany(result.data);
        setFormData({
          name: result.data.name || "",
          tagline: result.data.tagline || "",
          description: result.data.description || "",
          mission: result.data.mission || "",
        });
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/company-stats", { cache: "no-store" });
      const result = await res.json();
      setStats(result.data || []);
    } catch (error) {
      console.error("Error fetching company stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchStats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchCompany();
      }
    } catch (error) {
      console.error("Error saving company:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleStatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatsSaving(true);
    try {
      const method = editingStatId ? "PUT" : "POST";
      const url = editingStatId
        ? `/api/admin/company-stats/${editingStatId}`
        : "/api/admin/company-stats";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...statFormData, company_id: Number(statFormData.company_id) || 1 }),
      });

      if (res.ok) {
        await fetchStats();
        setStatFormData({ company_id: 1, value: "", label: "" });
        setEditingStatId(null);
        setShowStatForm(false);
      }
    } catch (error) {
      console.error("Error saving stat:", error);
    } finally {
      setStatsSaving(false);
    }
  };

  const handleEditStat = (stat: CompanyStat) => {
    setStatFormData({ company_id: stat.company_id, value: stat.value, label: stat.label });
    setEditingStatId(stat.id);
    setShowStatForm(true);
  };

  const handleDeleteStat = async (id: number) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;
    try {
      const res = await fetch(`/api/admin/company-stats/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchStats();
    } catch (error) {
      console.error("Error deleting stat:", error);
    }
  };

  const handleCloseStatForm = () => {
    setShowStatForm(false);
    setEditingStatId(null);
    setStatFormData({ company_id: 1, value: "", label: "" });
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company</h1>
          <p className="text-gray-600 mt-1">Manage company info and stats in one place</p>
        </div>
        <button
          onClick={() => setShowStatForm(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <FiPlus size={18} /> Add Stat
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading company info...</p>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="max-w-2xl w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-200 p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="A short tagline for your company"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-32 resize-none"
                  placeholder="Detailed description of your company"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mission Statement
                </label>
                <textarea
                  value={formData.mission}
                  onChange={(e) =>
                    setFormData({ ...formData, mission: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-32 resize-none"
                  placeholder="Your company's mission and values"
                />
              </div>

              {company && (
                <div className="text-xs text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-700 mb-1">Last updated</p>
                  <p>{new Date(company.updated_at).toLocaleString()}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white py-3 rounded-lg transition font-semibold shadow-md hover:shadow-lg"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

            <div className="mt-8 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Company Stats</h2>

              {statsLoading ? (
                <p className="text-gray-600">Loading stats...</p>
              ) : stats.length === 0 ? (
                <div className="text-center py-8 bg-gray-50/50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">No stats yet</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{stat.label}</h3>
                        <p className="text-sm text-gray-600 mt-1">{stat.value}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditStat(stat)}
                          className="text-primary hover:text-primary-dark transition"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteStat(stat.id)}
                          className="text-red-600 hover:text-red-700 transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showStatForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-xl shadow-2xl">
            <div className="sticky top-0 bg-primary/10 border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingStatId ? "Edit Stat" : "Add New Stat"}
              </h2>
              <button onClick={handleCloseStatForm} className="text-gray-500 hover:text-gray-700 transition">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleStatSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Label</label>
                <input
                  type="text"
                  value={statFormData.label}
                  onChange={(e) => setStatFormData({ ...statFormData, label: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <input
                  type="text"
                  value={statFormData.value}
                  onChange={(e) => setStatFormData({ ...statFormData, value: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={statsSaving}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition disabled:opacity-50"
                >
                  {statsSaving ? "Saving..." : "Save Stat"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseStatForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
