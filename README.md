# CloudPrint StepCalculator

A modern, responsive React manufacturing and nesting job management web application built for precision laser cutting, CNC routing, and industrial sheet fabrication.

![CloudPrint StepCalculator Preview](file:///C:/Users/Jasim%20Saad%20P%20A/.gemini/antigravity/brain/9bface1a-5e2a-47e4-b000-16e1a12ae050/.user_uploaded/media_1787150930260.jpg)

---

## 🚀 Key Features

* **Visual SaaS Design**: High-fidelity dark industrial interface matching precision CAD/CAM engineering aesthetics.
* **Dynamic Authentication**: Simulated multi-user session management (`admin` / `Jasim`), remember-me preference, and dynamic dashboard greetings (`Hello, ${username}`).
* **Executive Dashboard**:
  * Real-time metrics for Total Jobs (`24`), Drafts (`6`), Completed Jobs (`18`), and Average Material Yield (`92.1%`).
  * Interactive Recent Jobs table with status indicators and 1-click edit navigation.
  * Direct action cards for Completed Archive, StepCalculator Engine, and Draft Setups.
* **Interactive StepCalculator (3-Column Layout)**:
  * **1. Job & Sheet Setup**:
    * Editable Job Name, Sheet Width & Height in mm (live updating canvas aspect-ratio).
    * Drag-and-drop vector shape uploader supporting `.SVG` and `.DXF` CAD assets.
    * Material Grain Alignment toggle, configurable Edge Margins (`5mm`), and Part Gutter Spaces (`2mm`).
    * Glowing `RUN NESTING ENGINE` simulation with live loading state and recalculations.
  * **2. Interactive Canvas Preview**:
    * Interactive SVG vector canvas with zoom controls (`+`, `-`, `Reset`), mouse panning, and canvas grid overlay.
    * Real-time draggable parts strictly bounded within sheet dimensions and edge margins.
    * Shape renderer replicating Chevrons (Purple/Blue), Irregular Pentagons (Green), Rectangles (Amber), and Circles (Pink).
    * Click-to-inspect part flyout with dimensions, source files, and coordinates.
  * **3. Yield Analytics**:
    * Highlighted Sheet Yield Accuracy (`92.4%`, `+4.2% vs manual`), Material Waste Index (`7.6%`), and Total Parts Fitted (`142 Pcs`).
    * Itemized layout breakdown list.
    * `Export Print File (.PDF)` generating formatted industrial reports with QA sign-off fields.
    * `SEND TO PRODUCTION` workflow with confirmation modal and confetti celebration.
* **Persistence & Extensibility**:
  * LocalStorage wrapper with automatic state hydration and mock database.
  * Modular API service layer (`src/services/api.js`) configured with Axios ready for backend integration (Node.js/Express + MongoDB).

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 + Custom Industrial Dark Theme
* **Routing**: React Router DOM
* **Icons**: Lucide React
* **PDF Engine**: jsPDF
* **HTTP Service**: Axios

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🔐 Sample Credentials

| Username | Password | Role |
| :--- | :--- | :--- |
| `admin` | `admin123` | Lead Manufacturing Engineer |
| `jasim` | `admin123` | Senior Operator |
