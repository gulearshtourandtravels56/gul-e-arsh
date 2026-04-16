'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

interface Package {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  price_value: number;
  description: string;
  short_description: string;
  image: string;
  category: string;
}

interface Highlight { id: number; highlight: string; }
interface Inclusion { id: number; inclusion: string; }
interface ItineraryItem { id: number; day: number; title: string; details: string; }

interface PackageDetails {
  highlights: Highlight[];
  inclusions: Inclusion[];
  itinerary: ItineraryItem[];
}

type SubSection = 'highlight' | 'inclusion' | 'itinerary';

interface SubFormState {
  section: SubSection;
  packageId: number;
  editId: number | null;
}

const emptyPkg = {
  title: '', location: '', duration: '', price: '',
  price_value: 0, description: '', short_description: '', image: '', category: '',
};

export default function PackagesAdmin() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyPkg);
  const [saving, setSaving] = useState(false);

  // Expand state
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, PackageDetails>>({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Sub-item inline form
  const [subForm, setSubForm] = useState<SubFormState | null>(null);
  const [highlightInput, setHighlightInput] = useState('');
  const [inclusionInput, setInclusionInput] = useState('');
  const [itineraryForm, setItineraryForm] = useState({ day: '', title: '', details: '' });
  const [subSaving, setSubSaving] = useState(false);

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: SubSection | 'package'; packageId: number; itemId: number } | null>(null);

  /* ─── Fetch ─── */
  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/admin/packages', { cache: 'no-store' });
      const result = await res.json();
      setPackages(result.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchDetails = async (pkgId: number) => {
    setDetailsLoading(true);
    try {
      const [h, i, it] = await Promise.all([
        fetch(`/api/admin/packages/${pkgId}/highlights`).then(r => r.json()),
        fetch(`/api/admin/packages/${pkgId}/inclusions`).then(r => r.json()),
        fetch(`/api/admin/packages/${pkgId}/itinerary`).then(r => r.json()),
      ]);
      setDetails(prev => ({
        ...prev,
        [pkgId]: {
          highlights: h.data || [],
          inclusions: i.data || [],
          itinerary: (it.data || []).sort((a: ItineraryItem, b: ItineraryItem) => a.day - b.day),
        },
      }));
    } catch (e) { console.error(e); }
    finally { setDetailsLoading(false); }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleExpand = async (pkgId: number) => {
    if (expandedId === pkgId) { setExpandedId(null); setSubForm(null); return; }
    setExpandedId(pkgId);
    setSubForm(null);
    if (!details[pkgId]) await fetchDetails(pkgId);
  };

  /* ─── Main Package CRUD ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/packages/${editingId}` : '/api/admin/packages';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price_value: Number(formData.price_value) }),
      });
      if (res.ok) { fetchPackages(); setFormData(emptyPkg); setEditingId(null); setShowForm(false); }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleEdit = (pkg: Package) => {
    setFormData({ title: pkg.title, location: pkg.location || '', duration: pkg.duration || '',
      price: pkg.price || '', price_value: pkg.price_value || 0, description: pkg.description || '',
      short_description: pkg.short_description || '', image: pkg.image || '', category: pkg.category || '' });
    setEditingId(pkg.id); setShowForm(true);
  };

  const handleDeletePackage = async (id: number) => {
    try {
      await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      await fetchPackages();
      if (expandedId === id) setExpandedId(null);
    } catch (e) { console.error(e); }
    finally { setDeleteConfirm(null); }
  };

  /* ─── Sub-Item Forms ─── */
  const openSubForm = (section: SubSection, packageId: number, editId?: number) => {
    setSubForm({ section, packageId, editId: editId ?? null });
    const pkg = details[packageId];
    if (editId && pkg) {
      if (section === 'highlight') {
        const item = pkg.highlights.find(h => h.id === editId);
        setHighlightInput(item?.highlight ?? '');
      } else if (section === 'inclusion') {
        const item = pkg.inclusions.find(i => i.id === editId);
        setInclusionInput(item?.inclusion ?? '');
      } else if (section === 'itinerary') {
        const item = pkg.itinerary.find(i => i.id === editId);
        setItineraryForm({ day: String(item?.day ?? ''), title: item?.title ?? '', details: item?.details ?? '' });
      }
    } else {
      setHighlightInput(''); setInclusionInput('');
      setItineraryForm({ day: '', title: '', details: '' });
    }
  };

  const handleSubSave = async () => {
    if (!subForm) return; setSubSaving(true);
    const { section, packageId, editId } = subForm;
    try {
      let url = '', body: object = {}, method = editId ? 'PUT' : 'POST';
      if (section === 'highlight') {
        url = editId ? `/api/admin/packages/${packageId}/highlights/${editId}` : `/api/admin/packages/${packageId}/highlights`;
        body = { highlight: highlightInput };
      } else if (section === 'inclusion') {
        url = editId ? `/api/admin/packages/${packageId}/inclusions/${editId}` : `/api/admin/packages/${packageId}/inclusions`;
        body = { inclusion: inclusionInput };
      } else if (section === 'itinerary') {
        url = editId ? `/api/admin/packages/${packageId}/itinerary/${editId}` : `/api/admin/packages/${packageId}/itinerary`;
        body = { day: Number(itineraryForm.day), title: itineraryForm.title, details: itineraryForm.details };
      }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { await fetchDetails(packageId); setSubForm(null); }
    } catch (e) { console.error(e); }
    finally { setSubSaving(false); }
  };

  const handleSubDelete = async () => {
    if (!deleteConfirm || deleteConfirm.type === 'package') return;
    const { type, packageId, itemId } = deleteConfirm;
    try {
      let url = '';
      if (type === 'highlight') url = `/api/admin/packages/${packageId}/highlights/${itemId}`;
      else if (type === 'inclusion') url = `/api/admin/packages/${packageId}/inclusions/${itemId}`;
      else if (type === 'itinerary') url = `/api/admin/packages/${packageId}/itinerary/${itemId}`;
      await fetch(url, { method: 'DELETE' });
      await fetchDetails(packageId);
    } catch (e) { console.error(e); }
    finally { setDeleteConfirm(null); }
  };

  /* ─── UI Helpers ─── */
  const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white';
  const labelCls = 'block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide';

  const SubInlineForm = ({ section, packageId }: { section: SubSection; packageId: number }) => {
    const isOpen = subForm?.section === section && subForm?.packageId === packageId;
    if (!isOpen) return null;
    return (
      <div className="mt-3 bg-primary/5 border border-primary/20 rounded-lg p-4">
        {section === 'highlight' && (
          <div>
            <label className={labelCls}>Highlight text</label>
            <input className={inputCls} value={highlightInput}
              onChange={e => setHighlightInput(e.target.value)}
              placeholder="e.g. Houseboat stay on Dal Lake" autoFocus />
          </div>
        )}
        {section === 'inclusion' && (
          <div>
            <label className={labelCls}>Inclusion</label>
            <input className={inputCls} value={inclusionInput}
              onChange={e => setInclusionInput(e.target.value)}
              placeholder="e.g. All meals included" autoFocus />
          </div>
        )}
        {section === 'itinerary' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Day</label>
                <input type="number" min={1} className={inputCls} value={itineraryForm.day}
                  onChange={e => setItineraryForm(p => ({ ...p, day: e.target.value }))}
                  placeholder="1" autoFocus />
              </div>
              <div>
                <label className={labelCls}>Title</label>
                <input className={inputCls} value={itineraryForm.title}
                  onChange={e => setItineraryForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Arrival & Houseboat" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Details</label>
              <textarea rows={2} className={inputCls + ' resize-none'} value={itineraryForm.details}
                onChange={e => setItineraryForm(p => ({ ...p, details: e.target.value }))}
                placeholder="Describe the day's activities..." />
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
          <h1 className="text-3xl font-bold text-dark">Packages</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage tour packages, highlights, inclusions & itinerary</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyPkg); }}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg text-sm font-medium">
          <FiPlus size={16} /> Package
        </button>
      </div>

      {/* Package List */}
      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading packages…</div>
      ) : packages.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-xl border border-gray-200 text-gray-500">
          No packages yet. Click "Add Package" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map(pkg => {
            const isExpanded = expandedId === pkg.id;
            const pkgDetails = details[pkg.id];

            return (
              <div key={pkg.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-90 md:w-full">
                {/* Package Header Row */}
                <div className="p-5 flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-dark text-lg">{pkg.title}</h3>
                      {pkg.category && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{pkg.category}</span>
                      )}
                    </div>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500 w-80">
                      {pkg.location && <span>📍 {pkg.location}</span>}
                      {pkg.duration && <span>⏱ {pkg.duration}</span>}
                      {pkg.price && <span className="font-semibold text-primary">{pkg.price}</span>}
                    </div>
                    {pkg.short_description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{pkg.short_description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleExpand(pkg.id)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1.5 rounded-lg hover:bg-primary/10 transition">
                      {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                      Details
                    </button>
                    <button onClick={() => handleEdit(pkg)}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition">
                      <FiEdit2 size={16} />
                    </button>
                    {deleteConfirm?.type === 'package' && deleteConfirm.packageId === pkg.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDeletePackage(pkg.id)}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded font-medium hover:bg-red-700">Yes, delete</button>
                        <button onClick={() => setDeleteConfirm(null)}
                          className="text-xs bg-gray-200 px-2 py-1 rounded font-medium hover:bg-gray-300">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm({ type: 'package', packageId: pkg.id, itemId: pkg.id })}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/80 p-5">
                    {detailsLoading && !pkgDetails ? (
                      <p className="text-sm text-gray-500 text-center py-4">Loading details…</p>
                    ) : (
                      <div className="space-y-6">

                        {/* ── Highlights ── */}
                        <section>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-dark flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs">✨</span>
                              Highlights
                              <span className="text-xs text-gray-400 font-normal">({pkgDetails?.highlights.length ?? 0})</span>
                            </h4>
                            {subForm?.section !== 'highlight' || subForm.packageId !== pkg.id ? (
                              <button onClick={() => openSubForm('highlight', pkg.id)}
                                className="flex items-center gap-1 text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition font-medium">
                                <FiPlus size={12} /> Highlight
                              </button>
                            ) : null}
                          </div>
                          <SubInlineForm section="highlight" packageId={pkg.id} />
                          <div className="space-y-2 mt-2">
                            {(pkgDetails?.highlights ?? []).length === 0 && !(subForm?.section === 'highlight' && subForm.packageId === pkg.id) && (
                              <p className="text-xs text-gray-400 italic">No highlights added yet.</p>
                            )}
                            {(pkgDetails?.highlights ?? []).map(h => (
                              <div key={h.id} className="flex justify-between items-center bg-white rounded-lg border border-gray-100 px-3 py-2 text-sm group">
                                <span className="text-gray-700">• {h.highlight}</span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                  <button onClick={() => openSubForm('highlight', pkg.id, h.id)}
                                    className="p-1 text-gray-400 hover:text-primary rounded transition"><FiEdit2 size={13} /></button>
                                  {deleteConfirm?.type === 'highlight' && deleteConfirm.itemId === h.id ? (
                                    <div className="flex items-center gap-1">
                                      <button onClick={handleSubDelete} className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">Yes</button>
                                      <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-200 px-2 py-0.5 rounded">No</button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setDeleteConfirm({ type: 'highlight', packageId: pkg.id, itemId: h.id })}
                                      className="p-1 text-gray-400 hover:text-red-600 rounded transition"><FiTrash2 size={13} /></button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* ── Inclusions ── */}
                        <section>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-dark flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">✅</span>
                              Inclusions
                              <span className="text-xs text-gray-400 font-normal">({pkgDetails?.inclusions.length ?? 0})</span>
                            </h4>
                            {subForm?.section !== 'inclusion' || subForm.packageId !== pkg.id ? (
                              <button onClick={() => openSubForm('inclusion', pkg.id)}
                                className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition font-medium">
                                <FiPlus size={12} /> Inclusion
                              </button>
                            ) : null}
                          </div>
                          <SubInlineForm section="inclusion" packageId={pkg.id} />
                          <div className="space-y-2 mt-2">
                            {(pkgDetails?.inclusions ?? []).length === 0 && !(subForm?.section === 'inclusion' && subForm.packageId === pkg.id) && (
                              <p className="text-xs text-gray-400 italic">No inclusions added yet.</p>
                            )}
                            {(pkgDetails?.inclusions ?? []).map(inc => (
                              <div key={inc.id} className="flex justify-between items-center bg-white rounded-lg border border-gray-100 px-3 py-2 text-sm group">
                                <span className="text-gray-700">• {inc.inclusion}</span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                  <button onClick={() => openSubForm('inclusion', pkg.id, inc.id)}
                                    className="p-1 text-gray-400 hover:text-primary rounded"><FiEdit2 size={13} /></button>
                                  {deleteConfirm?.type === 'inclusion' && deleteConfirm.itemId === inc.id ? (
                                    <div className="flex items-center gap-1">
                                      <button onClick={handleSubDelete} className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">Yes</button>
                                      <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-200 px-2 py-0.5 rounded">No</button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setDeleteConfirm({ type: 'inclusion', packageId: pkg.id, itemId: inc.id })}
                                      className="p-1 text-gray-400 hover:text-red-600 rounded"><FiTrash2 size={13} /></button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* ── Itinerary ── */}
                        <section>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-dark flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">🗺</span>
                              Itinerary
                              <span className="text-xs text-gray-400 font-normal">({pkgDetails?.itinerary.length ?? 0} days)</span>
                            </h4>
                            {subForm?.section !== 'itinerary' || subForm.packageId !== pkg.id ? (
                              <button onClick={() => openSubForm('itinerary', pkg.id)}
                                className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium">
                                <FiPlus size={12} /> Day
                              </button>
                            ) : null}
                          </div>
                          <SubInlineForm section="itinerary" packageId={pkg.id} />
                          <div className="space-y-2 mt-2">
                            {(pkgDetails?.itinerary ?? []).length === 0 && !(subForm?.section === 'itinerary' && subForm.packageId === pkg.id) && (
                              <p className="text-xs text-gray-400 italic">No itinerary added yet.</p>
                            )}
                            {(pkgDetails?.itinerary ?? []).map(it => (
                              <div key={it.id} className="bg-white rounded-lg border border-gray-100 px-3 py-2.5 group">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="text-xs font-bold text-blue-600 mr-2">Day {it.day}</span>
                                    <span className="font-medium text-dark text-sm">{it.title}</span>
                                    {it.details && <p className="text-xs text-gray-500 mt-1">{it.details}</p>}
                                  </div>
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition ml-2 shrink-0">
                                    <button onClick={() => openSubForm('itinerary', pkg.id, it.id)}
                                      className="p-1 text-gray-400 hover:text-primary rounded"><FiEdit2 size={13} /></button>
                                    {deleteConfirm?.type === 'itinerary' && deleteConfirm.itemId === it.id ? (
                                      <div className="flex items-center gap-1">
                                        <button onClick={handleSubDelete} className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">Yes</button>
                                        <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-200 px-2 py-0.5 rounded">No</button>
                                      </div>
                                    ) : (
                                      <button onClick={() => setDeleteConfirm({ type: 'itinerary', packageId: pkg.id, itemId: it.id })}
                                        className="p-1 text-gray-400 hover:text-red-600 rounded"><FiTrash2 size={13} /></button>
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

      {/* ── Main Package Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-xl">
              <div>
                <h2 className="text-xl font-bold text-dark">{editingId ? 'Edit Package' : 'Add New Package'}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the package details below</p>
              </div>
              <button onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyPkg); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Package Title *</label>
                  <input required value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                    className={inputCls} placeholder="e.g. Kashmir Premium Honeymoon" />
                </div>
                <div>
                  <label className={labelCls}>Location</label>
                  <input value={formData.location} onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                    className={inputCls} placeholder="e.g. Srinagar, Gulmarg" />
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <input value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                    className={inputCls} placeholder="e.g. Honeymoon, Adventure" />
                </div>
                <div>
                  <label className={labelCls}>Duration</label>
                  <input value={formData.duration} onChange={e => setFormData(p => ({ ...p, duration: e.target.value }))}
                    className={inputCls} placeholder="e.g. 5 Days / 4 Nights" />
                </div>
                <div>
                  <label className={labelCls}>Price (Display)</label>
                  <input value={formData.price} onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                    className={inputCls} placeholder="e.g. ₹24,999/person" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Price (Numeric — for sorting)</label>
                  <input type="number" value={formData.price_value}
                    onChange={e => setFormData(p => ({ ...p, price_value: Number(e.target.value) }))}
                    className={inputCls} placeholder="24999" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Short Description</label>
                  <textarea rows={2} value={formData.short_description}
                    onChange={e => setFormData(p => ({ ...p, short_description: e.target.value }))}
                    className={inputCls + ' resize-none'} placeholder="Brief summary shown on cards…" />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Full Description</label>
                  <textarea rows={4} value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    className={inputCls + ' resize-none'} placeholder="Detailed description of the package…" />
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
                  {saving ? 'Saving…' : (editingId ? 'Update Package' : 'Create Package')}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyPkg); }}
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
