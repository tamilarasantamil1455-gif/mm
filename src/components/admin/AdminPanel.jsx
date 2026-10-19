import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, LogOut, Plus, Trash2, Edit3, Save, X,
  Image as ImageIcon, Video as VideoIcon, Globe, FileImage, ChevronDown,
  RotateCcw, Eye, EyeOff, Check, AlertTriangle,
  Layers, UploadCloud, Link2, ExternalLink, Play, Copy, ArrowLeft
} from 'lucide-react';
import { useProjects } from '../../context/ProjectsContext';
import { resetProjects, loadProjects, nextId } from '../../data/projectsData';
import { uploadFile, formatBytes } from '../../utils/fileUpload';

const ADMIN_PASSWORD = 'nextify@admin';

// ─── Shared UI Styles ────────────────────────────────────────────────────────
const inp = 'w-full bg-[#121215] border border-[#2a2a30] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#FF7700] focus:ring-1 focus:ring-[#FF7700]/50 transition-all';
const lbl = 'text-xs font-mono font-medium text-white/60 mb-1.5 block uppercase tracking-wider';
const btn = 'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

// ─── Toast Notification ───────────────────────────────────────────────────────
function Toast({ msg, type = 'success' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-[9999] px-5 py-3.5 rounded-2xl text-sm font-semibold shadow-2xl flex items-center gap-3 border backdrop-blur-xl ${
        type === 'success'
          ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
          : 'bg-red-950/90 border-red-500/40 text-red-200'
      }`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
        type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
      }`}>
        {type === 'success' ? <Check size={14} /> : <AlertTriangle size={14} />}
      </div>
      <span>{msg}</span>
    </motion.div>
  );
}

