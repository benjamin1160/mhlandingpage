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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
      <h2 className="text-xl font-bold mb-4">Shoot us your info</h2>
      <label className="block mb-2">
        <span>Name</span>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        <span>Email</span>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>
      <label className="block mb-4">
        <span>Phone</span>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          View My Home
        </button>
      </div>
    </div>
  </div>
);

export default ContactFormModal;
