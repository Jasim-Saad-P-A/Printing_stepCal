import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const EditConstraintModal = ({ isOpen, onClose, title, value, unit = 'mm', onSave, min = 0, max = 50 }) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value, isOpen]);

  const handleSave = () => {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= min && num <= max) {
      onSave(num);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Constraint Value ({unit})
          </label>
          <div className="flex items-center bg-[#0D1525] border border-slate-700 rounded-lg px-3 py-2">
            <input
              type="number"
              step="0.5"
              min={min}
              max={max}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
              autoFocus
            />
            <span className="text-xs text-slate-400 font-medium ml-2">{unit}</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Recommended range: {min}mm to {max}mm
          </span>
        </div>

        <div className="flex items-center justify-end gap-2.5 mt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Apply Constraint
          </Button>
        </div>
      </div>
    </Modal>
  );
};
