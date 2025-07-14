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
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  const onRowsChange = async (newRows: Home[]) => {
    setRows(newRows);
    // Send updates for any edited row
    for (const row of newRows) {
      await fetch(`/api/homes/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
    }
  };

  if (loading) return <p>Loading spreadsheet…</p>;

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      onRowsChange={onRowsChange}
      className="h-[600px]"
    />
  );
}
