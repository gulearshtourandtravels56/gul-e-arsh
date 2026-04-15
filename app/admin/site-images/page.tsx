'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import Image from 'next/image';

interface SiteImage {
  id: number;
  key: string;
  url: string;
}

export default function SiteImagesAdmin() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ key: '', url: '' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin/site-images', { cache: 'no-store' });
      const result = await res.json();
      setImages(result.data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/site-images/${editingId}` : `/api/admin/site-images`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchImages();
        setFormData({ key: '', url: '' });
        setEditingId(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (image: SiteImage) => {
    setFormData({ key: image.key, url: image.url });
    setEditingId(image.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/site-images/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ key: '', url: '' });
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Images</h1>
          <p className="text-gray-600 mt-1">Manage site images and assets</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <FiPlus size={18} /> Image
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Image' : 'Add Image'}</h2>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 transition">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Key (identifier) *</label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., hero-bg, logo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
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

      {/* Images List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-lg mb-4">No images yet</p>
          <p className="text-gray-500 text-sm">Add your first image to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white/80 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary/40 group"
            >
              <div className="relative w-full h-48 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.key}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{image.key}</h3>
                    <p className="text-xs text-gray-500 truncate mt-1">{image.url}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(image)}
                      className="p-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    {deleteId === image.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(image.id)} className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                          Yes
                        </button>
                        <button onClick={() => setDeleteId(null)} className="text-xs bg-gray-200 px-2 py-1 rounded">
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteId(image.id)}
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
