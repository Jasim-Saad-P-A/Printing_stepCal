import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { Toggle } from '../common/Toggle';
import { EditConstraintModal } from './EditConstraintModal';

export const ConstraintsPanel = () => {
  const { currentJob, updateConstraints } = useJobs();
  const { grainAlignment = true, edgeMargin = 5, gutterSpace = 2 } = currentJob.constraints || {};

  const [editingModal, setEditingModal] = useState(null); // 'margin' | 'gutter' | null

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
        CONSTRAINTS & MARGINS
      </label>

      <div className="flex flex-col gap-2">
        {/* Material Grain Alignment Toggle matching reference */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1525] border border-slate-700/80">
          <span className="text-xs font-semibold text-slate-200">
            Material Grain Alignment
          </span>
          <Toggle
            checked={grainAlignment}
            onChange={(val) => updateConstraints({ grainAlignment: val })}
          />
        </div>

        {/* Edge Margin Row with Edit Link */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1525] border border-slate-700/80">
          <span className="text-xs font-medium text-slate-300">
            Edge Margin ({edgeMargin}mm)
          </span>
          <button
            type="button"
            onClick={() => setEditingModal('margin')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Part Gutter Space Row with Edit Link */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1525] border border-slate-700/80">
          <span className="text-xs font-medium text-slate-300">
            Part Gutter Space ({gutterSpace}mm)
          </span>
          <button
            type="button"
            onClick={() => setEditingModal('gutter')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Margin Modal */}
      <EditConstraintModal
        isOpen={editingModal === 'margin'}
        onClose={() => setEditingModal(null)}
        title="Edit Edge Margin"
        value={edgeMargin}
        unit="mm"
        min={0}
        max={30}
        onSave={(val) => updateConstraints({ edgeMargin: val })}
      />

      {/* Edit Gutter Modal */}
      <EditConstraintModal
        isOpen={editingModal === 'gutter'}
        onClose={() => setEditingModal(null)}
        title="Edit Part Gutter Space"
        value={gutterSpace}
        unit="mm"
        min={0}
        max={20}
        onSave={(val) => updateConstraints({ gutterSpace: val })}
      />
    </div>
  );
};
