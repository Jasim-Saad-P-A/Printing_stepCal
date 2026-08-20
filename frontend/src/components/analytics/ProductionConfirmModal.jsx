import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { CheckCircle2, Factory, ArrowRight } from 'lucide-react';

export const ProductionConfirmModal = ({ isOpen, onClose, onConfirm, job, isSubmitting }) => {
  if (!job) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Job to Production"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
          <Factory className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            Confirming will finalize nesting paths, lock part placements, and dispatch the CNC cutting program directly to the shop floor queue.
          </p>
        </div>

        {/* Job Summary Review Card */}
        <div className="p-4 rounded-xl bg-[#0D1525] border border-slate-700/80 space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Job Batch:</span>
            <span className="font-bold text-white text-sm">{job.name || 'Production Batch 01'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Sheet Dimensions:</span>
            <span className="font-mono text-slate-200">{job.sheet?.width || 1200} × {job.sheet?.height || 800} mm</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Total Parts Fitted:</span>
            <span className="font-semibold text-white">{job.analytics?.totalFitted ?? 142} Pcs</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Sheet Yield Accuracy:</span>
            <span className="font-bold text-emerald-400">{job.analytics?.yield ?? 92.4}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Material Waste:</span>
            <span className="font-semibold text-amber-400">{job.analytics?.waste ?? 7.6}%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="md" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="success"
            size="md"
            onClick={onConfirm}
            isLoading={isSubmitting}
            icon={CheckCircle2}
          >
            Send to Production
          </Button>
        </div>
      </div>
    </Modal>
  );
};
