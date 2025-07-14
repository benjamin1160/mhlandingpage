// src/components/ContactFormModal.tsx
"use client";

import type { FC } from "react";

interface Props {
  data: { name: string; email: string; phone: string };
  onChange: (field: keyof Props["data"], value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const ContactFormModal: FC<Props> = ({ data, onChange, onSubmit, onClose }) => (
  <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div className="w-11/12 max-w-md rounded-lg bg-white p-6 text-slate-900">
      <h2 className="mb-4 text-xl font-bold">Shoot us your info</h2>
      <label className="mb-2 block">
        <span>Name</span>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="mt-1 w-full rounded border p-2"
        />
      </label>
      <label className="mb-2 block">
        <span>Email</span>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="mt-1 w-full rounded border p-2"
        />
      </label>
      <label className="mb-4 block">
        <span>Phone</span>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="mt-1 w-full rounded border p-2"
        />
      </label>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="rounded border px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          View My Home
        </button>
      </div>
    </div>
  </div>
);

export default ContactFormModal;
