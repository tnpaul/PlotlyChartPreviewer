import { useState, useRef, useEffect, type ReactNode } from "react";

interface ResizableSplitViewProps {
  leftPane: ReactNode;
  rightPane: ReactNode;
}

export default function ResizableSplitView({
  leftPane,
  rightPane,
}: ResizableSplitViewProps) {
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newLeftWidth >= 5 && newLeftWidth <= 95) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex h-full w-full">
      <div style={{ width: `${leftWidth}%` }} className="h-full">
        {leftPane}
      </div>

      <div
        className="w-1 bg-slate-300 hover:bg-blue-500 cursor-col-resize transition-colors relative group"
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="absolute inset-y-0 -left-1 -right-1" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-slate-400 rounded-full group-hover:bg-blue-600 transition-colors" />
      </div>

      <div style={{ width: `${100 - leftWidth}%` }} className="h-full">
        {rightPane}
      </div>
    </div>
  );
}
