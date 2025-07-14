"use client";

import { useEffect, useState } from "react";
import { DataGrid, type Column } from "react-data-grid";
import "react-data-grid/lib/styles.css";

interface Listing {
  title: string;
  price: string;
}
interface Home {
  id: number;
  name: string;
  bedrooms: number;
  bathrooms: number;
  style: string;
  budget: string;
  image: string;
  listings: Listing[];
}

export default function HomesSpreadsheet() {
  const [rows, setRows] = useState<Home[]>([]);
  const [originalRows, setOriginalRows] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Define columns for your grid
  const columns: Column<Home>[] = [
    { key: "id", name: "ID", width: 60 },
    {
      key: "name",
      name: "Name",
      width: 160,
      editable: true,
      renderEditCell: ({ row, onRowChange }) => (
        <input
          className="h-full w-full p-1"
          value={row.name}
          onChange={(e) => onRowChange({ ...row, name: e.target.value })}
        />
      ),
    },
    {
      key: "bedrooms",
      name: "Bedrooms",
      editable: true,
      renderEditCell: ({ row, onRowChange }) => (
        <input
          type="number"
          className="h-full w-full p-1"
          value={row.bedrooms}
          onChange={(e) =>
            onRowChange({ ...row, bedrooms: Number(e.target.value) })
          }
        />
      ),
    },
    {
      key: "bathrooms",
      name: "Bathrooms",
      editable: true,
      renderEditCell: ({ row, onRowChange }) => (
        <input
          type="number"
          className="h-full w-full p-1"
          value={row.bathrooms}
          onChange={(e) =>
            onRowChange({ ...row, bathrooms: Number(e.target.value) })
          }
        />
      ),
    },
    {
      key: "style",
      name: "Style",
      editable: true,
      renderEditCell: ({ row, onRowChange }) => (
        <input
          className="h-full w-full p-1"
          value={row.style}
          onChange={(e) => onRowChange({ ...row, style: e.target.value })}
        />
      ),
    },
    {
      key: "budget",
      name: "Price",
      editable: true,
      renderEditCell: ({ row, onRowChange }) => (
        <input
          className="h-full w-full p-1"
          value={row.budget}
          onChange={(e) => onRowChange({ ...row, budget: e.target.value })}
        />
      ),
    },
    {
      key: "image",
      name: "Image URL",
      width: 200,
      editable: true,
      renderEditCell: ({ row, onRowChange }) => (
        <input
          className="h-full w-full p-1"
          value={row.image}
          onChange={(e) => onRowChange({ ...row, image: e.target.value })}
        />
      ),
    },
    {
      key: "listings",
      name: "Listings (JSON)",
      editable: true,
      renderCell: ({ row }: { row: Home }) => JSON.stringify(row.listings),
      renderEditCell: ({ row, onRowChange }) => (
        <textarea
          rows={2}
          value={JSON.stringify(row.listings)}
          onChange={(e) => {
            try {
              const v = JSON.parse(e.target.value) as Listing[];
              onRowChange({ ...row, listings: v });
            } catch {
              // ignore parse errors
            }
          }}
          className="h-full w-full font-mono text-sm"
        />
      ),
    },
    {
      key: "delete",
      name: "",
      width: 80,
      renderCell: ({ row }) => (
        <button className="text-red-600" onClick={() => handleDelete(row.id)}>
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => {
    void fetch("/api/homes?perPage=200")
      .then((r) => r.json() as Promise<Home[]>)
      .then((data) => {
        setRows(data);
        setOriginalRows(data);
        setLoading(false);
      });
  }, []);

  const onRowsChange = (newRows: Home[]) => {
    setRows(newRows);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/homes/${id}`, { method: "DELETE" });
    setRows((r) => r.filter((h) => h.id !== id));
    setOriginalRows((r) => r.filter((h) => h.id !== id));
  };

  const addHomeRow = async () => {
    const res = await fetch("/api/homes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        bedrooms: 0,
        bathrooms: 0,
        style: "",
        budget: "",
        image: "",
        listings: [],
      }),
    });
    const newHome = (await res.json()) as Home;
    setRows((r) => [...r, newHome]);
    setOriginalRows((r) => [...r, newHome]);
  };

  const onSave = async () => {
    // blur the active element so react-data-grid commits any edits
    if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }

    setSaving(true);
    const updates: Promise<unknown>[] = [];
    for (const row of rows) {
      const orig = originalRows.find((r) => r.id === row.id);
      if (orig && JSON.stringify(orig) !== JSON.stringify(row)) {
        updates.push(
          fetch(`/api/homes/${row.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(row),
          }),
        );
      }
    }
    await Promise.all(updates);
    setOriginalRows(rows);
    setSaving(false);
  };

  if (loading) return <p>Loading spreadsheet…</p>;

  return (
    <div className="space-y-4">
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={onRowsChange}
        rowKeyGetter={(row) => row.id}
        className="h-[600px]"
      />
      <div className="flex gap-4">
        <button
          onClick={addHomeRow}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Home
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
