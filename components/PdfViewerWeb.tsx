import React, { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { View, Text } from 'react-native';

const PdfViewerWeb = ({ uri }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(uri);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // Load the first page
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      page.render({ canvasContext: context, viewport });
    };

    loadPdf();
  }, [uri]);

  return <canvas ref={canvasRef} />;
};

export default PdfViewerWeb;
