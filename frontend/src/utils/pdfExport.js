import { jsPDF } from 'jspdf';

export const exportJobToPDF = (job) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [37, 99, 235]; // #2563EB
    const darkBg = [11, 18, 32];        // #0B1220
    const cardBg = [23, 34, 53];        // #172235
    const textColor = [248, 250, 252];
    const mutedColor = [148, 163, 184];
    const successColor = [16, 185, 129];

    // Background
    doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Header bar
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.rect(10, 10, 190, 28, 'F');

    // Branding & Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('CloudPrint StepCalculator', 18, 24);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('MANUFACTURING & NESTING JOB REPORT', 18, 31);

    // Job ID Badge
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.roundedRect(145, 16, 45, 14, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(job.id || 'JOB-1024', 167, 25, { align: 'center' });

    // Job Details Card
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.rect(10, 43, 190, 48, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('1. Job Information & Specifications', 16, 52);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);

    doc.text('Job Name:', 16, 61);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(job.name || 'Production Batch 01', 50, 61);

    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Status:', 16, 69);
    doc.setTextColor(job.status === 'completed' ? successColor[0] : 245, job.status === 'completed' ? successColor[1] : 158, job.status === 'completed' ? successColor[2] : 11);
    doc.text((job.status || 'draft').toUpperCase(), 50, 69);

    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Generated Date:', 16, 77);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(new Date().toLocaleString(), 50, 77);

    // Right side specs
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Sheet Dimensions:', 110, 61);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(`${job.sheet?.width || 1200} mm × ${job.sheet?.height || 800} mm`, 150, 61);

    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Edge Margin:', 110, 69);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(`${job.constraints?.edgeMargin || 5} mm`, 150, 69);

    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Part Gutter Space:', 110, 77);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(`${job.constraints?.gutterSpace || 2} mm (Grain: ${job.constraints?.grainAlignment ? 'ON' : 'OFF'})`, 150, 77);

    // Yield Analytics Summary Cards
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.rect(10, 96, 60, 42, 'F');
    doc.rect(75, 96, 60, 42, 'F');
    doc.rect(140, 96, 60, 42, 'F');

    // Yield Card
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('SHEET YIELD ACCURACY', 16, 105);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    doc.text(`${job.analytics?.yield ?? 92.4}%`, 16, 120);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(job.analytics?.comparisonVsManual || '+4.2% vs manual', 16, 130);

    // Waste Card
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('MATERIAL WASTE INDEX', 81, 105);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.text(`${job.analytics?.waste ?? 7.6}%`, 81, 120);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Off-cut scrap', 81, 130);

    // Total Parts Card
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('TOTAL PARTS FITTED', 146, 105);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(`${job.analytics?.totalFitted ?? 142} Pcs`, 146, 120);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('On sheet layout', 146, 130);

    // Layout Breakdown Table
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.rect(10, 143, 190, 75, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('2. Layout Breakdown & Parts List', 16, 153);

    // Table Header
    doc.setFillColor(16, 25, 43);
    doc.rect(15, 159, 180, 8, 'F');
    doc.setFontSize(9);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('PART / VECTOR ASSET', 20, 164.5);
    doc.text('TYPE', 95, 164.5);
    doc.text('QUANTITY', 160, 164.5);

    const breakdownItems = job.breakdown?.length ? job.breakdown : [
      { name: 'Polygon_A.svg', count: 48 },
      { name: 'Packaging_Box.dxf', count: 24 },
      { name: 'Circle_Seal.svg', count: 70 }
    ];

    let rowY = 175;
    breakdownItems.forEach((item, idx) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(item.name, 20, rowY);

      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(item.name.endsWith('.dxf') ? 'CAD Vector' : 'SVG Contour', 95, rowY);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(`${item.count} pcs`, 160, rowY);

      // Divider line
      doc.setDrawColor(51, 65, 85);
      doc.line(15, rowY + 3, 195, rowY + 3);
      rowY += 9;
    });

    // Verification & Sign-off footer
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.rect(10, 223, 190, 50, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('3. Production Sign-off & Quality Assurance', 16, 233);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Operator / Engineer Signature: _______________________', 16, 248);
    doc.text('Date Approved: _______________________', 120, 248);
    doc.text('CNC / Laser Cutter Machine ID: _______________________', 16, 260);
    doc.text('Sheet Material Lot #: _______________________', 120, 260);

    // Save PDF
    doc.save(`${job.id || 'JOB-1024'}_StepCalculator_PrintFile.pdf`);
    return true;
  } catch (err) {
    console.error('Failed to generate PDF:', err);
    return false;
  }
};
