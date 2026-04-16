'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

interface Social { id: number; team_id: number; platform: string; url: string; }

const PLATFORMS = ['instagram', 'facebook', 'whatsapp', 'linkedin', 'youtube', 'twitter', 'tiktok'];

const emptyMember = { name: '', role: '', bio: '', photo: '' };

export default function TeamAdmin() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyMember);
  const [saving, setSaving] = useState(false);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [socials, setSocials] = useState<Record<number, Social[]>>({});
  const [socialsLoading, setSocialsLoading] = useState(false);

  // Inline social form
  const [socialForm, setSocialForm] = useState<{ memberId: number; editId: number | null } | null>(null);
  const [socialInput, setSocialInput] = useState({ platform: '', url: '' });
  const [socialSaving, setSocialSaving] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'member' | 'social'; memberId: number; itemId: number } | null>(null);

  /* ─── Fetch ─── */
  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/admin/team', { cache: 'no-store' });
      const result = await res.json();
      setTeam(result.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchSocials = async (memberId: number) => {
    setSocialsLoading(true);
    try {
      const res = await fetch(`/api/admin/team/${memberId}/socials`, { cache: 'no-store' });
      const result = await res.json();
      setSocials(prev => ({ ...prev, [memberId]: result.data || [] }));
    } catch (e) { console.error(e); }
    finally { setSocialsLoading(false); }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleExpand = async (memberId: number) => {
    if (expandedId === memberId) { setExpandedId(null); setSocialForm(null); return; }
    setExpandedId(memberId);
    setSocialForm(null);
    if (!socials[memberId]) await fetchSocials(memberId);
  };

  /* ─── Member CRUD ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/team/${editingId}` : '/api/admin/team';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (res.ok) { fetchTeam(); setFormData(emptyMember); setEditingId(null); setShowForm(false); }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({ name: member.name, role: member.role || '', bio: member.bio || '', photo: member.photo || '' });
    setEditingId(member.id); setShowForm(true);
  };

  const handleDeleteMember = async (id: number) => {
    try {
      await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      fetchTeam();
      if (expandedId === id) setExpandedId(null);
    } catch (e) { console.error(e); }
    finally { setDeleteConfirm(null); }
  };

  /* ─── Social CRUD ─── */
  const openSocialForm = (memberId: number, editId?: number) => {
    setSocialForm({ memberId, editId: editId ?? null });
    if (editId) {
      const s = (socials[memberId] ?? []).find(s => s.id === editId);
      setSocialInput({ platform: s?.platform ?? '', url: s?.url ?? '' });
    } else {
      setSocialInput({ platform: '', url: '' });
    }
  };

  const handleSocialSave = async () => {
    if (!socialForm) return; setSocialSaving(true);
    const { memberId, editId } = socialForm;
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/admin/team/${memberId}/socials/${editId}` : `/api/admin/team/${memberId}/socials`;
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(socialInput) });
      if (res.ok) { await fetchSocials(memberId); setSocialForm(null); }
    } catch (e) { console.error(e); }
    finally { setSocialSaving(false); }
  };

  const handleDeleteSocial = async () => {
    if (!deleteConfirm || deleteConfirm.type !== 'social') return;
    try {
      await fetch(`/api/admin/team/${deleteConfirm.memberId}/socials/${deleteConfirm.itemId}`, { method: 'DELETE' });
      await fetchSocials(deleteConfirm.memberId);
    } catch (e) { console.error(e); }
    finally { setDeleteConfirm(null); }
  };

  /* ─── Styles ─── */
  const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white';
  const labelCls = 'block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide';

  const platformIcons: Record<string, string> = {
    instagram: '📸', facebook: '📘', whatsapp: '💬', linkedin: '💼',
    youtube: '▶️', twitter: '🐦', tiktok: '🎵',
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-dark">Team Members</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your team and their social links</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyMember); }}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg text-sm font-medium">
          <FiPlus size={16} /> Member
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading team members…</div>
      ) : team.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-xl border border-gray-200 text-gray-500">
          No team members yet. Click "Add Member" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {team.map(member => {
            const isExpanded = expandedId === member.id;
            const memberSocials = socials[member.id] ?? [];

            return (
              <div key={member.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Member row */}
                <div className="p-5 flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-dark">{member.name}</h3>
                      {member.role && <p className="text-sm text-primary font-medium">{member.role}</p>}
                      {member.bio && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{member.bio}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleExpand(member.id)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1.5 rounded-lg hover:bg-primary/10 transition">
                      {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />} Socials
                    </button>
                    <button onClick={() => handleEdit(member)}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition">
                      <FiEdit2 size={16} />
                    </button>
                    {deleteConfirm?.type === 'member' && deleteConfirm.memberId === member.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDeleteMember(member.id)} className="text-xs bg-red-600 text-white px-2 py-1 rounded font-medium hover:bg-red-700">Yes, delete</button>
                        <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-200 px-2 py-1 rounded font-medium">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm({ type: 'member', memberId: member.id, itemId: member.id })}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Social Links Expanded */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/80 p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-dark flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs">🔗</span>
                        Social Links
                        <span className="text-xs text-gray-400 font-normal">({memberSocials.length})</span>
                      </h4>
                      {!(socialForm?.memberId === member.id) && (
                        <button onClick={() => openSocialForm(member.id)}
                          className="flex items-center gap-1 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition font-medium">
                          <FiPlus size={12} /> Social
                        </button>
                      )}
                    </div>

                    {/* Social Inline Form */}
                    {socialForm?.memberId === member.id && (
                      <div className="mb-4 bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Platform</label>
                            <select value={socialInput.platform}
                              onChange={e => setSocialInput(p => ({ ...p, platform: e.target.value }))}
                              className={inputCls} autoFocus>
                              <option value="">— Select platform —</option>
                              {PLATFORMS.map(p => (
                                <option key={p} value={p}>
                                  {platformIcons[p]} {p.charAt(0).toUpperCase() + p.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelCls}>Profile URL</label>
                            <input type="url" className={inputCls} value={socialInput.url}
                              onChange={e => setSocialInput(p => ({ ...p, url: e.target.value }))}
                              placeholder="https://…" />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button onClick={handleSocialSave} disabled={socialSaving}
                            className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-sm px-4 py-1.5 rounded-lg transition disabled:opacity-50 font-medium">
                            <FiCheck size={14} /> {socialSaving ? 'Saving…' : (socialForm.editId ? 'Update' : 'Save')}
                          </button>
                          <button onClick={() => setSocialForm(null)}
                            className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                            <FiX size={14} /> Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {socialsLoading && !socials[member.id] ? (
                      <p className="text-xs text-gray-400 italic">Loading…</p>
                    ) : memberSocials.length === 0 && !socialForm ? (
                      <p className="text-xs text-gray-400 italic">No social links added yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {memberSocials.map(s => (
                          <div key={s.id} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm group">
                            <span>{platformIcons[s.platform] ?? '🔗'}</span>
                            <span className="font-medium text-gray-700 capitalize">{s.platform}</span>
                            <a href={s.url} target="_blank" rel="noreferrer"
                              className="text-xs text-primary hover:underline max-w-[120px] truncate">{s.url}</a>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                              <button onClick={() => openSocialForm(member.id, s.id)} className="text-gray-400 hover:text-primary"><FiEdit2 size={12} /></button>
                              {deleteConfirm?.type === 'social' && deleteConfirm.itemId === s.id ? (
                                <>
                                  <button onClick={handleDeleteSocial} className="text-xs text-red-600 font-bold px-1">Yes</button>
                                  <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-500 px-1">No</button>
                                </>
                              ) : (
                                <button onClick={() => setDeleteConfirm({ type: 'social', memberId: member.id, itemId: s.id })}
                                  className="text-gray-400 hover:text-red-600"><FiTrash2 size={12} /></button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Team Member Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-xl">
              <div>
                <h2 className="text-xl font-bold text-dark">{editingId ? 'Edit Member' : 'Add New Member'}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the team member details below</p>
              </div>
              <button onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyMember); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className={inputCls} placeholder="e.g. Syed Ali Shah" />
              </div>
              <div>
                <label className={labelCls}>Role / Designation</label>
                <input value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                  className={inputCls} placeholder="e.g. Tour Guide" />
              </div>
              <div>
                <label className={labelCls}>Bio</label>
                <textarea rows={3} value={formData.bio} onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))}
                  className={inputCls + ' resize-none'} placeholder="Brief background about the team member…" />
              </div>
              <div>
                <label className={labelCls}>Photo URL</label>
                <input value={formData.photo} onChange={e => setFormData(p => ({ ...p, photo: e.target.value }))}
                  className={inputCls} placeholder="https://… or /images/…" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white py-2.5 rounded-lg font-semibold transition text-sm">
                  {saving ? 'Saving…' : (editingId ? 'Update Member' : 'Create Member')}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyMember); }}
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
