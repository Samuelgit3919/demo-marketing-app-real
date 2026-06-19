import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush, Line, Text as FabricText } from "fabric";
import { toast } from "sonner";
import { Undo, Trash2 } from "lucide-react";

interface DrawingCanvasProps {
  spaceId: string;
  unit: "cm" | "in";
  initialMeasurements?: { label: string; length: string }[];
  onDrawingComplete: (
    dataUrl: string,
    wallMeasurements: { label: string; length: string }[]
  ) => void;
}

const MAX_WALLS = 6;

export const DrawingCanvas = ({ spaceId, unit, initialMeasurements, onDrawingComplete }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [wallMeasurements, setWallMeasurements] = useState<{ label: string; length: string }[]>(
    initialMeasurements ?? []
  );

  // Keep latest onDrawingComplete in a ref so effects don't depend on its identity
  const onDrawingCompleteRef = useRef(onDrawingComplete);
  useEffect(() => {
    onDrawingCompleteRef.current = onDrawingComplete;
  }, [onDrawingComplete]);

  // Track current wall count for the path handler without re-binding the listener
  const wallCountRef = useRef(0);
  useEffect(() => {
    wallCountRef.current = wallMeasurements.length;
  }, [wallMeasurements]);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: "#fdfdfd",
      isDrawingMode: true,
    });

    // v6: brush must be instantiated explicitly
    const brush = new PencilBrush(canvas);
    brush.color = "#2D241E"; // brand-espresso
    brush.width = 3;
    canvas.freeDrawingBrush = brush;

    // Grid lines
    const gridSize = 20;
    for (let i = 0; i < (canvas.width || 0) / gridSize; i++) {
      const line = new Line([i * gridSize, 0, i * gridSize, canvas.height || 0], { stroke: "#f0e7dc", selectable: false, evented: false });
      canvas.add(line);
      canvas.sendObjectToBack(line);
    }
    for (let i = 0; i < (canvas.height || 0) / gridSize; i++) {
      const line = new Line([0, i * gridSize, canvas.width || 0, i * gridSize], { stroke: "#f0e7dc", selectable: false, evented: false });
      canvas.add(line);
      canvas.sendObjectToBack(line);
    }

    // Path creation -> add red wall label A-F
    const handlePathCreated = (e: any) => {
      if (wallCountRef.current >= MAX_WALLS) {
        canvas.remove(e.path);
        toast.error(`You can draw a maximum of ${MAX_WALLS} walls.`);
        return;
      }

      const newLabel = String.fromCharCode(65 + wallCountRef.current);
      const path = e.path;
      const text = new FabricText(newLabel, {
        left: (path.left ?? 0) + (path.width ?? 0) / 2,
        top: (path.top ?? 0) + (path.height ?? 0) / 2,
        fill: "#ef4444",
        fontSize: 20,
        fontWeight: "bold",
        selectable: false,
        evented: false,
      });
      canvas.add(text);

      setWallMeasurements((prev) => [...prev, { label: newLabel, length: "" }]);
    };

    canvas.on("path:created", handlePathCreated);

    setFabricCanvas(canvas);

    return () => {
      canvas.off("path:created", handlePathCreated);
      canvas.dispose();
    };
  }, [spaceId]);

  // Notify parent only when measurements actually change (not on every render)
  useEffect(() => {
    if (!fabricCanvas) return;
    const dataUrl = fabricCanvas.toDataURL();
    onDrawingCompleteRef.current(dataUrl, wallMeasurements);
  }, [wallMeasurements, fabricCanvas]);

  const handleMeasurementChange = (index: number, value: string) => {
    setWallMeasurements((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], length: value };
      return next;
    });
  };

  const handleUndo = () => {
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    const lastPath = objects.filter((o) => o.type === "path").pop();
    const lastLabel = objects.filter((o) => o.type === "text").pop();
    if (lastPath) fabricCanvas.remove(lastPath);
    if (lastLabel) fabricCanvas.remove(lastLabel);
    setWallMeasurements((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.getObjects().forEach((o) => {
      if (o.type === "path" || o.type === "text") {
        fabricCanvas.remove(o);
      }
    });
    setWallMeasurements([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-brand-espresso">Draw Your Space</h3>
          <p className="text-sm text-brand-muted">Draw up to {MAX_WALLS} walls. Each wall is labelled A-F in red.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleUndo} className="p-2 rounded-md hover:bg-brand-sand transition-colors" title="Undo last wall"><Undo size={18} /></button>
          <button onClick={handleClear} className="p-2 rounded-md hover:bg-brand-sand transition-colors" title="Clear"><Trash2 size={18} /></button>
        </div>
      </div>

      <div className="border-2 border-brand-border rounded-lg overflow-auto bg-white">
        <canvas ref={canvasRef} style={{ touchAction: "none" }} />
      </div>

      {wallMeasurements.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          {wallMeasurements.map((wall, index) => (
            <div key={wall.label} className="space-y-1">
              <label className="text-sm font-medium text-brand-muted">Wall {wall.label} ({unit})</label>
              <input
                type="number"
                min="0"
                value={wall.length}
                onChange={(e) => handleMeasurementChange(index, e.target.value)}
                className="w-full p-2 border border-brand-border rounded-md focus:ring-brand-copper focus:border-brand-copper"
                placeholder="Length"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
