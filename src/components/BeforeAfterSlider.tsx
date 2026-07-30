"use client";

import { useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="ba-wrap relative aspect-video w-full max-w-[980px] mx-auto rounded-r-lg overflow-hidden select-none">
      {/* Before Image (Raw) */}
      <img
        src={beforeImage}
        alt="Ungraded raw camera footage still"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="ba-label before absolute top-[18px] left-[18px] font-mono text-[11px] tracking-[0.1em] uppercase py-[6px] px-[12px] rounded-[6px] bg-black/50 backdrop-blur-[6px] z-[2]">
        Raw
      </span>

      {/* After Image (Graded) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        <img
          src={afterImage}
          alt="Colour graded cinematic footage still"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <span className="ba-label after absolute top-[18px] right-[18px] font-mono text-[11px] tracking-[0.1em] uppercase py-[6px] px-[12px] rounded-[6px] bg-black/50 backdrop-blur-[6px] z-[2]">
        Graded
      </span>

      {/* Slider Indicator Line and Handle */}
      <div
        className="ba-slider absolute top-0 bottom-0 z-[5] w-0 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="ba-line absolute top-0 bottom-0 left-0 w-[2px] bg-white -translate-x-[1px] shadow-lg" />
        <div className="ba-handle absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[52px] height-[52px] rounded-full bg-white/15 backdrop-blur-[10px] border border-white/40 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#08090b"
            strokeWidth="2.4"
            className="w-[18px] h-[18px]"
          >
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      {/* Invisible Range Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="ba-range absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-[6]"
        aria-label="Drag to compare before and after grade"
      />
    </div>
  );
}