// ─── Universal File Upload & Preview Component ──────────────────────────────
function FileUploadField({ label, value, onChange, folder, type = 'image', helperText }) {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileMeta, setFileMeta] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const res = await uploadFile(file, folder);
      onChange(res.url);
      setFileMeta({ name: res.name, size: res.size });
    } catch (err) {
      console.error(err);
      setError('Upload failed. You can paste a direct URL instead.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const clearFile = () => {
    onChange('');
    setFileMeta(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const accept = type === 'video' ? 'video/mp4,video/mov,video/webm,video/quicktime,video/*' : 'image/*';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className={lbl}>{label}</label>
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/8 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'upload' ? 'bg-[#FF7700] text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <UploadCloud size={11} /> Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'url' ? 'bg-[#FF7700] text-white font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <Link2 size={11} /> Paste Link
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-2">
          {/* File Dropzone */}
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {!value ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? 'border-[#FF7700] bg-[#FF7700]/10 scale-[1.01]'
                  : 'border-white/15 hover:border-[#FF7700]/50 hover:bg-white/[0.02] bg-[#101014]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#FF7700]/10 border border-[#FF7700]/30 flex items-center justify-center text-[#FF7700]">
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-[#FF7700] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UploadCloud size={18} />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-white/90">
                  {uploading ? 'Uploading to server...' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-[10px] text-white/40 font-mono mt-0.5">
                  {type === 'video' ? 'MP4, MOV, WEBM (up to 100MB)' : 'JPG, PNG, WEBP, GIF (up to 25MB)'}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-[#101014] p-3 flex flex-col sm:flex-row items-center gap-3">
              {/* Media Preview */}
              <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center flex-shrink-0 w-24 h-20">
                {type === 'video' ? (
                  <video src={value} className="w-full h-full object-cover" muted preload="metadata" />
                ) : (
                  <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                )}
                {type === 'video' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                    <Play size={14} className="text-white fill-white" />
                  </div>
                )}
              </div>

              {/* Info & Replace/Delete Buttons */}
              <div className="flex-1 min-w-0 text-left w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <Check size={10} /> Ready
                  </span>
                  {fileMeta?.size && (
                    <span className="text-[10px] font-mono text-white/40">
                      {formatBytes(fileMeta.size)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/80 font-mono truncate mt-1" title={value}>
                  {fileMeta?.name || value}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={clearFile}
                  className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Manual URL mode */
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={type === 'video' ? '/projects/video/sample.mp4 or https://...' : '/projects/... or https://images.unsplash.com/...'}
              className={`${inp} pr-9 font-mono text-xs`}
            />
            {value && (
              <button
                type="button"
                onClick={clearFile}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {value && (
            <div className="rounded-lg border border-white/8 bg-black/30 p-2 flex items-center gap-3">
              <div className="w-12 h-10 rounded overflow-hidden bg-black flex-shrink-0 border border-white/10 flex items-center justify-center">
                {type === 'video' ? (
                  <video src={value} className="w-full h-full object-cover" muted preload="metadata" />
                ) : (
                  <img src={value} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                )}
              </div>
              <p className="text-[11px] font-mono text-white/50 truncate flex-1">{value}</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
      {helperText && <p className="text-[10px] text-white/40 font-mono">{helperText}</p>}
    </div>
  );
}

// ─── Delete Confirmation Button ──────────────────────────────────────────────
function DeleteBtn({ onConfirm }) {
  const [confirm, setConfirm] = useState(false);
  if (confirm) {
    return (
      <div className="flex items-center gap-1 bg-red-950/80 p-1 rounded-lg border border-red-500/40">
        <span className="text-[10px] font-mono text-red-200 px-1">Delete?</span>
        <button
          type="button"
          onClick={onConfirm}
          className="px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold hover:bg-red-500 cursor-pointer"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setConfirm(false)}
          className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[11px] hover:bg-white/20 cursor-pointer"
        >
          No
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setConfirm(true)}
      className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
      title="Delete item"
    >
      <Trash2 size={15} />
    </button>
  );
}

// ─── Section Card Wrapper ───────────────────────────────────────────────────
function SectionCard({ icon: Icon, title, count, color, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0c0c0f] overflow-hidden shadow-xl transition-all">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-6 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}40` }}
          >
            <Icon size={16} style={{ color }} />
          </span>
          <div className="text-left">
            <h2 className="text-sm font-bold text-white tracking-wide">{title}</h2>
            <p className="text-[11px] text-white/40 font-mono">{count} items total</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ChevronDown
            size={16}
            className={`text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      {open && <div className="p-6">{children}</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. COLOUR GRADING SECTION
// ══════════════════════════════════════════════════════════════════════════════
function ColourGradingSection({ items, onChange }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', before: '', after: '' });
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState({ title: '', before: '', after: '' });

  const startEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, before: item.before, after: item.after });
    setAdding(false);
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = (id) => {
    if (!form.title || !form.before || !form.after) return;
    onChange(items.map((x) => (x.id === id ? { ...x, ...form } : x)));
    setEditId(null);
  };

  const del = (id) => onChange(items.filter((x) => x.id !== id));

  const duplicate = (item) => {
    const newItem = {
      ...item,
      id: nextId(items),
      title: `${item.title} (Copy)`,
    };
    onChange([...items, newItem]);
  };

  const addItem = () => {
    if (!newForm.title || !newForm.before || !newForm.after) return;
    onChange([...items, { id: nextId(items), ...newForm }]);
    setNewForm({ title: '', before: '', after: '' });
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border transition-all ${
              editId === item.id
                ? 'border-[#FF7700] bg-[#FF7700]/5 p-4'
                : 'border-white/8 bg-[#121215] p-4 hover:border-white/15'
            }`}
          >
            {editId === item.id ? (
              /* Inline Edit Form */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF7700] uppercase tracking-wider">
                    Editing Item #{item.id}
                  </span>
                  <button type="button" onClick={cancelEdit} className="text-white/40 hover:text-white cursor-pointer">
                    <X size={14} />
                  </button>
                </div>

                <div>
                  <label className={lbl}>Title / Subject</label>
                  <input
                    className={inp}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Paddy Field Sunset"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FileUploadField
                    label="Before Image (Original)"
                    value={form.before}
                    onChange={(url) => setForm({ ...form, before: url })}
                    folder="colour-grading"
                    type="image"
                  />
                  <FileUploadField
                    label="After Image (Graded)"
                    value={form.after}
                    onChange={(url) => setForm({ ...form, after: url })}
                    folder="colour-grading"
                    type="image"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button type="button" onClick={cancelEdit} className={`${btn} bg-white/8 text-white/70 hover:bg-white/15`}>
                    <X size={13} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit(item.id)}
                    disabled={!form.title || !form.before || !form.after}
                    className={`${btn} bg-[#FF7700] text-white hover:bg-[#FF5500]`}
                  >
                    <Save size={13} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* Card Preview View */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => duplicate(item)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Duplicate"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <DeleteBtn onConfirm={() => del(item.id)} />
                  </div>
                </div>

                {/* Side-by-side Before/After Thumbnails */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">Before</span>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/40 border border-white/8">
                      <img src={item.before} alt="Before" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">After (Graded)</span>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/40 border border-emerald-500/20">
                      <img src={item.after} alt="After" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Item */}
      {adding ? (
        <div className="rounded-2xl border-2 border-[#FF7700]/50 bg-[#FF7700]/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#FF7700] uppercase tracking-wider flex items-center gap-2">
              <Plus size={14} /> Add New Colour Grading Photo Pair
            </span>
            <button type="button" onClick={() => setAdding(false)} className="text-white/40 hover:text-white cursor-pointer">
              <X size={15} />
            </button>
          </div>

          <div>
            <label className={lbl}>Title / Photo Name</label>
            <input
              className={inp}
              value={newForm.title}
              onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
              placeholder="e.g. Sunset Over Hills"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileUploadField
              label="Before Photo (Original)"
              value={newForm.before}
              onChange={(url) => setNewForm({ ...newForm, before: url })}
              folder="colour-grading"
              type="image"
            />
            <FileUploadField
              label="After Photo (Graded Style)"
              value={newForm.after}
              onChange={(url) => setNewForm({ ...newForm, after: url })}
              folder="colour-grading"
              type="image"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button type="button" onClick={() => setAdding(false)} className={`${btn} bg-white/8 text-white/60 hover:bg-white/15`}>
              <X size={13} /> Cancel
            </button>
            <button
              type="button"
              onClick={addItem}
              disabled={!newForm.title || !newForm.before || !newForm.after}
              className={`${btn} bg-[#FF7700] text-white hover:bg-[#FF5500]`}
            >
              <Plus size={14} /> Add to Colour Grading
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => { setAdding(true); setEditId(null); }}
          className={`${btn} border-2 border-dashed border-white/15 text-white/60 hover:text-white hover:border-[#FF7700]/60 hover:bg-[#FF7700]/5 w-full justify-center py-3.5`}
        >
          <Plus size={15} /> Add Colour Grading Photo
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. VIDEO GALLERY SECTION
// ══════════════════════════════════════════════════════════════════════════════
function VideoSection({ items, onChange }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', url: '', tag: '' });
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState({ title: '', url: '', tag: '' });

  const tagPresets = ['Reel Edit', 'Visual Showcase', 'Commercial', 'Cinematic', 'Motion Graphics', 'New Edit'];

  const startEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, url: item.url, tag: item.tag || '' });
    setAdding(false);
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = (id) => {
    if (!form.title || !form.url) return;
    onChange(items.map((x) => (x.id === id ? { ...x, ...form } : x)));
    setEditId(null);
  };

  const del = (id) => onChange(items.filter((x) => x.id !== id));

  const addItem = () => {
    if (!newForm.title || !newForm.url) return;
    onChange([...items, { id: nextId(items), ...newForm }]);
    setNewForm({ title: '', url: '', tag: '' });
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border transition-all ${
              editId === item.id
                ? 'border-[#FF0033] bg-[#FF0033]/5 p-4 md:col-span-2'
                : 'border-white/8 bg-[#121215] p-4 hover:border-white/15'
            }`}
          >
            {editId === item.id ? (
              /* Inline Edit */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF0033] uppercase tracking-wider">
                    Editing Video #{item.id}
                  </span>
                  <button type="button" onClick={cancelEdit} className="text-white/40 hover:text-white cursor-pointer">
                    <X size={14} />
                  </button>
                </div>

                <div>
                  <label className={lbl}>Video Title</label>
                  <input
                    className={inp}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Creative Reel 01"
                  />
                </div>

                <FileUploadField
                  label="Video File or Link"
                  value={form.url}
                  onChange={(url) => setForm({ ...form, url })}
                  folder="video"
                  type="video"
                />

                <div>
                  <label className={lbl}>Tag / Category</label>
                  <input
                    className={inp}
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    placeholder="e.g. Reel Edit"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tagPresets.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, tag: t })}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          form.tag === t
                            ? 'bg-[#FF0033] text-white font-bold'
                            : 'bg-white/8 text-white/50 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button type="button" onClick={cancelEdit} className={`${btn} bg-white/8 text-white/70 hover:bg-white/15`}>
                    <X size={13} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit(item.id)}
                    disabled={!form.title || !form.url}
                    className={`${btn} bg-[#FF0033] text-white hover:bg-[#cc0028]`}
                  >
                    <Save size={13} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* Card View */
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video border border-white/8 group">
                  <video
                    src={item.url}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                  {item.tag && (
                    <span className="absolute top-2 left-2 text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/80 text-[#FF0033] border border-[#FF0033]/40 pointer-events-none">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                    <p className="text-[11px] font-mono text-white/40 truncate">{item.url}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <DeleteBtn onConfirm={() => del(item.id)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Video */}
      {adding ? (
        <div className="rounded-2xl border-2 border-[#FF0033]/50 bg-[#FF0033]/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#FF0033] uppercase tracking-wider flex items-center gap-2">
              <Plus size={14} /> Add New Video
            </span>
            <button type="button" onClick={() => setAdding(false)} className="text-white/40 hover:text-white cursor-pointer">
              <X size={15} />
            </button>
          </div>

          <div>
            <label className={lbl}>Video Title</label>
            <input
              className={inp}
              value={newForm.title}
              onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
              placeholder="e.g. Cinematic Reel 04"
            />
          </div>

          <FileUploadField
            label="Upload Video File or Paste Video Link"
            value={newForm.url}
            onChange={(url) => setNewForm({ ...newForm, url })}
            folder="video"
            type="video"
          />

          <div>
            <label className={lbl}>Tag / Category</label>
            <input
              className={inp}
              value={newForm.tag}
              onChange={(e) => setNewForm({ ...newForm, tag: e.target.value })}
              placeholder="e.g. Reel Edit"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tagPresets.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewForm({ ...newForm, tag: t })}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    newForm.tag === t
                      ? 'bg-[#FF0033] text-white font-bold'
                      : 'bg-white/8 text-white/50 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button type="button" onClick={() => setAdding(false)} className={`${btn} bg-white/8 text-white/60 hover:bg-white/15`}>
              <X size={13} /> Cancel
            </button>
            <button
              type="button"
              onClick={addItem}
              disabled={!newForm.title || !newForm.url}
              className={`${btn} bg-[#FF0033] text-white hover:bg-[#cc0028]`}
            >
              <Plus size={14} /> Add Video
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => { setAdding(true); setEditId(null); }}
          className={`${btn} border-2 border-dashed border-white/15 text-white/60 hover:text-white hover:border-[#FF0033]/60 hover:bg-[#FF0033]/5 w-full justify-center py-3.5`}
        >
          <Plus size={15} /> Add Video Project
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. WEBSITES SECTION
// ══════════════════════════════════════════════════════════════════════════════
function WebsitesSection({ items, onChange }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', tech: '', demo: '', image: '', color: '#FF8C00'
  });
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState({
    title: '', description: '', tech: '', demo: '', image: '', color: '#FF8C00'
  });

  const colorPresets = ['#FF8C00', '#FF0033', '#FF5500', '#00D2FF', '#9D00FF', '#10B981', '#F59E0B'];
  const techPresets = ['React.js', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'GSAP', 'TypeScript', 'Node.js', 'UI/UX'];

  const toItem = (f) => ({
    ...f,
    tech: typeof f.tech === 'string'
      ? f.tech.split(',').map((t) => t.trim()).filter(Boolean)
      : f.tech,
  });

  const toForm = (item) => ({
    ...item,
    tech: Array.isArray(item.tech) ? item.tech.join(', ') : item.tech,
  });

  const startEdit = (item) => {
    setEditId(item.id);
    setForm(toForm(item));
    setAdding(false);
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = (id) => {
    if (!form.title || !form.demo) return;
    onChange(items.map((x) => (x.id === id ? { ...x, ...toItem(form) } : x)));
    setEditId(null);
  };

  const del = (id) => onChange(items.filter((x) => x.id !== id));

  const addItem = () => {
    if (!newForm.title || !newForm.demo) return;
    onChange([...items, { id: nextId(items), ...toItem(newForm) }]);
    setNewForm({ title: '', description: '', tech: '', demo: '', image: '', color: '#FF8C00' });
    setAdding(false);
  };

  const WebsiteForm = ({ f, setF }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className={lbl}>Project Title</label>
          <input
            className={inp}
            value={f.title}
            onChange={(e) => setF({ ...f, title: e.target.value })}
            placeholder="e.g. NovaCore Solutions"
          />
        </div>
        <div>
          <label className={lbl}>Accent Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={f.color}
              onChange={(e) => setF({ ...f, color: e.target.value })}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border border-white/20 p-1"
            />
            <input
              className={`${inp} flex-1 font-mono text-xs`}
              value={f.color}
              onChange={(e) => setF({ ...f, color: e.target.value })}
            />
          </div>
          <div className="flex gap-1.5 mt-2">
            {colorPresets.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setF({ ...f, color: c })}
                className="w-5 h-5 rounded-md cursor-pointer border border-white/20 transition-transform hover:scale-110"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className={lbl}>Description</label>
        <textarea
          className={`${inp} resize-none`}
          rows={2}
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          placeholder="Brief description of the website and user experience..."
        />
      </div>

      <FileUploadField
        label="Mockup / Screenshot Photo"
        value={f.image}
        onChange={(url) => setF({ ...f, image: url })}
        folder="websites"
        type="image"
      />

      <div>
        <label className={lbl}>Live Demo URL</label>
        <div className="relative">
          <input
            className={`${inp} pr-9 font-mono text-xs`}
            value={f.demo}
            onChange={(e) => setF({ ...f, demo: e.target.value })}
            placeholder="https://example.netlify.app/"
          />
          {f.demo && (
            <a
              href={f.demo}
              target="_blank"
              rel="noreferrer"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              title="Test link"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div>
        <label className={lbl}>Tech Stack (Comma-separated)</label>
        <input
          className={inp}
          value={f.tech}
          onChange={(e) => setF({ ...f, tech: e.target.value })}
          placeholder="React.js, Tailwind CSS, Framer Motion"
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {techPresets.map((techName) => {
            const currentList = typeof f.tech === 'string'
              ? f.tech.split(',').map((x) => x.trim()).filter(Boolean)
              : [];
            const hasTech = currentList.includes(techName);
            return (
              <button
                key={techName}
                type="button"
                onClick={() => {
                  if (hasTech) {
                    setF({ ...f, tech: currentList.filter((x) => x !== techName).join(', ') });
                  } else {
                    setF({ ...f, tech: [...currentList, techName].join(', ') });
                  }
                }}
                className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  hasTech
                    ? 'bg-[#FF8800] text-white font-bold'
                    : 'bg-white/8 text-white/50 hover:text-white'
                }`}
              >
                {hasTech ? `✓ ${techName}` : `+ ${techName}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border transition-all ${
              editId === item.id
                ? 'border-[#FF8800] bg-[#FF8800]/5 p-4 md:col-span-2'
                : 'border-white/8 bg-[#121215] p-4 hover:border-white/15'
            }`}
          >
            {editId === item.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF8800] uppercase tracking-wider">
                    Editing Website #{item.id}
                  </span>
                  <button type="button" onClick={cancelEdit} className="text-white/40 hover:text-white cursor-pointer">
                    <X size={14} />
                  </button>
                </div>

                <WebsiteForm f={form} setF={setForm} />

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button type="button" onClick={cancelEdit} className={`${btn} bg-white/8 text-white/70 hover:bg-white/15`}>
                    <X size={13} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit(item.id)}
                    disabled={!form.title || !form.demo}
                    className={`${btn} bg-[#FF8800] text-white hover:bg-[#e07000]`}
                  >
                    <Save size={13} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video border border-white/8">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs">
                      No Preview Image
                    </div>
                  )}
                  <span
                    className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full border border-white/40 shadow-md"
                    style={{ background: item.color || '#FF8C00' }}
                  />
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                    <p className="text-xs text-white/50 line-clamp-2 mt-0.5">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(item.tech || []).map((t) => (
                        <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <DeleteBtn onConfirm={() => del(item.id)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Website */}
      {adding ? (
        <div className="rounded-2xl border-2 border-[#FF8800]/50 bg-[#FF8800]/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#FF8800] uppercase tracking-wider flex items-center gap-2">
              <Plus size={14} /> Add New Website Project
            </span>
            <button type="button" onClick={() => setAdding(false)} className="text-white/40 hover:text-white cursor-pointer">
              <X size={15} />
            </button>
          </div>

          <WebsiteForm f={newForm} setF={setNewForm} />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button type="button" onClick={() => setAdding(false)} className={`${btn} bg-white/8 text-white/60 hover:bg-white/15`}>
              <X size={13} /> Cancel
            </button>
            <button
              type="button"
              onClick={addItem}
              disabled={!newForm.title || !newForm.demo}
              className={`${btn} bg-[#FF8800] text-white hover:bg-[#e07000]`}
            >
              <Plus size={14} /> Add Website
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => { setAdding(true); setEditId(null); }}
          className={`${btn} border-2 border-dashed border-white/15 text-white/60 hover:text-white hover:border-[#FF8800]/60 hover:bg-[#FF8800]/5 w-full justify-center py-3.5`}
        >
          <Plus size={15} /> Add Website Project
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. POSTERS SECTION
// ══════════════════════════════════════════════════════════════════════════════
function PostersSection({ items, onChange }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', url: '' });
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState({ title: '', url: '' });

  const startEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, url: item.url });
    setAdding(false);
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = (id) => {
    if (!form.title || !form.url) return;
    onChange(items.map((x) => (x.id === id ? { ...x, ...form } : x)));
    setEditId(null);
  };

  const del = (id) => onChange(items.filter((x) => x.id !== id));

  const addItem = () => {
    if (!newForm.title || !newForm.url) return;
    onChange([...items, { id: nextId(items), ...newForm }]);
    setNewForm({ title: '', url: '' });
    setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border transition-all ${
              editId === item.id
                ? 'border-[#E6002A] bg-[#E6002A]/5 p-4 col-span-2'
                : 'border-white/8 bg-[#121215] p-3 hover:border-white/15'
            }`}
          >
            {editId === item.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#E6002A] uppercase tracking-wider">
                    Editing Poster #{item.id}
                  </span>
                  <button type="button" onClick={cancelEdit} className="text-white/40 hover:text-white cursor-pointer">
                    <X size={14} />
                  </button>
                </div>

                <div>
                  <label className={lbl}>Poster Title</label>
                  <input
                    className={inp}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Brand Poster 01"
                  />
                </div>

                <FileUploadField
                  label="Upload Poster Image"
                  value={form.url}
                  onChange={(url) => setForm({ ...form, url })}
                  folder="poster"
                  type="image"
                />

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button type="button" onClick={cancelEdit} className={`${btn} bg-white/8 text-white/70 hover:bg-white/15`}>
                    <X size={13} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit(item.id)}
                    disabled={!form.title || !form.url}
                    className={`${btn} bg-[#E6002A] text-white hover:bg-[#b50022]`}
                  >
                    <Save size={13} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black/40 border border-white/8">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="flex items-center justify-between gap-1 pt-1">
                  <h3 className="text-xs font-semibold text-white truncate flex-1">{item.title}</h3>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <DeleteBtn onConfirm={() => del(item.id)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Poster */}
      {adding ? (
        <div className="rounded-2xl border-2 border-[#E6002A]/50 bg-[#E6002A]/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#E6002A] uppercase tracking-wider flex items-center gap-2">
              <Plus size={14} /> Add New Graphic Poster
            </span>
            <button type="button" onClick={() => setAdding(false)} className="text-white/40 hover:text-white cursor-pointer">
              <X size={15} />
            </button>
          </div>

          <div>
            <label className={lbl}>Poster Title</label>
            <input
              className={inp}
              value={newForm.title}
              onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
              placeholder="e.g. Modern Graphic Poster 04"
            />
          </div>

          <FileUploadField
            label="Upload Poster Image"
            value={newForm.url}
            onChange={(url) => setNewForm({ ...newForm, url })}
            folder="poster"
            type="image"
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button type="button" onClick={() => setAdding(false)} className={`${btn} bg-white/8 text-white/60 hover:bg-white/15`}>
              <X size={13} /> Cancel
            </button>
            <button
              type="button"
              onClick={addItem}
              disabled={!newForm.title || !newForm.url}
              className={`${btn} bg-[#E6002A] text-white hover:bg-[#b50022]`}
            >
              <Plus size={14} /> Add Poster
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => { setAdding(true); setEditId(null); }}
          className={`${btn} border-2 border-dashed border-white/15 text-white/60 hover:text-white hover:border-[#E6002A]/60 hover:bg-[#E6002A]/5 w-full justify-center py-3.5`}
        >
          <Plus size={15} /> Add Poster Design
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function LoginScreen({ onLogin, onBack }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setErr('Incorrect password. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center p-6 text-white relative">
      <button
        type="button"
        onClick={onBack}
        className="absolute top-6 left-6 text-xs font-mono text-white/50 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors cursor-pointer"
      >
        <ArrowLeft size={13} /> Back to Website
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0e0e12] p-8 shadow-2xl relative"
      >
        <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-[#FF7700]/20 to-[#FF0033]/20 border border-[#FF7700]/40 text-[#FF7700]">
          <Lock size={22} />
        </div>

        <h1 className="text-xl font-bold text-center text-white mb-1">Nextify Admin</h1>
        <p className="text-xs text-white/40 text-center mb-6 font-mono">
          Enter password to manage projects & uploads
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setErr(''); }}
                placeholder="Admin password"
                autoFocus
                className={`${inp} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {err && <p className="text-red-400 text-xs mt-1.5 font-mono">{err}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-lg active:scale-98"
            style={{
              background: 'linear-gradient(135deg, #FF7700, #FF0033)',
              boxShadow: '0 0 25px rgba(255,119,0,0.3)',
            }}
          >
            Unlock Admin Panel
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN PANEL
// ══════════════════════════════════════════════════════════════════════════════
export default function AdminPanel({ onClose }) {
  const { data, update } = useProjects();
  const [loggedIn, setLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleReset = () => {
    if (!window.confirm('Reset all project data to defaults? This will erase custom uploads from local storage.')) return;
    resetProjects();
    update(loadProjects());
    showToast('All projects reset to defaults');
  };

  const updateSection = (key) => (val) => {
    const next = { ...data, [key]: val };
    update(next);
    showToast('Saved changes successfully!');
  };

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} onBack={onClose} />;
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#07070a]/95 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: '#FF770020', border: '1px solid #FF770040' }}
            >
              <Layers size={16} className="text-[#FF7700]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-wide">Nextify Admin Panel</h1>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Live Sync
                </span>
              </div>
              <p className="text-[10px] text-white/40 font-mono">
                Manage Photos, Videos, Websites, and Posters
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`${btn} bg-gradient-to-r from-[#FF7700] to-[#FF0033] text-white shadow-lg hover:brightness-110`}
            >
              <ArrowLeft size={13} /> View Website
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={`${btn} border border-white/10 text-white/60 hover:text-white hover:border-white/30`}
              title="Reset all sections to defaults"
            >
              <RotateCcw size={13} /> Reset Defaults
            </button>
            <button
              type="button"
              onClick={() => setLoggedIn(false)}
              className={`${btn} border border-white/10 text-white/40 hover:text-red-400`}
              title="Logout"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Upload Guide Banner */}
        <div className="rounded-2xl border border-[#FF7700]/25 bg-gradient-to-r from-[#FF7700]/10 via-[#FF0033]/5 to-transparent p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF7700]/15 border border-[#FF7700]/30 flex items-center justify-center flex-shrink-0 text-[#FF7700]">
            <UploadCloud size={20} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#FF7700] uppercase tracking-wider">
              Direct File Upload Enabled
            </h2>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              You can now directly <strong>drag & drop or choose files from your computer</strong> for any section (photos, videos, websites, posters). Files are uploaded to your project's <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">public/projects/</code> folder and update the live website immediately!
            </p>
          </div>
        </div>

        {/* 1. Colour Grading */}
        <SectionCard
          icon={ImageIcon}
          title="Colour Grading"
          count={data.colorGrading?.length || 0}
          color="#FF6B00"
        >
          <ColourGradingSection
            items={data.colorGrading || []}
            onChange={updateSection('colorGrading')}
          />
        </SectionCard>

        {/* 2. Video Gallery */}
        <SectionCard
          icon={VideoIcon}
          title="Video Gallery"
          count={data.videos?.length || 0}
          color="#FF0033"
        >
          <VideoSection
            items={data.videos || []}
            onChange={updateSection('videos')}
          />
        </SectionCard>

        {/* 3. Websites */}
        <SectionCard
          icon={Globe}
          title="Websites & Web Apps"
          count={data.websites?.length || 0}
          color="#FF8800"
        >
          <WebsitesSection
            items={data.websites || []}
            onChange={updateSection('websites')}
          />
        </SectionCard>

        {/* 4. Posters */}
        <SectionCard
          icon={FileImage}
          title="Graphic Posters"
          count={data.posters?.length || 0}
          color="#E6002A"
        >
          <PostersSection
            items={data.posters || []}
            onChange={updateSection('posters')}
          />
        </SectionCard>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}
