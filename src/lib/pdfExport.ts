import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportToPdf(
  elementId: string,
  fileName: string = 'HomeDecision-Report'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = pageHeight - margin * 2;

  // Add header on first page
  const headerHeight = 15;
  pdf.setFontSize(18);
  pdf.setTextColor(30, 30, 30);
  pdf.text('HomeDecision Report', margin, margin + 8);
  pdf.setFontSize(10);
  pdf.setTextColor(120, 120, 120);
  pdf.text(new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }), margin, margin + 14);

  // Calculate image dimensions to fit within content area
  const imgWidth = contentWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Add disclaimer footer function
  const addFooter = (doc: jsPDF) => {
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'Disclaimer: This is an educational tool only. Results are projections, not financial advice.',
      margin,
      pageHeight - 8
    );
  };

  // Handle multi-page: slice the image across pages
  let remainingHeight = imgHeight;
  let sourceY = 0;
  let isFirstPage = true;

  while (remainingHeight > 0) {
    const availableHeight = isFirstPage
      ? contentHeight - headerHeight
      : contentHeight;
    const startY = isFirstPage ? margin + headerHeight : margin;
    const sliceHeight = Math.min(availableHeight, remainingHeight);

    // Calculate the portion of the source image to draw
    const sourceSliceHeight = (sliceHeight / imgHeight) * canvas.height;

    // Create a temporary canvas for this slice
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = sourceSliceHeight;
    const ctx = sliceCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        canvas,
        0, sourceY, canvas.width, sourceSliceHeight,
        0, 0, canvas.width, sourceSliceHeight
      );
      const sliceData = sliceCanvas.toDataURL('image/png');
      pdf.addImage(sliceData, 'PNG', margin, startY, imgWidth, sliceHeight);
    }

    addFooter(pdf);

    sourceY += sourceSliceHeight;
    remainingHeight -= sliceHeight;

    if (remainingHeight > 0) {
      pdf.addPage();
      isFirstPage = false;
    }
  }

  pdf.save(`${fileName}.pdf`);
}
