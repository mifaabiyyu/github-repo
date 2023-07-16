import React from "react";

export default function Layout(
  { children }: { children: React.ReactNode },
  { className = "" }
) {
  return (
    <div className={`w-full h-full  inline-block z-0 bg-light  ${className}`}>
      {children}
    </div>
  );
}
