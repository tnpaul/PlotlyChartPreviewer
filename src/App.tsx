import { useState } from "react";
import Header from "./components/Header";
import JsonEditor from "./components/JsonEditor";
import ChartPreview from "./components/ChartPreview";
import ResizableSplitView from "./components/ResizableSplitView";

const SAMPLE_JSON = `{
  "data": [
    {
      "type": "bar",
      "x": ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
      "y": [1517.39, 1896.49, 1828.39, 1824.40, 2062.59, 2623.81, 4315.13, 4958.99],
      "marker": {
        "color": "#005a94"
      },
      "name": "Gold Price (USD/oz)"
    }
  ],
  "layout": {
    "title": {
      "text": "Annual Gold Price in USD per Ounce (2019–2026)",
      "font": {
        "size": 20
      }
    },
    "xaxis": {
      "title": {
        "text": "Year",
        "font": {
          "size": 16
        }
      }
    },
    "yaxis": {
      "title": {
        "text": "Price (USD per troy ounce)",
        "font": {
          "size": 16
        }
      }
    },
    "template": "plotly_white"
  }
}
`;

function App() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [shouldPlot, setShouldPlot] = useState(true);
  const [resetChart, setResetChart] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput);
  };

  const handleReset = () => {
    setJsonInput("");
    setShouldPlot(false);
    setResetChart(true);
    setTimeout(() => setResetChart(false), 0);
  };

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      alert("Invalid JSON: Cannot prettify");
    }
  };

  const handlePlot = () => {
    setShouldPlot(true);
  };

  const handlePlotComplete = () => {
    setShouldPlot(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100">
      <Header onReset={handleReset} onPlot={handlePlot} />
      
      <div className="pt-16 h-full">
        <ResizableSplitView
          leftPane={
            <JsonEditor 
              value={jsonInput} 
              onChange={setJsonInput}
              onCopy={handleCopy}
              onPrettify={handlePrettify}
            />
          }
          rightPane={
            <ChartPreview
              jsonData={jsonInput}
              shouldPlot={shouldPlot}
              onPlotComplete={handlePlotComplete}
              resetChart={resetChart}
            />
          }
        />
      </div>
    </div>
  );
}

export default App;
