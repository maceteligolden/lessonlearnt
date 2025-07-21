'use client';

import { useRef } from 'react';

interface Props {
  response: string | null;
  error: string | null;
}

function convertPlainTextToHtml(text: string): string {
  return text
    .replace(/(?:\r\n|\r|\n)/g, '<br>') // line breaks
    .replace(/(^|\s)([IVX]+\.)/g, '<h2>$2</h2>') // Roman numeral sections
    .replace(/([A-Z]\.)/g, '<strong>$1</strong>') // A., B., C. sections
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Markdown bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Markdown italics
}


export default function ResponseDisplay({ response, error }: Props) {
  const printableRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    if (!printableRef.current) return;

    const printContents = printableRef.current.innerHTML;
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Lessons Learned Report</title>
            <style>
              body { font-family: sans-serif; padding: 20px; line-height: 1.6; }
              h1, h2, h3 { color: #1f2937; }
              p { margin: 8px 0; }
              strong { font-weight: bold; }
              em { font-style: italic; }
              ul { margin-left: 20px; }
              pre { background: #f3f4f6; padding: 10px; border-radius: 5px; overflow: auto; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="relative max-w-2xl p-4 border rounded-lg bg-muted text-left shadow">
      {response && (
        <>
          <button
            className="absolute top-4 right-4 text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary/80"
            onClick={handleDownloadPdf}
          >
            Download PDF
          </button>
          <div ref={printableRef} className="prose prose-sm prose-neutral">
            <div
              dangerouslySetInnerHTML={{ __html: convertPlainTextToHtml(response) }}
            />
          </div>
        </>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
