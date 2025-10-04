// src/components/DualSelect.tsx
import React, { useState } from "react";

interface DualSelectProps<T, U> {
  leftItems: T[];
  rightItems: U[];
  leftLabelKey: keyof T;
  leftValueKey: keyof T;
  rightLabelKey: keyof U;
  rightValueKey: keyof U;
  leftTitle?: string;
  rightTitle?: string;
  onAssign: (leftId: string, rightId: string) => void;
  buttonLabel?: string;
}

function DualSelect<T, U>({
  leftItems,
  rightItems,
  leftLabelKey,
  leftValueKey,
  rightLabelKey,
  rightValueKey,
  leftTitle = "Izquierda",
  rightTitle = "Derecha",
  onAssign,
  buttonLabel = "Asignar",
}: DualSelectProps<T, U>) {
  const [selectedLeft, setSelectedLeft] = useState<string>("");
  const [selectedRight, setSelectedRight] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedLeft || !selectedRight) {
      alert("Debes seleccionar ambos elementos");
      return;
    }
    onAssign(selectedLeft, selectedRight);
    setSelectedLeft("");
    setSelectedRight("");
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-md w-full max-w-md">
      <div className="mb-4">
        <label className="block mb-1 font-medium">{leftTitle}</label>
        <select
          className="w-full border rounded-md p-2"
          value={selectedLeft}
          onChange={(e) => setSelectedLeft(e.target.value)}
        >
          <option value="">Seleccione</option>
          {leftItems.map((item) => (
            <option key={String(item[leftValueKey])} value={String(item[leftValueKey])}>
  {String(item[leftLabelKey])}
</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">{rightTitle}</label>
        <select
          className="w-full border rounded-md p-2"
          value={selectedRight}
          onChange={(e) => setSelectedRight(e.target.value)}
        >
          <option value="">Seleccione</option>
          {rightItems.map((item) => (
            <option key={String(item[rightValueKey])} value={String(item[rightValueKey])}>
  {String(item[rightLabelKey])}
</option>

          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default DualSelect;
