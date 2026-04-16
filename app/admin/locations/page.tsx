'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

interface Location {
  id: number;
  name: string;
  subtitle: string;
  altitude: string;
  distance_from_srinagar: string;
  description: string;
  long_description: string;
  best_time: string;
  image: string;
}

interface Highlight { id: number; highlight: string; }
interface BestFor { id: number; tag: string; }
interface WhatToSee { id: number; title: string; image: string; description: string; }

interface LocationDetails {
  highlights: Highlight[];
  best_for: BestFor[];
  what_to_see: WhatToSee[];
}

type SubSection = 'highlight' | 'best_for' | 'what_to_see';

interface SubFormState { section: SubSection; locationId: number; editId: number | null; }

const emptyLoc = {
  name: '', subtitle: '', altitude: '', distance_from_srinagar: '',
  description: '', long_description: '', best_time: '', image: '',
};

export default function LocationsAdmin() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyLoc);
  const [saving, setSaving] = useState(false);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, LocationDetails>>({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [subForm, setSubForm] = useState<SubFormState | null>(null);
  const [highlightInput, setHighlightInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [wtsForm, setWtsForm] = useState({ title: '', image: '', description: '' });
  const [subSaving, setSubSaving] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState<{ type: SubSection | 'location'; locationId: number; itemId: number } | null>(null);

  /* ─── Fetch ─── */
  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/admin/locations', { cache: 'no-store' });
      const result = await res.json();
      setLocations(result.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchDetails = async (locId: number) => {
    setDetailsLoading(true);
    try {
      const [h, b, w] = await Promise.all([
        fetch(`/api/admin/locations/${locId}/highlights`).then(r => r.json()),
        fetch(`/api/admin/locations/${locId}/best-for`).then(r => r.json()),
        fetch(`/api/admin/locations/${locId}/what-to-see`).then(r => r.json()),
      ]);
      setDetails(prev => ({
        ...prev,
        [locId]: { highlights: h.data || [], best_for: b.data || [], what_to_see: w.data || [] },
      }));
    } catch (e) { console.error(e); }
    finally { setDetailsLoading(false); }
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleExpand = async (locId: number) => {
    if (expandedId === locId) { setExpandedId(null); setSubForm(null); return; }
    setExpandedId(locId);
    setSubForm(null);
    if (!details[locId]) await fetchDetails(locId);
  };

  /* ─── Location CRUD ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/locations/${editingId}` : '/api/admin/locations';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      if (res.ok) { fetchLocations(); setFormData(emptyLoc); setEditingId(null); setShowForm(false); }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleEdit = (loc: Location) => {
    setFormData({ name: loc.name, subtitle: loc.subtitle || '', altitude: loc.altitude || '',
      distance_from_srinagar: loc.distance_from_srinagar || '', description: loc.description || '',
      long_description: loc.long_description || '', best_time: loc.best_time || '', image: loc.image || '' });
    setEditingId(loc.id); setShowForm(true);
  };

  const handleDeleteLocation = async (id: number) => {
    try {
      await fetch(`/api/admin/locations/${id}`, { method: 'DELETE' });
      await fetchLocations();
      if (expandedId === id) setExpandedId(null);
    } catch (e) { console.error(e); }
    finally { setDeleteConfirm(null); }
  };

  /* ─── Sub-item forms ─── */
  const openSubForm = (section: SubSection, locationId: number, editId?: number) => {
    setSubForm({ section, locationId, editId: editId ?? null });
    const loc = details[locationId];
    if (editId && loc) {
      if (section === 'highlight') {
        setHighlightInput(loc.highlights.find(h => h.id === editId)?.highlight ?? '');
      } else if (section === 'best_for') {
        setTagInput(loc.best_for.find(b => b.id === editId)?.tag ?? '');
      } else if (section === 'what_to_see') {
        const item = loc.what_to_see.find(w => w.id === editId);
        setWtsForm({ title: item?.title ?? '', image: item?.image ?? '', description: item?.description ?? '' });
      }
    } else {
      setHighlightInput(''); setTagInput('');
      setWtsForm({ title: '', image: '', description: '' });
    }
  };

  const handleSubSave = async () => {
    if (!subForm) return; setSubSaving(true);
    const { section, locationId, editId } = subForm;
    try {
      let url = '', body: object = {}, method = editId ? 'PUT' : 'POST';
      if (section === 'highlight') {
        url = editId ? `/api/admin/locations/${locationId}/highlights/${editId}` : `/api/admin/locations/${locationId}/highlights`;
        body = { highlight: highlightInput };
      } else if (section === 'best_for') {
        url = editId ? `/api/admin/locations/${locationId}/best-for/${editId}` : `/api/admin/locations/${locationId}/best-for`;
        body = { tag: tagInput };
      } else if (section === 'what_to_see') {
        url = editId ? `/api/admin/locations/${locationId}/what-to-see/${editId}` : `/api/admin/locations/${locationId}/what-to-see`;
        body = wtsForm;
      }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { await fetchDetails(locationId); setSubForm(null); }
    } catch (e) { console.error(e); }
    finally { setSubSaving(false); }
  };

  const handleSubDelete = async () => {
    if (!deleteConfirm || deleteConfirm.type === 'location') return;
    const { type, locationId, itemId } = deleteConfirm;
    try {
      let url = '';
      if (type === 'highlight') url = `/api/admin/locations/${locationId}/highlights/${itemId}`;
      else if (type === 'best_for') url = `/api/admin/locations/${locationId}/best-for/${itemId}`;
      else if (type === 'what_to_see') url = `/api/admin/locations/${locationId}/what-to-see/${itemId}`;
      await fetch(url, { method: 'DELETE' });
      await fetchDetails(locationId);
    } catch (e) { console.error(e); }
    finally { setDeleteConfirm(null); }
  };

  /* ─── Shared styles ─── */
  const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white';
  const labelCls = 'block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide';

  const SubInlineForm = ({ section, locationId }: { section: SubSection; locationId: number }) => {
    const isOpen = subForm?.section === section && subForm?.locationId === locationId;
    if (!isOpen) return null;
    return (
      <div className="mt-3 bg-primary/5 border border-primary/20 rounded-lg p-2 md:p-4">
        {section === 'highlight' && (
          <div>
            <label className={labelCls}>Highlight</label>
            <input className={inputCls} value={highlightInput}
              onChange={e => setHighlightInput(e.target.value)}
              placeholder="e.g. Stunning mountain views" autoFocus />
          </div>
        )}
        {section === 'best_for' && (
          <div>
            <label className={labelCls}>Best For</label>
            <input className={inputCls} value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="e.g. Honeymoon, Adventure, Nature" autoFocus />
          </div>
        )}
        {section === 'what_to_see' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={wtsForm.title}
                  onChange={e => setWtsForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Dal Lake" autoFocus />
              </div>
              <div>
                <label className={labelCls}>Image URL (optional)</label>
                <input className={inputCls} value={wtsForm.image}
                  onChange={e => setWtsForm(p => ({ ...p, image: e.target.value }))}
                  placeholder="https://…" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea rows={2} className={inputCls + ' resize-none'} value={wtsForm.description}
                onChange={e => setWtsForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Brief description of this attraction…" />
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <button onClick={handleSubSave} disabled={subSaving}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-sm px-4 py-1.5 rounded-lg transition disabled:opacity-50 font-medium">
            <FiCheck size={14} /> {subSaving ? 'Saving…' : (subForm?.editId ? 'Update' : 'Save')}
          </button>
          <button onClick={() => setSubForm(null)}
            className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            <FiX size={14} /> Cancel
          </button>
        </div>
      </div>
    );
  };

  /* ─── Render ─── */
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-dark">Locations</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage destinations, highlights, best-for tags & attractions</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyLoc); }}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg text-sm font-medium">
          <FiPlus size={16} /> Location
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading locations…</div>
      ) : locations.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-xl border border-gray-200 text-gray-500">
          No locations yet. Click "Add Location" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {locations.map(loc => {
            const isExpanded = expandedId === loc.id;
            const locDetails = details[loc.id];

            return (
              <div key={loc.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Row */}
                <div className="p-5 flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-dark text-lg">{loc.name}</h3>
                    {loc.subtitle && <p className="text-sm text-gray-500 mt-0.5">{loc.subtitle}</p>}
                    <div className="flex gap-4 mt-1 text-xs text-gray-400">
                      {loc.altitude && <span>⛰ {loc.altitude}</span>}
                      {loc.distance_from_srinagar && <span>🚗 {loc.distance_from_srinagar}</span>}
                      {loc.best_time && <span>📅 Best: {loc.best_time}</span>}
                    </div>
                    {loc.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{loc.description}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleExpand(loc.id)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1.5 rounded-lg hover:bg-primary/10 transition">
                      {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />} Details
                    </button>
                    <button onClick={() => handleEdit(loc)}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition">
                      <FiEdit2 size={16} />
                    </button>
                    {deleteConfirm?.type === 'location' && deleteConfirm.locationId === loc.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDeleteLocation(loc.id)} className="text-xs bg-red-600 text-white px-2 py-1 rounded font-medium hover:bg-red-700">Yes, delete</button>
                        <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-200 px-2 py-1 rounded font-medium hover:bg-gray-300">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm({ type: 'location', locationId: loc.id, itemId: loc.id })}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/80 p-5">
                    {detailsLoading && !locDetails ? (
                      <p className="text-sm text-gray-500 text-center py-4">Loading details…</p>
                    ) : (
                      <div className="space-y-6">

                        {/* Highlights */}
                        <section>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-dark flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs">🌟</span>
                              Highlights
                              <span className="text-xs text-gray-400 font-normal">({locDetails?.highlights.length ?? 0})</span>
                            </h4>
                            {!(subForm?.section === 'highlight' && subForm.locationId === loc.id) && (
                              <button onClick={() => openSubForm('highlight', loc.id)}
                                className="flex items-center gap-1 text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition font-medium">
                                <FiPlus size={12} /> Highlight
                              </button>
                            )}
                          </div>
                          <SubInlineForm section="highlight" locationId={loc.id} />
                          <div className="space-y-2 mt-2">
                            {(locDetails?.highlights ?? []).length === 0 && !(subForm?.section === 'highlight' && subForm.locationId === loc.id) && (
                              <p className="text-xs text-gray-400 italic">No highlights added yet.</p>
                            )}
                            {(locDetails?.highlights ?? []).map(h => (
                              <div key={h.id} className="flex justify-between items-center bg-white rounded-lg border border-gray-100 px-3 py-2 text-sm group">
                                <span className="text-gray-700">• {h.highlight}</span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                  <button onClick={() => openSubForm('highlight', loc.id, h.id)} className="p-1 text-gray-400 hover:text-primary rounded"><FiEdit2 size={13} /></button>
                                  {deleteConfirm?.type === 'highlight' && deleteConfirm.itemId === h.id ? (
                                    <div className="flex items-center gap-1">
                                      <button onClick={handleSubDelete} className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">Yes</button>
                                      <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-200 px-2 py-0.5 rounded">No</button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setDeleteConfirm({ type: 'highlight', locationId: loc.id, itemId: h.id })} className="p-1 text-gray-400 hover:text-red-600 rounded"><FiTrash2 size={13} /></button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* Best For */}
                        <section>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-dark flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">🎯</span>
                              Best For
                              <span className="text-xs text-gray-400 font-normal">({locDetails?.best_for.length ?? 0})</span>
                            </h4>
                            {!(subForm?.section === 'best_for' && subForm.locationId === loc.id) && (
                              <button onClick={() => openSubForm('best_for', loc.id)}
                                className="flex items-center gap-1 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition font-medium">
                                <FiPlus size={12} /> Tag
                              </button>
                            )}
                          </div>
                          <SubInlineForm section="best_for" locationId={loc.id} />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(locDetails?.best_for ?? []).length === 0 && !(subForm?.section === 'best_for' && subForm.locationId === loc.id) && (
                              <p className="text-xs text-gray-400 italic">No tags added yet.</p>
                            )}
                            {(locDetails?.best_for ?? []).map(b => (
                              <div key={b.id} className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-2.5 py-1 rounded-full group">
                                <span>{b.tag}</span>
                                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition">
                                  <button onClick={() => openSubForm('best_for', loc.id, b.id)} className="hover:text-primary"><FiEdit2 size={10} /></button>
                                  {deleteConfirm?.type === 'best_for' && deleteConfirm.itemId === b.id ? (
                                    <>
                                      <button onClick={handleSubDelete} className="text-red-600 font-bold">✓</button>
                                      <button onClick={() => setDeleteConfirm(null)}>✕</button>
                                    </>
                                  ) : (
                                    <button onClick={() => setDeleteConfirm({ type: 'best_for', locationId: loc.id, itemId: b.id })} className="hover:text-red-600"><FiTrash2 size={10} /></button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* What to See */}
                        <section>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-dark flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">👁</span>
                              What to See
                              <span className="text-xs text-gray-400 font-normal">({locDetails?.what_to_see.length ?? 0})</span>
                            </h4>
                            {!(subForm?.section === 'what_to_see' && subForm.locationId === loc.id) && (
                              <button onClick={() => openSubForm('what_to_see', loc.id)}
                                className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium">
                                <FiPlus size={12} /> Attraction
                              </button>
                            )}
                          </div>
                          <SubInlineForm section="what_to_see" locationId={loc.id} />
                          <div className="space-y-2 mt-2">
                            {(locDetails?.what_to_see ?? []).length === 0 && !(subForm?.section === 'what_to_see' && subForm.locationId === loc.id) && (
                              <p className="text-xs text-gray-400 italic">No attractions added yet.</p>
                            )}
                            {(locDetails?.what_to_see ?? []).map(w => (
                              <div key={w.id} className="bg-white rounded-lg border border-gray-100 px-3 py-2.5 group">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-dark text-sm">{w.title}</p>
                                    {w.description && <p className="text-xs text-gray-500 mt-0.5">{w.description}</p>}
                                  </div>
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition ml-2 shrink-0">
                                    <button onClick={() => openSubForm('what_to_see', loc.id, w.id)} className="p-1 text-gray-400 hover:text-primary rounded"><FiEdit2 size={13} /></button>
                                    {deleteConfirm?.type === 'what_to_see' && deleteConfirm.itemId === w.id ? (
                                      <div className="flex items-center gap-1">
                                        <button onClick={handleSubDelete} className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">Yes</button>
                                        <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-200 px-2 py-0.5 rounded">No</button>
                                      </div>
                                    ) : (
                                      <button onClick={() => setDeleteConfirm({ type: 'what_to_see', locationId: loc.id, itemId: w.id })} className="p-1 text-gray-400 hover:text-red-600 rounded"><FiTrash2 size={13} /></button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Location Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-xl">
              <div>
                <h2 className="text-xl font-bold text-dark">{editingId ? 'Edit Location' : 'Add New Location'}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the location details below</p>
              </div>
              <button onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyLoc); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Location Name *</label>
                  <input required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className={inputCls} placeholder="e.g. Gulmarg" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Subtitle</label>
                  <input value={formData.subtitle} onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))}
                    className={inputCls} placeholder="e.g. The Meadow of Flowers" />
                </div>
                <div>
                  <label className={labelCls}>Altitude</label>
                  <input value={formData.altitude} onChange={e => setFormData(p => ({ ...p, altitude: e.target.value }))}
                    className={inputCls} placeholder="e.g. 2,650 m" />
                </div>
                <div>
                  <label className={labelCls}>Distance from Srinagar</label>
                  <input value={formData.distance_from_srinagar} onChange={e => setFormData(p => ({ ...p, distance_from_srinagar: e.target.value }))}
                    className={inputCls} placeholder="e.g. 56 km" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Best Time to Visit</label>
                  <input value={formData.best_time} onChange={e => setFormData(p => ({ ...p, best_time: e.target.value }))}
                    className={inputCls} placeholder="e.g. March – November" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Short Description</label>
                  <textarea rows={2} value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    className={inputCls + ' resize-none'} placeholder="Brief summary shown on cards…" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Long Description</label>
                  <textarea rows={4} value={formData.long_description}
                    onChange={e => setFormData(p => ({ ...p, long_description: e.target.value }))}
                    className={inputCls + ' resize-none'} placeholder="Detailed description of the location…" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Image URL</label>
                  <input value={formData.image} onChange={e => setFormData(p => ({ ...p, image: e.target.value }))}
                    className={inputCls} placeholder="https://… or /images/…" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white py-2.5 rounded-lg font-semibold transition text-sm">
                  {saving ? 'Saving…' : (editingId ? 'Update Location' : 'Create Location')}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyLoc); }}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition text-sm">
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
