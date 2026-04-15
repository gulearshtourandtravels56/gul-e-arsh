'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface Testimonial {
  id: number;
  name: string;
  review: string;
  location: string;
  rating: number;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', review: '', location: '', rating: 5 });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials', { cache: 'no-store' });
      const result = await res.json();
      setTestimonials(result.data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/testimonials/${editingId}` : `/api/admin/testimonials`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchTestimonials();
        setFormData({ name: '', review: '', location: '', rating: 5 });
        setEditingId(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      review: testimonial.review,
      location: testimonial.location,
      rating: testimonial.rating,
    });
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', review: '', location: '', rating: 5 });
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and feedback</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <FiPlus size={18} /> Add Testimonial
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 transition">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Review *</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-24 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Stars - {renderStars(r)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white py-2 rounded-lg transition font-semibold"
                >
                  {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-lg mb-4">No testimonials yet</p>
          <p className="text-gray-500 text-sm">Add your first testimonial to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/80 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200 hover:border-primary/40 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  {deleteId === testimonial.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(testimonial.id)}
                      className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              <div className="text-yellow-400 text-sm mb-3 font-medium">{renderStars(testimonial.rating)}</div>
              <p className="text-gray-600 text-sm leading-relaxed italic">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
