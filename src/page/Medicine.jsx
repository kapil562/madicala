import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import {
  Plus,
  Search,
  AlertTriangle,
  Package,
  X,
  Save,
  Edit3,
  Trash2,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import "./Medicine.css";

/** ---- Demo Seed Data (you can replace with API) ---- */
const SEED_MEDICINES = [
  {
    id: "m1",
    name: "Doxycycline 100mg",
    category: "Antibiotic",
    batch: "DX-2025A",
    expiry: "2026-02-28",
    price: 18.5,
    stock: 9,
    reorderLevel: 12,
  },
  {
    id: "m2",
    name: "Cetirizine 10mg",
    category: "Antihistamine",
    batch: "CT-0825",
    expiry: "2025-12-31",
    price: 2.0,
    stock: 52,
    reorderLevel: 15,
  },
  {
    id: "m3",
    name: "Isotretinoin 20mg",
    category: "Dermatology",
    batch: "ISO-20-25",
    expiry: "2027-04-15",
    price: 35.0,
    stock: 4,
    reorderLevel: 10,
  },
  {
    id: "m4",
    name: "Minoxidil 5% (60ml)",
    category: "Dermatology",
    batch: "MNX-5-24",
    expiry: "2026-10-10",
    price: 320.0,
    stock: 0,
    reorderLevel: 6,
  },
  {
    id: "m5",
    name: "Azithromycin 500mg",
    category: "Antibiotic",
    batch: "AZI-500-24",
    expiry: "2026-01-01",
    price: 25.0,
    stock: 14,
    reorderLevel: 20,
  },
];

const formatINR = (n) =>
  Number(n || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

const emptyForm = {
  id: "",
  name: "",
  category: "",
  batch: "",
  expiry: "",
  price: "",
  stock: "",
  reorderLevel: "",
};

export default function Medicine() {
  const navigate = useNavigate();

  // ------- State
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("medicines");
    return saved ? JSON.parse(saved) : SEED_MEDICINES;
  });
  const [query, setQuery] = useState("");
  const [lowFirst, setLowFirst] = useState(true);
  const [threshold, setThreshold] = useState(10); // for quick filter chip (optional)
  const [showOnlyLow, setShowOnlyLow] = useState(false);

  // Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(items));
  }, [items]);

  // ------- Derived
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter((it) => {
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q) ||
        it.batch.toLowerCase().includes(q)
      );
    });

    if (showOnlyLow) {
      list = list.filter((it) => Number(it.stock) <= Number(it.reorderLevel || threshold));
    }

    // Sort by stock ascending, but ensure low/out-of-stock bubble to top when lowFirst enabled
    if (lowFirst) {
      list = [...list].sort((a, b) => {
        const aLow = Number(a.stock) <= Number(a.reorderLevel || threshold);
        const bLow = Number(b.stock) <= Number(b.reorderLevel || threshold);
        if (aLow && !bLow) return -1;
        if (!aLow && bLow) return 1;
        // then asc by stock
        return Number(a.stock) - Number(b.stock);
      });
    }

    return list;
  }, [items, query, lowFirst, showOnlyLow, threshold]);

  const lowCount = useMemo(
    () => items.filter((it) => Number(it.stock) <= Number(it.reorderLevel || threshold)).length,
    [items, threshold]
  );

  // ------- Helpers
  const stockStatus = (it) => {
    const s = Number(it.stock);
    const r = Number(it.reorderLevel || threshold);
    if (s <= 0) return "out";
    if (s <= r) return "low";
    return "ok";
  };

  const openAddModal = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (row) => {
    setIsEdit(true);
    setForm({
      id: row.id,
      name: row.name,
      category: row.category,
      batch: row.batch,
      expiry: row.expiry,
      price: row.price,
      stock: row.stock,
      reorderLevel: row.reorderLevel,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(emptyForm);
  };

  const handleFormChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const onSaveForm = () => {
    // basic validations
    if (!form.name?.trim()) return alert("Please enter medicine name");
    if (!form.price || Number(form.price) < 0) return alert("Enter valid price");
    if (form.stock === "" || Number(form.stock) < 0) return alert("Enter valid stock");
    const payload = {
      ...form,
      id: isEdit ? form.id : `m${Date.now()}`,
      price: Number(form.price),
      stock: Number(form.stock),
      reorderLevel: form.reorderLevel === "" ? 0 : Number(form.reorderLevel),
    };

    if (isEdit) {
      setItems((prev) => prev.map((x) => (x.id === payload.id ? payload : x)));
    } else {
      setItems((prev) => [payload, ...prev]);
    }
    closeModal();
  };

  const onDelete = (id) => {
    if (confirm("Delete this medicine?")) {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }
  };

  return (
    <div className="medicine-page">
      <Header />

      {/* Topbar */}
      <div className="med-topbar">
        <div className="med-title">
          <Package className="med-title-icon" size={20} />
          <h1>Medicine Inventory</h1>
        </div>

        <div className="med-actions">
          <div className="med-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search medicines, category, batch…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button className="btn sort-btn" onClick={() => setLowFirst((v) => !v)}>
            <ArrowUpDown size={16} />
            {lowFirst ? "Low stock first" : "Default sort"}
          </button>

          <button className="btn add-btn" onClick={openAddModal}>
            <Plus size={16} />
            Add Medicine
          </button>
        </div>
      </div>

      {/* Info Row */}
      <div className="med-info-row">
        <div className="chip stat">
          <span className="label">Total</span>
          <strong>{items.length}</strong>
        </div>

        <div className="chip stat warn" title="Stock ≤ reorder level">
          <AlertTriangle size={14} />
          <span className="label">Low/Out</span>
          <strong>{lowCount}</strong>
        </div>

        <div className="chip filter">
          <Filter size={14} />
          <label className="mini">Show only low</label>
          <input
            className="toggle"
            type="checkbox"
            checked={showOnlyLow}
            onChange={(e) => setShowOnlyLow(e.target.checked)}
          />
        </div>

        <div className="chip filter">
          <span className="mini">Default re-order ≤</span>
          <input
            className="mini-input"
            type="number"
            min={0}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value || 0))}
          />
        </div>
      </div>

      {/* Table */}
      <div className="med-table-wrap">
        <table className="med-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>Category</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Re-order</th>
              <th>Status</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="empty">
                  No medicines found.
                </td>
              </tr>
            )}
            {filtered.map((it, idx) => {
              const st = stockStatus(it);
              return (
                <tr key={it.id} className={`row anim-in status-${st}`}>
                  <td>{idx + 1}</td>
                  <td className="name-cell">
                    <div className="name">{it.name}</div>
                    <div className="sub">ID: {it.id}</div>
                  </td>
                  <td>{it.category || "—"}</td>
                  <td>{it.batch || "—"}</td>
                  <td className="nowrap">{it.expiry || "—"}</td>
                  <td className="nowrap">{formatINR(it.price)}</td>
                  <td className="stock">{it.stock}</td>
                  <td>{it.reorderLevel ?? 0}</td>
                  <td>
                    <span className={`badge ${st}`}>
                      {st === "out" ? "Out of stock" : st === "low" ? "Low" : "OK"}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="icon-btn" title="Edit" onClick={() => openEditModal(it)}>
                      <Edit3 size={16} />
                    </button>
                    <button className="icon-btn danger" title="Delete" onClick={() => onDelete(it.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="med-modal-backdrop" onClick={closeModal}>
          <div className="med-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{isEdit ? "Edit Medicine" : "Add Medicine"}</h3>
              <button className="icon-btn" onClick={closeModal} title="Close">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="grid">
                <div className="field">
                  <label>Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="e.g., Doxycycline 100mg"
                  />
                </div>
                <div className="field">
                  <label>Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    placeholder="e.g., Antibiotic"
                  />
                </div>
                <div className="field">
                  <label>Batch</label>
                  <input
                    type="text"
                    value={form.batch}
                    onChange={(e) => handleFormChange("batch", e.target.value)}
                    placeholder="e.g., DX-2025A"
                  />
                </div>
                <div className="field">
                  <label>Expiry</label>
                  <input
                    type="date"
                    value={form.expiry}
                    onChange={(e) => handleFormChange("expiry", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="field">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => handleFormChange("stock", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="field">
                  <label>Re-order Level</label>
                  <input
                    type="number"
                    value={form.reorderLevel}
                    onChange={(e) => handleFormChange("reorderLevel", e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>
                <X size={16} /> Cancel
              </button>
              <button className="btn primary" onClick={onSaveForm}>
                <Save size={16} /> {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
