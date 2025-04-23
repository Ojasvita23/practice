"use client";

import {useState, Suspense, lazy } from "react";
import dynamic from "next/dynamic";

// Lazy load components
const HeavyComponent1 = dynamic(() => import("../../components/Heavy1"), {
  loading: () => <p>Loading Component 1...</p>,
});

const HeavyComponent2 = lazy(() => import("../../components/Heavy2"));

export default function ImplementLazyLoading() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Lazy Loading Example in Next.js</h1>

      <button
        onClick={() => setShowFirst(!showFirst)}
        style={{ margin: "10px" }}
      >
        Toggle Heavy Component 1
      </button>
      <button
        onClick={() => setShowSecond(!showSecond)}
        style={{ margin: "10px" }}
      >
        Toggle Heavy Component 2
      </button>

      <div style={{ marginTop: "20px" }}>
        {showFirst && <HeavyComponent1 />}
        {showSecond && (
          <Suspense fallback={<div>heya...</div>}>
            <HeavyComponent2 />
          </Suspense>
        )}
      </div>
    </div>
  );
}
