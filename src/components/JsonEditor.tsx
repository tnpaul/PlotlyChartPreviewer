import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy, Wand2, Check } from "lucide-react";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  onPrettify: () => void;
}

export default function JsonEditor({ value, onChange, onCopy, onPrettify }: JsonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (lineNumbersRef.current && textareaRef.current) {
      const lineCount = value ? value.split("\n").length : 1;
      const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");
      lineNumbersRef.current.textContent = lineNumbers;
    }
  }, [value]);

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700 h-16">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrettify}
          className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Prettify
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyClick}
          className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600"
        >
          {copied ? (
            <Check className="w-4 h-4 mr-2 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          Copy
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          ref={lineNumbersRef}
          className="min-w-[50px] px-3 py-4 text-right text-slate-500 text-sm font-mono select-none overflow-hidden bg-slate-950 border-r border-slate-700"
          style={{ lineHeight: "1.5rem", whiteSpace: "pre" }}
        />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 px-4 py-4 bg-slate-900 text-white font-mono text-sm resize-none focus:outline-none"
          style={{ lineHeight: "1.5rem" }}
          placeholder="Enter Plotly JSON here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
}
