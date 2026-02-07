import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface ChartPreviewProps {
  jsonData: string;
  shouldPlot: boolean;
  onPlotComplete: () => void;
  resetChart: boolean;
}

export default function ChartPreview({
  jsonData,
  shouldPlot,
  onPlotComplete,
  resetChart,
}: ChartPreviewProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [height, setHeight] = useState<number>(500);
  const [width, setWidth] = useState<number>(700);
  const [appliedHeight, setAppliedHeight] = useState<number>(500);
  const [appliedWidth, setAppliedWidth] = useState<number>(700);

  useEffect(() => {
    if (resetChart) {
      setChartData(null);
      setError("");
    }
  }, [resetChart]);

  useEffect(() => {
    if (shouldPlot && jsonData.trim()) {
      try {
        const parsed = JSON.parse(jsonData);
        
        if (!parsed.data || !Array.isArray(parsed.data)) {
          throw new Error("Invalid Plotly JSON: 'data' field must be an array");
        }

        setChartData(parsed);
        setError("");
        onPlotComplete();
      } catch (err) {
        setError(
          err instanceof Error
            ? `Error: ${err.message}`
            : "Invalid JSON format. Please check your input."
        );
        setChartData(null);
        onPlotComplete();
      }
    }
  }, [shouldPlot, jsonData, onPlotComplete]);

  const handleHeightChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 500;
    setHeight(newHeight);
  };

  const handleWidthChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 700;
    setWidth(newWidth);
  };

  const handleHeightKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleWidthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleApplySize = () => {
    setAppliedHeight(height);
    setAppliedWidth(width);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b border-slate-200 shadow-sm h-16 flex items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="width" className="text-sm font-medium">
              Width:
            </Label>
            <Input
              id="width"
              type="number"
              key={`width-${width}`}
              defaultValue={width}
              onBlur={handleWidthChange}
              onKeyDown={handleWidthKeyDown}
              className="w-24"
              min="100"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="height" className="text-sm font-medium">
              Height:
            </Label>
            <Input
              id="height"
              type="number"
              key={`height-${height}`}
              defaultValue={height}
              onBlur={handleHeightChange}
              onKeyDown={handleHeightKeyDown}
              className="w-24"
              min="100"
            />
          </div>
          <Button
            size="sm"
            onClick={handleApplySize}
            className="text-white hover:opacity-90"
            style={{ backgroundColor: "#005a94" }}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {error ? (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-300 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold text-lg mb-2">
              Chart Error
            </h3>
            <p className="text-red-700 whitespace-pre-wrap">{error}</p>
          </div>
        ) : chartData ? (
          <div className="flex items-center justify-center min-h-full min-w-fit">
            <div className="my-8 mx-8">
              <Plot
                data={chartData.data}
                layout={{
                  ...chartData.layout,
                  width: appliedWidth,
                  height: appliedHeight,
                  autosize: false,
                }}
                config={chartData.config || { responsive: true }}
              />
            </div>
          </div>
        ) : (
          <div className="text-slate-400 text-center flex items-center justify-center min-h-full">
            <div>
              <svg
                className="w-24 h-24 mx-auto mb-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-lg">Enter JSON and click "Plot" to preview chart</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
