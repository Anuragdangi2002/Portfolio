"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import TimecodeTicker from "@/components/TimecodeTicker";
import Fab from "@/components/Fab";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onLoaded={() => setLoaded(true)} />
      
      {loaded && (
        <SmoothScroll>
          <div className="grain" />
          <div className="vignette" />
          <CustomCursor />
          <Header />
          <main className="flex-1 relative z-[2]">{children}</main>
          <TimecodeTicker />
          <Fab />
        </SmoothScroll>
      )}
    </>
  );
}
