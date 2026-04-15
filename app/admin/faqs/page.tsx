'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function FAQsAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/admin/faqs', { cache: 'no-store' });
      const result = await res.json();
      setFaqs(result.data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/faqs/${editingId}` : `/api/admin/faqs`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchFaqs();
        setFormData({ question: '', answer: '' });
        setEditingId(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditingId(faq.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ question: '', answer: '' });
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-600 mt-1">Manage frequently asked questions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <FiPlus size={18} /> FAQ
        </button>
      </div>

      {/* Items Grid */}
      {loading ? (
        <p className="text-gray-600">Loading FAQs...</p>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 bg-white/50 backdrop-blur rounded-lg border border-gray-200">
          <p className="text-gray-600">No FAQs yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/80 backdrop-blur rounded-lg border border-gray-200 p-4 flex justify-between items-start hover:bg-white/90 transition"
            >
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{faq.question}</h3>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(faq)}
                  className="text-primary hover:text-primary-dark transition"
                >
                  <FiEdit2 size={18} />
                </button>
                {deleteId === faq.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(faq.id)} className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                      Yes
                    </button>
                    <button onClick={() => setDeleteId(null)} className="text-xs bg-gray-200 px-2 py-1 rounded">
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteId(faq.id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-primary/10 border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Answer</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={6}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save FAQ'}
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
    </div>
  );
}
