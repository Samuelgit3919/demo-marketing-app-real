import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { Space, UploadedFile } from "@/pages/Wizard";
import { DrawingCanvas } from "./DrawingCanvas";
import { Upload, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StepTwoProps {
  formData: any;
  spaces: Space[];
  setSpaces: Dispatch<SetStateAction<Space[]>>;
  files: UploadedFile[];
  setFiles: Dispatch<SetStateAction<UploadedFile[]>>;
  additionalNotes: string;
  setAdditionalNotes: (notes: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepTwo = ({ spaces, setSpaces, files, setFiles, additionalNotes, setAdditionalNotes, onNext, onBack, formData }: StepTwoProps) => {
  const [activeSpaceId, setActiveSpaceId] = useState<string | null>(spaces.length > 0 ? spaces[0].id : null);
  const [unit, setUnit] = useState<"cm" | "in">("in");

  const handleDrawingComplete = useCallback((spaceId: string, dataUrl: string, wallMeasurements: { label: string; length: string }[]) => {
    setSpaces(prev => prev.map(s => s.id === spaceId ? { ...s, drawingData: dataUrl, wallMeasurements } : s));
  }, [setSpaces]);

  const uploadFileToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const userEmail = formData.email || "anonymous";
    const safeEmail = userEmail.replace(/[^a-zA-Z0-9@._-]/g, "_");
    const filePath = `submissions/${safeEmail}/${fileName}`;

    const { error } = await supabase.storage.from("images").upload(filePath, file);
    if (error) throw error;
    return filePath;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map(f => ({
      file: f,
      id: crypto.randomUUID(),
      preview: URL.createObjectURL(f),
      uploadStatus: "pending" as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(async (uploadedFile) => {
      setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, uploadStatus: "uploading" } : f));
      try {
        const filePath = await uploadFileToSupabase(uploadedFile.file);
        setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, uploadStatus: "success", filePath } : f));
      } catch (error) {
        toast.error(`Failed to upload ${uploadedFile.file.name}`);
        setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, uploadStatus: "error" } : f));
      }
    });
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-semibold text-brand-espresso" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Step 2: Draw & Measure
        </h2>
        <p className="text-brand-muted mt-1">For each space, draw the walls, enter measurements, and upload photos.</p>
      </div>

      {/* Space Tabs + Unit Toggle */}
      <div className="flex items-center justify-between border-b border-brand-border">
        <div className="flex items-center">
          {spaces.map(space => (
            <button 
              key={space.id} 
              onClick={() => setActiveSpaceId(space.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeSpaceId === space.id ? 'border-b-2 border-brand-copper text-brand-copper' : 'text-brand-muted hover:text-brand-espresso'}`}>
              {space.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pr-2">
          <span className="text-xs text-brand-muted">Unit:</span>
          <button
            onClick={() => setUnit("in")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${unit === "in" ? 'bg-brand-copper text-white' : 'bg-brand-sand text-brand-muted hover:text-brand-espresso'}`}
          >
            in
          </button>
          <button
            onClick={() => setUnit("cm")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${unit === "cm" ? 'bg-brand-copper text-white' : 'bg-brand-sand text-brand-muted hover:text-brand-espresso'}`}
          >
            cm
          </button>
        </div>
      </div>

      {/* Active Space Content */}
      {spaces.map(space => (
        <div key={space.id} className={activeSpaceId === space.id ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-muted">Ceiling Height ({unit})</label>
              <input
                type="number"
                value={space.ceilingHeight}
                onChange={(e) => setSpaces(prev => prev.map(s => s.id === space.id ? { ...s, ceilingHeight: e.target.value } : s))}
                className="w-full p-2 border border-brand-border rounded-md focus:ring-brand-copper focus:border-brand-copper"
              />
            </div>
          </div>

          <DrawingCanvas 
            spaceId={space.id} 
            unit={unit} 
            onDrawingComplete={(dataUrl, wallMeasurements) => handleDrawingComplete(space.id, dataUrl, wallMeasurements)} 
          />
        </div>
      ))}

      {/* File Uploader */}
      <div className="space-y-4 pt-8">
        <h3 className="text-lg font-semibold text-brand-espresso">Upload Photos & Videos</h3>
        <input type="file" multiple onChange={handleFileChange} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-brand-border rounded-lg p-10 cursor-pointer hover:bg-brand-sand/50 transition-colors">
          <Upload className="w-8 h-8 text-brand-copper" />
          <p className="font-medium text-brand-espresso">Click to browse or drag & drop</p>
          <p className="text-sm text-brand-muted">Supports images and videos</p>
        </label>
        <div className="space-y-2">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-brand-sand/50 rounded-lg">
              <div className="flex items-center gap-3 truncate">
                {file.file.type.startsWith('image/') ? <img src={file.preview} alt="preview" className="w-10 h-10 object-cover rounded" /> : <div className="w-10 h-10 rounded bg-brand-sand flex items-center justify-center"><Upload size={20} /></div>}
                <p className="text-sm font-medium text-brand-espresso truncate">{file.file.name}</p>
              </div>
              <div className="flex items-center gap-2">
                {file.uploadStatus === 'uploading' && <Loader2 className="w-4 h-4 animate-spin text-brand-copper" />}
                {file.uploadStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {file.uploadStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                <button onClick={() => removeFile(file.id)}><X size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-2 pt-8">
        <label className="text-lg font-semibold text-brand-espresso">Additional Notes (Optional)</label>
        <textarea 
          value={additionalNotes} 
          onChange={e => setAdditionalNotes(e.target.value)} 
          rows={4} 
          className="w-full p-2 border border-brand-border rounded-md focus:ring-brand-copper focus:border-brand-copper"
          placeholder="Anything else we should know? Obstacles, sloped ceilings, etc."
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="text-sm font-medium text-brand-muted hover:text-brand-espresso transition-colors">Back</button>
        <button onClick={onNext} className="group inline-flex items-center justify-center gap-3 bg-brand-copper text-white text-sm tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full hover:bg-brand-copper-dark transition-all duration-300 shadow-lg">Review & Book</button>
      </div>
    </div>
  );
};
