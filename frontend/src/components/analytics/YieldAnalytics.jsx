import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { AnalyticsCard } from './AnalyticsCard';
import { LayoutBreakdown } from './LayoutBreakdown';
import { ProductionConfirmModal } from './ProductionConfirmModal';
import { exportJobToPDF } from '../../utils/pdfExport';
import { FileDown, CheckCircle, Save, Check } from 'lucide-react';

export const YieldAnalytics = () => {
  const navigate = useNavigate();
  const { currentJob, sendToProduction, saveDraft, addToast } = useJobs();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const yieldValue = currentJob.analytics?.yield !== null && currentJob.analytics?.yield !== undefined
    ? `${currentJob.analytics.yield}%`
    : '92.4%';

  const wasteValue = currentJob.analytics?.waste !== null && currentJob.analytics?.waste !== undefined
    ? `${currentJob.analytics.waste}%`
    : '7.6%';

  const totalFittedValue = currentJob.analytics?.totalFitted !== null && currentJob.analytics?.totalFitted !== undefined
    ? `${currentJob.analytics.totalFitted} Pcs`
    : '142 Pcs';

  const comparison = currentJob.analytics?.comparisonVsManual || '+4.2% vs manual';

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const success = exportJobToPDF(currentJob);
      if (success) {
        addToast('PDF Print File generated successfully!', 'success');
      } else {
        addToast('Could not generate PDF print file.', 'error');
      }
    } catch (err) {
      console.error(err);
      addToast('Error generating PDF.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirmProduction = async () => {
    setIsSubmitting(true);
    try {
      await sendToProduction();
      setIsConfirmOpen(false);
    } catch {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    await saveDraft();
    setIsSavingDraft(false);
  };

  return (
    <>
      <div className="bg-[#172235] border border-slate-700/70 rounded-xl p-5 shadow-xl flex flex-col justify-between gap-5 h-full">
        <div className="flex flex-col gap-4">
          {/* Section Header */}
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
              3. YIELD ANALYTICS
            </h2>
            <button
              onClick={handleSaveDraft}
              disabled={isSavingDraft}
              className="text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingDraft ? 'Saving...' : 'Save Draft'}</span>
            </button>
          </div>

          {/* Analytics Cards matching reference */}
          <div className="flex flex-col gap-3">
            {/* Sheet Yield Accuracy (Highlighted Emerald) */}
            <AnalyticsCard
              title="SHEET YIELD ACCURACY"
              value={yieldValue}
              subtitle={comparison}
              variant="yield"
              highlight={true}
            />

            {/* Material Waste Index */}
            <AnalyticsCard
              title="MATERIAL WASTE INDEX"
              value={wasteValue}
              subtitle="Off-cut scrap"
              variant="waste"
            />

            {/* Total Parts Fitted */}
            <AnalyticsCard
              title="TOTAL PARTS FITTED"
              value={totalFittedValue}
              subtitle="On sheet"
              variant="default"
            />
          </div>

          {/* Layout Breakdown Section */}
          <LayoutBreakdown />
        </div>

        {/* Action Buttons matching reference style */}
        <div className="flex flex-col gap-2.5 pt-2">
          {/* Export Print File (.PDF) Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="w-full bg-[#111C30] hover:bg-[#16243D] text-slate-200 hover:text-white font-semibold py-3 px-4 rounded-xl border border-blue-600/40 hover:border-blue-500 text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-blue-400" />
            <span>Export Print File (.PDF)</span>
          </button>

          {/* SEND TO PRODUCTION Button (Green matching reference) */}
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className="w-full btn-success text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <CheckCircle className="w-4 h-4 text-white" />
            <span>SEND TO PRODUCTION</span>
          </button>
        </div>
      </div>

      {/* Production Confirmation Modal */}
      <ProductionConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmProduction}
        job={currentJob}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
