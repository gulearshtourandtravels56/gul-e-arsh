'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface GalleryItem {
  id: number;
  title: string;
  location: string;
  description: string | null;
  image: string | null;
  created_date: string | null;
}

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    image: '',
    created_date: '',
  });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/gallery', { cache: 'no-store' });
      const result = await res.json();
      setItems(result.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/gallery/${editingId}` : '/api/admin/gallery';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchItems();
        setFormData({ title: '', location: '', description: '', image: '', created_date: '' });
        setEditingId(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title || '',
      location: item.location || '',
      description: item.description || '',
      image: item.image || '',
      created_date: item.created_date || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', location: '', description: '', image: '', created_date: '' });
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-1">Manage gallery entries</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <FiPlus size={18} /> Add Item
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-xl shadow-2xl">
            <div className="sticky top-0 bg-primary/10 border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h2>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700 transition">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Created Date</label>
                <input
                  type="date"
                  value={formData.created_date}
                  onChange={(e) => setFormData({ ...formData, created_date: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Item'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading gallery...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white/50 backdrop-blur rounded-lg border border-gray-200">
          <p className="text-gray-600">No gallery items yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur rounded-lg border border-gray-200 p-4 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                {item.image && <p className="text-xs text-gray-400 mt-1 truncate">{item.image}</p>}
                {item.created_date && <p className="text-xs text-gray-400 mt-1">Date: {item.created_date}</p>}
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => handleEdit(item)} className="text-primary hover:text-primary-dark transition">
                  <FiEdit2 size={18} />
                </button>
                {deleteId === item.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(item.id)} className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                      Yes
                    </button>
                    <button onClick={() => setDeleteId(null)} className="text-xs bg-gray-200 px-2 py-1 rounded">
                      No
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteId(item.id)} className="text-red-600 hover:text-red-700 transition">
                    <FiTrash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
