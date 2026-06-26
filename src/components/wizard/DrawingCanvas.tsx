import { useEffect, useRef, useState, useCallback } from "react";
import {
  Canvas as FabricCanvas,
  Line,
  Rect,
  PencilBrush,
  Text as FabricText,
  Shadow,
  Path,
  Group,
} from "fabric";
import { toast } from "sonner";
import { Undo, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DrawingCanvasProps {
  spaceId: string;
  unit: "cm" | "in";
  onDrawingComplete: (
    dataUrl: string,
    wallMeasurements: WallMeasurement[],
    totalPerimeter: number,
    totalArea: number,
  ) => void;
}

interface WallMeasurement {
  label: string;
  length: string;
}

const MAX_WALLS = 7;

export const DrawingCanvas = ({ spaceId, unit, onDrawingComplete }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [wallMeasurements, setWallMeasurements] = useState<WallMeasurement[]>([]);
  const [wallCount, setWallCount] = useState(0);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const gridLinesRef = useRef<any[]>([]);
  const wallLabelsRef = useRef<Array<{ shape: any; label: FabricText }>>([]);
  const isRestoringRef = useRef(false);
  const { t } = useLanguage();
  const onDrawingCompleteRef = useRef(onDrawingComplete);
  const tRef = useRef(t);

  useEffect(() => {
    onDrawingCompleteRef.current = onDrawingComplete;
  }, [onDrawingComplete]);

  useEffect(() => {
    tRef.current = t;
  }, [t]);

  const fireComplete = useCallback(
    (canvas: FabricCanvas, measurements: WallMeasurement[]) => {
      const dataUrl = canvas.toDataURL();
      const perimeter = measurements.reduce((sum, w) => sum + (parseFloat(w.length) || 0), 0);
      const lengths = measurements.map((w) => parseFloat(w.length) || 0).filter((l) => l > 0);
      let area = 0;
      if (lengths.length >= 2) {
        const sorted = [...lengths].sort((a, b) => a - b);
        area = sorted[0] * sorted[sorted.length - 1];
      }
      onDrawingCompleteRef.current(dataUrl, measurements, perimeter, area);
    },
    [],
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const isMobile = window.innerWidth < 768;
    const canvasWidth = isMobile ? Math.min(window.innerWidth - 60, 600) : 800;
    const canvasHeight = isMobile ? 400 : 500;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#ffffff",
      selection: true,
      isDrawingMode: true,
    });

    const brush = new PencilBrush(canvas);
    brush.color = "#2D241E";
    brush.width = 3;
    canvas.freeDrawingBrush = brush;

    const gridSize = 20;
    const gridLines: any[] = [];
    for (let i = 0; i < (canvas.width || 0) / gridSize; i++) {
      const line = new Line([i * gridSize, 0, i * gridSize, canvas.height || 0], {
        stroke: "#f0e7dc",
        selectable: false,
        evented: false,
      });
      canvas.add(line);
      canvas.sendObjectToBack(line);
      gridLines.push(line);
    }
    for (let i = 0; i < (canvas.height || 0) / gridSize; i++) {
      const line = new Line([0, i * gridSize, canvas.width || 0, i * gridSize], {
        stroke: "#f0e7dc",
        selectable: false,
        evented: false,
      });
      canvas.add(line);
      canvas.sendObjectToBack(line);
      gridLines.push(line);
    }
    gridLinesRef.current = gridLines;

    const handlePathCreated = (e: any) => {
      if (wallLabelsRef.current.length >= MAX_WALLS) {
        canvas.remove(e.path);
        toast.error(tRef.current("canvas.maxWalls").replace("{max}", MAX_WALLS.toString()));
        return;
      }

      const path = e.path;
      const pathData = path.path;

      if (pathData && pathData.length >= 2) {
        const firstPoint = pathData[0];
        const lastPoint = pathData[pathData.length - 1];
        const startX = firstPoint[1];
        const startY = firstPoint[2];
        const endX = lastPoint[lastPoint.length - 2];
        const endY = lastPoint[lastPoint.length - 1];
        const dx = Math.abs(endX - startX);
        const dy = Math.abs(endY - startY);
        const totalLength = Math.sqrt(dx * dx + dy * dy);

        if (totalLength > 20) {
          canvas.remove(path);
          const straightLine = new Line([startX, startY, endX, endY], {
            stroke: "#2D241E",
            strokeWidth: 3,
            selectable: true,
            hasControls: true,
            hasBorders: true,
            cornerSize: 10,
            transparentCorners: false,
            cornerColor: "#3b82f6",
            cornerStyle: "circle",
            lockRotation: false,
          });
          canvas.add(straightLine);

          const bounds = straightLine.getBoundingRect();
          const idx = wallLabelsRef.current.length;
          const labelChar = String.fromCharCode(65 + idx);
          const text = new FabricText(labelChar, {
            left: bounds.left + bounds.width / 2,
            top: bounds.top + bounds.height / 2 - 10,
            fontSize: 20,
            fill: "#ef4444",
            fontWeight: "bold",
            selectable: false,
            evented: false,
            originX: "center",
            originY: "center",
          });
          canvas.add(text);
          wallLabelsRef.current.push({ shape: straightLine, label: text });

          straightLine.on("moving", () => {
            const b = straightLine.getBoundingRect();
            text.set({ left: b.left + b.width / 2, top: b.top + b.height / 2 - 10 });
            canvas.renderAll();
          });
          straightLine.on("scaling", () => {
            const b = straightLine.getBoundingRect();
            text.set({ left: b.left + b.width / 2, top: b.top + b.height / 2 - 10 });
            canvas.renderAll();
          });
          straightLine.on("rotating", () => {
            const b = straightLine.getBoundingRect();
            text.set({ left: b.left + b.width / 2, top: b.top + b.height / 2 - 10 });
            canvas.renderAll();
          });

          setWallMeasurements((prev) => {
            const next = [...prev, { label: labelChar, length: "" }];
            setTimeout(() => fireComplete(canvas, next), 0);
            return next;
          });
          setWallCount(wallLabelsRef.current.length);
          canvas.renderAll();
          return;
        }
      }

      path.set({
        selectable: true,
        hasControls: true,
        hasBorders: true,
        cornerSize: 10,
        transparentCorners: false,
        cornerColor: "#3b82f6",
        cornerStyle: "circle",
        lockRotation: false,
      });

      const bounds = path.getBoundingRect();
      const idx = wallLabelsRef.current.length;
      const labelChar = String.fromCharCode(65 + idx);
      const text = new FabricText(labelChar, {
        left: bounds.left + bounds.width / 2,
        top: bounds.top + bounds.height / 2,
        fontSize: 20,
        fill: "#ef4444",
        fontWeight: "bold",
        selectable: false,
        evented: false,
        originX: "center",
        originY: "center",
      });
      canvas.add(text);
      wallLabelsRef.current.push({ shape: path, label: text });

      path.on("moving", () => {
        const b = path.getBoundingRect();
        text.set({ left: b.left + b.width / 2, top: b.top + b.height / 2 });
        canvas.renderAll();
      });
      path.on("scaling", () => {
        const b = path.getBoundingRect();
        text.set({ left: b.left + b.width / 2, top: b.top + b.height / 2 });
        canvas.renderAll();
      });
      path.on("rotating", () => {
        const b = path.getBoundingRect();
        text.set({ left: b.left + b.width / 2, top: b.top + b.height / 2 });
        canvas.renderAll();
      });

      setWallMeasurements((prev) => {
        const next = [...prev, { label: labelChar, length: "" }];
        setTimeout(() => fireComplete(canvas, next), 0);
        return next;
      });
      setWallCount(wallLabelsRef.current.length);
      canvas.renderAll();
    };

    canvas.on("path:created", handlePathCreated);
    canvasRef.current.style.touchAction = "none";

    setFabricCanvas(canvas);
    setWallCount(0);
    setWallMeasurements([]);
    wallLabelsRef.current = [];
    setUndoStack([]);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const w = mobile ? Math.min(window.innerWidth - 60, 600) : 800;
      const h = mobile ? 400 : 500;
      canvas.setDimensions({ width: w, height: h });
      canvas.renderAll();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.off("path:created", handlePathCreated);
      canvas.dispose();
    };
  }, [spaceId, fireComplete]);

  useEffect(() => {
    if (!fabricCanvas) return;
    isRestoringRef.current = true;
    isRestoringRef.current = false;
  }, [fabricCanvas]);

  const addShapeTemplate = (shapeType: string) => {
    const canvas = fabricCanvas;
    if (!canvas) return;
    if (wallLabelsRef.current.length > 0) {
      toast.error(t("canvas.shapeExists"));
      return;
    }

    const centerX = (canvas.width || 0) / 2;
    const centerY = (canvas.height || 0) / 2;
    const wallShadow = new Shadow({ color: "rgba(0,0,0,0.3)", blur: 8, offsetX: 2, offsetY: 2 });

    let shapeObj: any;
    let labelSpecs: Array<{ char: string; x: number; y: number }> = [];

    const currentLabelIdx = wallLabelsRef.current.length;

    const makeLabel = (char: string, x: number, y: number) =>
      new FabricText(char, {
        left: x,
        top: y,
        originX: "center",
        originY: "center",
        fill: "#ef4444",
        fontSize: 20,
        fontWeight: "bold",
        selectable: false,
        evented: false,
      });

    const mk = (i: number, x: number, y: number) => ({
      char: String.fromCharCode(65 + currentLabelIdx + i),
      x,
      y,
    });

    switch (shapeType) {
      case "u-shape":
        shapeObj = new Path("M 30,60 L 0,60 L 0,0 L 100,0 L 100,60 L 70,60", {
          left: -50,
          top: -30,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, -35, 45), mk(1, -70, 0), mk(2, 0, -50), mk(3, 70, 0), mk(4, 35, 45)];
        break;
      // case "rectangle":
      //   shapeObj = new Rect({
      //     left: -75,
      //     top: -50,
      //     width: 150,
      //     height: 100,
      //     stroke: "#2D241E",
      //     strokeWidth: 3,
      //     fill: "transparent",
      //     shadow: wallShadow,
      //   });
      //   labelSpecs = [mk(0, 0, -58), mk(1, 83, 0), mk(2, 0, 68), mk(3, -93, 0)];
      //   break;
      case "lshape-1":
        shapeObj = new Path("M 0,0 L 100,0 L 100,60 L 60,60 L 60,100 L 0,100 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, 0, -60), mk(1, 55, -20), mk(2, 35, 30), mk(3, 5, 55), mk(4, -25, 30), mk(5, -60, 0)];
        break;
      case "lshape-2":
        shapeObj = new Path("M 0,60 L 40,60 L 40,0 L 100,0 L 100,100 L 0,100 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, -30, 5), mk(1, -10, -20), mk(2, 20, -60), mk(3, 55, 0), mk(4, 0, 55), mk(5, -30, 30)];
        break;
      case "lshape-3":
        shapeObj = new Path("M 0,0 L 60,0 L 60,40 L 100,40 L 100,100 L 0,100 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, -20, -60), mk(1, 10, -30), mk(2, 35, -10), mk(3, 55, 20), mk(4, 0, 55), mk(5, -60, 0)];
        break;
      case "lshape-4":
        shapeObj = new Path("M 0,40 L 40,40 L 40,0 L 100,0 L 100,100 L 0,100 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, -30, -10), mk(1, -10, -30), mk(2, 20, -60), mk(3, 55, 0), mk(4, 0, 55), mk(5, -30, 20)];
        break;
      case "angle-1":
        shapeObj = new Path("M 0,100 L 0,20 L 20,0 L 100,0 L 100,100 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, -60, 5), mk(1, -30, -40), mk(2, 10, -60), mk(3, 55, 0), mk(4, 0, 55)];
        break;
      case "angle-2":
        shapeObj = new Path("M 0,0 L 80,0 L 100,20 L 100,100 L 0,100 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, -10, -60), mk(1, 30, -40), mk(2, 55, 5), mk(3, 0, 55), mk(4, -60, 0)];
        break;
      case "angle-3":
        shapeObj = new Path("M 0,0 L 100,0 L 100,80 L 80,100 L 0,100 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, 0, -60), mk(1, 55, -5), mk(2, 30, 40), mk(3, -10, 55), mk(4, -60, 0)];
        break;
      case "angle-4":
        shapeObj = new Path("M 0,0 L 0,80 L 20,100 L 100,100 L 100,0 Z", {
          left: -50,
          top: -50,
          stroke: "#2D241E",
          strokeWidth: 3,
          fill: "transparent",
          shadow: wallShadow,
        });
        labelSpecs = [mk(0, -60, -5), mk(1, -30, 40), mk(2, 10, 55), mk(3, 55, 0), mk(4, 0, -60)];
        break;
      default:
        return;
    }

    if (!shapeObj || labelSpecs.length === 0) return;

    const labelObjects = labelSpecs.map((s) => makeLabel(s.char, s.x, s.y));

    const shapeGroup = new Group([shapeObj, ...labelObjects], {
      left: centerX,
      top: centerY,
      originX: "center",
      originY: "center",
      selectable: true,
      hasControls: true,
      hasBorders: true,
      cornerSize: 10,
      transparentCorners: false,
      cornerColor: "#3b82f6",
      cornerStyle: "circle",
      lockRotation: false,
      subTargetCheck: false,
    });

    canvas.add(shapeGroup);
    labelObjects.forEach((lbl) => {
      wallLabelsRef.current.push({ shape: shapeGroup, label: lbl });
    });

    const newMeasurements: WallMeasurement[] = labelSpecs.map((s) => ({
      label: s.char,
      length: "",
    }));

    setWallMeasurements(newMeasurements);
    setWallCount(wallLabelsRef.current.length);
    canvas.setActiveObject(shapeGroup);
    canvas.isDrawingMode = false;
    canvas.renderAll();

    fireComplete(canvas, newMeasurements);
    toast.success(`${shapeType} ${t("canvas.templateAdded").replace("{count}", labelSpecs.length.toString())}`);
  };

  const handleUndo = () => {
    const canvas = fabricCanvas;
    if (!canvas) return;

    const drawingObjects = canvas
      .getObjects()
      .filter(
        (obj) =>
          !gridLinesRef.current.includes(obj) && !(obj instanceof FabricText && wallLabelsRef.current.some((w) => w.label === obj)),
      );

    if (drawingObjects.length === 0) {
      toast.error(t("canvas.nothingToUndo"));
      return;
    }

    isRestoringRef.current = true;

    const lastObj = drawingObjects[drawingObjects.length - 1];
    let removedLabels = 0;

    if (lastObj instanceof Group) {
      const matchingLabels = wallLabelsRef.current.filter((item) => item.shape === lastObj);
      removedLabels = matchingLabels.length;
      matchingLabels.forEach((item) => canvas.remove(item.label));
      wallLabelsRef.current = wallLabelsRef.current.filter((item) => item.shape !== lastObj);
    } else {
      const entry = wallLabelsRef.current.find((item) => item.shape === lastObj);
      if (entry) {
        canvas.remove(entry.label);
        wallLabelsRef.current = wallLabelsRef.current.filter((item) => item.shape !== lastObj);
        removedLabels = 1;
      }
    }

    canvas.remove(lastObj);
    setWallCount(wallLabelsRef.current.length);

    setWallMeasurements((prev) => {
      const next = prev.slice(0, -removedLabels);
      setTimeout(() => fireComplete(canvas, next), 0);
      return next;
    });

    canvas.renderAll();
    isRestoringRef.current = false;
    toast.success(t("canvas.undoSuccess"));
  };

  const handleClear = () => {
    const canvas = fabricCanvas;
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      if (!gridLinesRef.current.includes(obj)) {
        canvas.remove(obj);
      }
    });

    setWallCount(0);
    setWallMeasurements([]);
    wallLabelsRef.current = [];
    setUndoStack([]);
    if (!canvas.isDrawingMode) {
      canvas.isDrawingMode = true;
    }
    canvas.renderAll();
    onDrawingComplete("", [], 0, 0);
    toast.success(t("canvas.canvasCleared"));
  };

  const handleMeasurementChange = (index: number, value: string) => {
    const newVal = value === "" ? "" : Math.max(0, parseFloat(value) || 0).toString();
    setWallMeasurements((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], length: newVal };
      if (fabricCanvas) fireComplete(fabricCanvas, next);
      return next;
    });
  };

  const perimeter = wallMeasurements.reduce((sum, w) => sum + (parseFloat(w.length) || 0), 0);
  const lengths = wallMeasurements.map((w) => parseFloat(w.length) || 0).filter((l) => l > 0);
  let area = 0;
  if (lengths.length >= 2) {
    const sorted = [...lengths].sort((a, b) => a - b);
    area = sorted[0] * sorted[sorted.length - 1];
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-brand-espresso">{t("canvas.title")}</h3>
          <p className="text-sm text-brand-muted">{t("canvas.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            className="p-2 rounded-md hover:bg-brand-sand transition-colors"
            title={t("canvas.undo")}
          >
            <Undo size={18} />
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-md hover:bg-brand-sand transition-colors"
            title={t("canvas.clear")}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-3 bg-brand-sand/30 border border-brand-border rounded-lg">
        <button
          onClick={() => addShapeTemplate("lshape-1")}
          className="p-3 border-2 border-brand-border hover:border-brand-copper hover:bg-brand-copper/10 rounded-lg transition-all cursor-pointer"
          title="L-Shape 1"
        >
          <svg width="50" height="40" viewBox="0 0 50 40" className="stroke-current stroke-2 fill-none">
            <path d="M 2,2 L 38,2 L 38,20 L 20,20 L 20,38 L 2,38 Z" />
          </svg>
        </button>
        <button
          onClick={() => addShapeTemplate("lshape-2")}
          className="p-3 border-2 border-brand-border hover:border-brand-copper hover:bg-brand-copper/10 rounded-lg transition-all cursor-pointer"
          title="L-Shape 2"
        >
          <svg width="50" height="40" viewBox="0 0 50 40" className="stroke-current stroke-2 fill-none">
            <path d="M 12,20 L 30,20 L 30,2 L 48,2 L 48,38 L 12,38 Z" />
          </svg>
        </button>
        <button
          onClick={() => addShapeTemplate("lshape-3")}
          className="p-3 border-2 border-brand-border hover:border-brand-copper hover:bg-brand-copper/10 rounded-lg transition-all cursor-pointer"
          title="L-Shape 3"
        >
          <svg width="50" height="40" viewBox="0 0 50 40" className="stroke-current stroke-2 fill-none">
            <path d="M 2,2 L 20,2 L 20,20 L 48,20 L 48,38 L 2,38 Z" />
          </svg>
        </button>
        <button
          onClick={() => addShapeTemplate("angle-1")}
          className="p-3 border-2 border-brand-border hover:border-brand-copper hover:bg-brand-copper/10 rounded-lg transition-all cursor-pointer"
          title="Angle 1"
        >
          <svg width="50" height="40" viewBox="0 0 50 40" className="stroke-current stroke-2 fill-none">
            <path d="M 6,34 L 6,14 L 14,6 L 44,6 L 44,34 Z" />
          </svg>
        </button>
        <button
          onClick={() => addShapeTemplate("angle-2")}
          className="p-3 border-2 border-brand-border hover:border-brand-copper hover:bg-brand-copper/10 rounded-lg transition-all cursor-pointer"
          title="Angle 2"
        >
          <svg width="50" height="40" viewBox="0 0 50 40" className="stroke-current stroke-2 fill-none">
            <path d="M 6,6 L 36,6 L 44,14 L 44,34 L 6,34 Z" />
          </svg>
        </button>
        <button
          onClick={() => addShapeTemplate("angle-3")}
          className="p-3 border-2 border-brand-border hover:border-brand-copper hover:bg-brand-copper/10 rounded-lg transition-all cursor-pointer"
          title="Angle 3"
        >
          <svg width="50" height="40" viewBox="0 0 50 40" className="stroke-current stroke-2 fill-none">
            <path d="M 6,6 L 44,6 L 44,26 L 36,34 L 6,34 Z" />
          </svg>
        </button>
        <button
          onClick={() => addShapeTemplate("angle-4")}
          className="p-3 border-2 border-brand-border hover:border-brand-copper hover:bg-brand-copper/10 rounded-lg transition-all cursor-pointer"
          title="Angle 4"
        >
          <svg width="50" height="40" viewBox="0 0 50 40" className="stroke-current stroke-2 fill-none">
            <path d="M 6,6 L 6,26 L 14,34 L 44,34 L 44,6 Z" />
          </svg>
        </button>
      </div>

      <div className="border-2 border-brand-border rounded-lg overflow-auto bg-white">
        <canvas ref={canvasRef} style={{ touchAction: "none" }} />
      </div>

      <div className="flex items-center justify-between text-xs text-brand-muted">
        <p>
          {t("canvas.wallsDrawn")}: {wallCount} / {MAX_WALLS}
        </p>
        <p>{t("canvas.drawingMode")}</p>
      </div>

      {wallMeasurements.length > 0 && (
        <div className="space-y-3 p-4 bg-brand-sand/30 border border-brand-border rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h4 className="font-semibold text-brand-espresso">{t("canvas.enterWallLengths")}</h4>
            {perimeter > 0 && (
              <div className="flex gap-4 text-sm">
                <div className="flex flex-col items-start">
                  <span className="text-brand-muted">{t("canvas.totalPerimeter")}</span>
                  <span className="font-semibold text-brand-copper">
                    {perimeter.toFixed(2)} {unit}
                  </span>
                </div>
                {area > 0 && (
                  <div className="flex flex-col items-start">
                    <span className="text-brand-muted">{t("canvas.estimatedArea")}</span>
                    <span className="font-semibold text-brand-copper">
                      {area.toFixed(2)} {unit}²
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {wallMeasurements.map((wall, index) => (
              <div key={`${wall.label}-${index}`} className="space-y-1">
                <label className="text-sm font-medium text-brand-muted">
                  {t("step3.wall")} {wall.label} ({unit})
                </label>
                <input
                  id={`wall-${wall.label}`}
                  type="number"
                  min="0"
                  step="0.1"
                  value={wall.length}
                  onChange={(e) => handleMeasurementChange(index, e.target.value)}
                  className="w-full p-2 border border-brand-border rounded-md focus:ring-brand-copper focus:border-brand-copper"
                  placeholder={`${t("canvas.enterWallLengths")} (${unit})`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
