import { Button } from "./ui/button";
import { RotateCcw, Play } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
  onPlot: () => void;
}

export default function Header({ onReset, onPlot }: HeaderProps) {
  const handleGitHubClick = () => {
    window.open("https://github.com/tnpaul/PlotlyChartPreviewer", "_blank", "noopener,noreferrer");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white shadow-lg z-50 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold">Plotly Chart Previewer</h1>
      <div className="flex gap-3 items-center">
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="bg-slate-800 text-white hover:bg-slate-700 border-slate-600"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button
          size="sm"
          onClick={onPlot}
          className="text-white hover:opacity-90"
          style={{ backgroundColor: "#005a94" }}
        >
          <Play className="w-4 h-4 mr-2" />
          Plot
        </Button>
        <button
          onClick={handleGitHubClick}
          className="text-slate-300 hover:text-white transition-colors p-1"
          aria-label="View on GitHub"
          title="View on GitHub"
        >
          <svg height="28" aria-hidden="true" viewBox="0 0 24 24" width="28" fill="currentColor">
            <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.2 10.2 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
