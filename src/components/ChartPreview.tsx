import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Info, BarChart } from "lucide-react";

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

  const [showInfo, setShowInfo] = useState(false);

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
            : "Invalid JSON format. Please check your input.",
        );
        setChartData(null);
        onPlotComplete();
      }
    }
  }, [shouldPlot, jsonData, onPlotComplete]);

  const handleApplySize = () => {
    setAppliedHeight(height);
    setAppliedWidth(width);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-200 shadow-sm h-16 flex items-center justify-between">
        {/* Left controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              defaultValue={width}
              onBlur={(e) => setWidth(parseInt(e.target.value) || 700)}
              className="w-24"
              min="100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              defaultValue={height}
              onBlur={(e) => setHeight(parseInt(e.target.value) || 500)}
              className="w-24"
              min="100"
            />
          </div>

          <Button
            size="sm"
            onClick={handleApplySize}
            className="text-white hover:opacity-80"
            style={{ backgroundColor: "#005a94" }}
          >
            Apply
          </Button>
        </div>

        {/* Right info button */}
        <Button
          variant="ghost"
          onClick={() => setShowInfo(true)}
          aria-label="Plotly JSON Help"
          className="flex items-center gap-2 text-slate-600"
        >
          <Info className="w-5 h-5" />
          <span className="text-sm">Quick guide</span>
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {error ? (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-300 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold text-lg mb-2">
              Chart Error
            </h3>
            <p className="text-red-700 whitespace-pre-wrap">{error}</p>
          </div>
        ) : chartData ? (
          <div className="flex items-center justify-center min-h-full">
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
        ) : (
          <div className="text-slate-400 text-center flex items-center justify-center min-h-full gap-2">
            <BarChart className="h-12 w-12 opacity-60 pb-3" />
            <span>Enter JSON and click “Plot” to preview chart</span>
          </div>
        )}
      </div>

      {/* Info Dialog */}
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Plotly JSON Format – Quick Guide</DialogTitle>
            <DialogDescription>
              Learn how to structure JSON for Plotly charts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 text-sm text-slate-700">
            {/* Required Structure */}
            <section>
              <h4 className="font-semibold mb-2">Required Structure</h4>
              <pre className="bg-slate-100 rounded-md p-4 text-xs overflow-x-auto">
                {`{
  "data": [],
  "layout": {},
  "config": {}
}`}
              </pre>
            </section>

            {/* Supported Charts */}
            <section>
              <h4 className="font-semibold mb-2">Supported Chart Types</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  <b>Basic:</b> bar, line, scatter, pie
                </li>
                <li>
                  <b>Statistical:</b> histogram, box, violin
                </li>
                <li>
                  <b>Financial:</b> candlestick, ohlc
                </li>
                <li>
                  <b>Maps:</b> scattergeo, choropleth
                </li>
                <li>
                  <b>3D:</b> scatter3d, surface, mesh3d
                </li>
              </ul>
              <p className="mt-2 text-xs text-slate-500">
                Plotly supports 30+ chart types in total.
              </p>
            </section>

            {/* Example */}
            <section>
              <h4 className="font-semibold mb-2">Example: Bar Chart</h4>
              <pre className="bg-slate-100 rounded-md p-4 text-xs overflow-x-auto">
                {`{
  "data": [
    {
      "type": "bar",
      "x": ["A", "B", "C"],
      "y": [10, 20, 15]
    }
  ],
  "layout": {
    "title": "Sample Bar Chart"
  }
}`}
              </pre>
            </section>

            {/* Docs Link */}
            <section className="pt-4 border-t">
              <p className="mb-2">
                For the complete reference and advanced examples:
              </p>
              <a
                href="https://plotly.com/javascript/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline font-medium"
              >
                Open Plotly JavaScript Docs →
              </a>
            </section>

            <p className="text-xs text-slate-500">
              Tip: Most rendering issues are caused by missing or incorrect
              <code className="mx-1">type</code> fields.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
