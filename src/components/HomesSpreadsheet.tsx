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
    { key: "name", name: "Name", editable: true, width: 160 },
    { key: "bedrooms", name: "Bedrooms", editable: true },
    { key: "bathrooms", name: "Bathrooms", editable: true },
    { key: "style", name: "Style", editable: true },
    { key: "budget", name: "Price", editable: true },
    { key: "image", name: "Image URL", editable: true, width: 200 },
    {
      key: "listings",
      name: "Listings (JSON)",
      editable: true,
      renderCell: ({ row }: { row: Home }) => JSON.stringify(row.listings),
      renderEditCell: ({
        row,
        onRowChange,
      }: {
        row: Home;
        onRowChange: (row: Home) => void;
      }) => (
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

  const onSave = async () => {
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
        className="h-[600px]"
      />
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
