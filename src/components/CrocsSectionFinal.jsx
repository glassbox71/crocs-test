import React, { useEffect, useRef } from "react";
import "./scss/CrocsSectionFinal.scss";

const CrocsSection = () => {
  const textMaskedRef = useRef(null);
  
  useEffect(() => {
    const updateBlobPositions = () => {
      const blobs = document.querySelectorAll('.blob');
      const textMasked = textMaskedRef.current;
      
      if (!textMasked || blobs.length < 4) return;
      
      blobs.forEach((blob, index) => {
        const rect = blob.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        textMasked.style.setProperty(`--blob${index + 1}-x`, `${centerX}px`);
        textMasked.style.setProperty(`--blob${index + 1}-y`, `${centerY}px`);
      });
      
      requestAnimationFrame(updateBlobPositions);
    };
    
    updateBlobPositions();
  }, []);

  const textRows = [
    { id: 1, text: "Come As You Are　Come", className: "text-row-1" },
    { id: 2, text: "Come As You Are　Come", className: "text-row-2" },
    { id: 3, text: "Come As You Are　Come", className: "text-row-3" },
    { id: 4, text: "Come As You Are　Come", className: "text-row-4" },
    { id: 5, text: "Come As You Are　Come", className: "text-row-5" }
  ];

  return (
    <div className="crocs-section">
      <svg className="svg-filters" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -8" 
            />
          </filter>
          
          <filter id="gooey-strong">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" 
            />
          </filter>
        </defs>
      </svg>

      <section className="crocs-hero">
        <div className="text-container text-base">
          {textRows.map((row) => (
            <div key={row.id} className={`text-row ${row.className}`}>
              <div className="text-wrapper">
                <span className="text-item">{row.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="blob-layer">
          <div className="blob blob-left-1"></div>
          <div className="blob blob-left-2"></div>
          <div className="blob blob-right-1"></div>
          <div className="blob blob-right-2"></div>
        </div>

        <div className="text-container text-masked" ref={textMaskedRef}>
          {textRows.map((row) => (
            <div key={row.id} className={`text-row ${row.className}`}>
              <div className="text-wrapper">
                <span className="text-item">{row.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CrocsSection;
