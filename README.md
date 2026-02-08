# 📊 Plotly Chart Previewer

A powerful, real-time web application for creating, editing, and previewing Plotly charts with an intuitive split-pane interface. Perfect for data scientists, analysts, and developers who want to rapidly prototype and visualize Plotly charts.

<video width="100%" controls>
  <source src="/demo/video1.m4v" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 🚀 Live Demo

**[View Live Demo →](#)** *https://plotlychart.vercel.app*

## ✨ Features

### 🎯 Core Features
- **Real-time JSON Editing** - Edit Plotly chart JSON with line numbers
- **Live Chart Preview** - Instantly visualize your Plotly charts with the click of a button
- **Resizable Split View** - Drag to adjust the editor/preview pane sizes
- **Smart JSON Formatting** - One-click JSON prettification for better readability
- **Quick Copy** - Copy JSON to clipboard
- **Custom Chart Dimensions** - Specify exact width and height for your charts
- **Scrollable Preview** - Handle charts of any size with smooth scrolling
- **Error Handling** - Clear, descriptive error messages for invalid JSON or unsupported chart formats

### 🎨 UI/UX Features
- **Modern Dark Theme** - Sleek, professional interface with excellent contrast
- **Responsive Layout** - Adapts to different screen sizes
- **Visual Feedback** - Green checkmark confirmation for successful copy operations
- **Clean Controls** - Intuitive header with action buttons (Plot, Reset)
- **Line Numbers** - Easy reference and navigation in the JSON editor

## 🛠️ Tech Stack

- **[React](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Plotly.js](https://plotly.com/javascript/)** - Powerful charting library
- **[react-plotly.js](https://plotly.com/javascript/react/)** - React wrapper for Plotly
- **[Lucide React](https://lucide.dev/)** - Clean, consistent icons

## 📸 Screenshots

### Plotly chart preview
![Editor with Line Numbers](/demo/screenshot1.png)


## 🎯 Why Use Plotly Chart Previewer?

✅ **No Setup Required** - Start creating charts immediately without any configuration  
✅ **Fast Iteration** - Edit and preview charts in real-time without page refreshes  
✅ **Developer Friendly** - Line numbers, syntax awareness, and error handling  
✅ **Flexible Layout** - Adjust panes to your preferred working style  
✅ **Production Ready** - Built with modern, battle-tested technologies  
✅ **Lightweight** - Fast loading and smooth performance  
✅ **Open Source** - Free to use, modify, and extend  

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tnpaul/PlotlyChartPreviewer.git
   cd PlotlyChartPreviewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## 📖 Usage

### Creating a Chart

1. **Enter JSON** - Type or paste your Plotly chart JSON in the left editor pane
2. **Click Plot** - Press the "Plot" button in the header to render the chart
3. **Adjust Size** - Set custom width/height values and click "Apply"
4. **Export** - Use Plotly's built-in controls to download as PNG/SVG

### Example Chart JSON

```json
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5],
      "y": [1, 4, 9, 16, 25],
      "type": "scatter",
      "mode": "lines+markers",
      "marker": { "color": "blue" }
    }
  ],
  "layout": {
    "title": "Sample Chart",
    "xaxis": { "title": "X Axis" },
    "yaxis": { "title": "Y Axis" }
  }
}
```

### Keyboard Shortcuts

- **Enter** (in width/height inputs) - Apply dimension changes
- **Scroll** - Navigate long JSON or large charts

## 🏗️ Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

Deploy to your favorite platform:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag & drop the `dist` folder
- **GitHub Pages** - Use `gh-pages` branch
- **AWS S3** - Upload `dist` contents

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Plotly](https://plotly.com/) for the amazing charting library
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/tnpaul/PlotlyChartPreviewer](https://github.com/tnpaul/PlotlyChartPreviewer)

---
